import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {ArticleType} from "../../../types/article.type";
import {ActivatedRoute, Params} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ArticlesType} from "../../../types/articles.type";
import {CommentsService} from "../services/comments.service";
import {CommentCountType, CommentType} from "../../../types/comments.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../core/auth/auth.service";
import {ArticleCommentsActionType} from "../../../types/article-comments-action.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  isLogged: boolean = false;
  article!: ArticleType;
  serverStaticPath = environment.serverStaticPath;
  articles: ArticlesType[] = [];
  allCommentsLength: number = 0;
  allComments: CommentType[] = [];
  comment: string = '';

  constructor(private articleService: ArticleService,
              private commentsService: CommentsService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private changedDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLoggedIn();

    this.activatedRoute.params.subscribe(params => {
      this.loadArticleData(params);
      this.loadRelatedArticles(params);
    })
  }

  addAction(comment: CommentType, action: string) {
    if (this.isLogged) {
      this.commentsService.addReaction(comment.id, action)
        .subscribe({
          next: (data: CommentCountType) => {
            const currentAction = comment.userAction;

            if (action === 'violate') {
              this._snackBar.open('Ваша жалоба отправлена');
            } else {
              if (currentAction === action) {
                if (action === 'dislike') {
                  comment.dislikesCount--;
                } else {
                  comment.likesCount--;
                }
              } else if (!currentAction) {
                if (action === 'dislike') {
                  comment.dislikesCount++;
                } else {
                  comment.likesCount++;
                }
              } else {
                if (action === 'dislike') {
                  comment.dislikesCount++;
                  comment.likesCount--;
                } else {
                  comment.dislikesCount--;
                  comment.likesCount++;
                }
              }


              this.getActionForComments(comment);
              // this.getArticlesCommentsAction();
              this._snackBar.open('Ваш голос учтен');
            }


          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open(error.error.message);
            throw new Error(error.error.message)
          }
        });
    } else {
      this._snackBar.open('Для оценки вам нужно зарегистрировться');
    }
  }

  loadMoreComments() {
    if (this.allComments.length < 10) {
      this.getComments(0)
    } else if (this.allComments.length % 10 === 0) {
      this.getComments(this.allComments.length)
    } else {
      this.getComments(this.allComments.length % 10)
    }

  }

  get3Comm(offset: number) {
    this.commentsService.getComments(offset, this.article.id)
      .subscribe((data: CommentCountType) => {
        this.allComments = data.comments.slice(0, 3);
      })
  }

  getComments(offset: number) {
    this.commentsService.getComments(offset, this.article.id)
      .subscribe((data: CommentCountType) => {
        if (data.allCount) {
          this.allCommentsLength = data.allCount;
        }
        if (this.allComments.length < 3) {
          this.allComments = data.comments.slice(0, 3);
          this.getArticlesCommentsAction();
        } else if (this.allComments.length < 10) {
          this.allComments = data.comments;
          this.getArticlesCommentsAction();
        } else {
          this.allComments = this.allComments.concat(data.comments)
          this.getArticlesCommentsAction();
        }

        this.getArticlesCommentsAction();
      })
  }

  getActionForComments(comment: CommentType) {
    this.commentsService.getActionForComments(comment.id)
      .subscribe((data: ArticleCommentsActionType[]) => {
        if (!data || data.length === 0) {
          comment.userAction = undefined;
          return;
        }

        const lastAction: ArticleCommentsActionType = data[0];
        comment!.userAction = lastAction.action;
      });
  }

  getArticlesCommentsAction() {
    if (this.isLogged) {
      this.commentsService.getArticlesCommentsAction(this.article.id)
        .subscribe((data: ArticleCommentsActionType[]) => {
          data.forEach(item => {
            const commentId = item.comment;
            const comment = this.allComments.find(comment => {
              return comment.id === commentId;
            })
            if (comment) {
              comment!.userAction = item.action;
            }
          })
          this.changedDetector.detectChanges();
        })
    }
  }

  loadRelatedArticles(params: Params) {
    this.articleService.getRelatedArticle(params['url'])
      .subscribe((data: ArticlesType[]) => {
        this.articles = data;
      })
  }


  loadArticleData(params: Params) {
    this.articleService.getArticle(params['url'])
      .subscribe((data: ArticleType) => {
        this.article = data;
        this.getComments(0)
        this.getArticlesCommentsAction();
      })
  }

  addComment() {
    this.commentsService.addComment(this.comment, this.article.id)
      .subscribe(data => {
        this.get3Comm(0);
        this._snackBar.open('Комментарий успешно добавлен!');
      })
  }
}
