import {ChangeDetectorRef, Component, NgIterable, OnInit} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {ArticleType} from "../../../types/article.type";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ArticlesType} from "../../../types/articles.type";
import {CommentsService} from "../services/comments.service";
import {CommentCountType, CommentType} from "../../../types/comments.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../core/auth/auth.service";
import {ArticleCommentsActionType} from "../../../types/article-comments-action.type";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

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
  sliceComm!: CommentType[];
  comment: string = '';
  commAction!: ArticleCommentsActionType;

  constructor(private articleService: ArticleService,
              private commentsService: CommentsService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private http: HttpClient,
              private changedDetector: ChangeDetectorRef) {
    this.isLogged = this.authService.getIsLoggedIn();

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getArticle(params);
      this.getArticles(params);
    })
  }

  addAction(comment: CommentType, action: string) {
    if (this.isLogged) {
    this.commentsService.addReaction(comment.id, action)
      .subscribe({
      next: (data: CommentCountType) => {
        if (action === 'violate') {
          this._snackBar.open('Ваша жалоба отправлена');
        } else {
         // this.getComments(0)
         this.getActionForComments(comment.id);
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

  addMore() {
    if (this.allComments.length < 10){
      this.getComments(0)
      console.log(
        this.allComments.length

      )
    } else if (this.allComments.length % 10 === 0){
      this.getComments(this.allComments.length)
      console.log(
        this.allComments.length

      )
    } else {
      this.getComments(this.allComments.length % 10)
    }
    console.log(this.allComments.length)

  }

  get3Comm(offset: number) {
    this.commentsService.getComments(offset, this.article.id)
      .subscribe((data: CommentCountType) => {
        this.allComments = data.comments.slice(0,3);
      })
  }
  getComments(offset: number) {
    this.commentsService.getComments(offset, this.article.id)
      .subscribe((data: CommentCountType) => {
        if (data.allCount) {
          this.allCommentsLength = data.allCount;
        }
        if (this.allComments.length < 3) {
          this.allComments = data.comments.slice(0,3);
          this.getArticlesCommentsAction();
        }
         else if (this.allComments.length< 10) {
          this.allComments = data.comments;
          this.getArticlesCommentsAction();
        } else {
          this.allComments = this.allComments.concat(data.comments)
          this.getArticlesCommentsAction();
        }

        this.getArticlesCommentsAction();
        // console.log(this.allComments.length)

      })
  }

  getActionForComments(id: string) {
    this.commentsService.getActionForComments(id)
      .subscribe(data => {
        console.log(data)
        return data;
      })
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

  getArticles(params: Params) {
    this.articleService.getRelatedArticle(params['url'])
      .subscribe((data: ArticlesType[]) => {
        this.articles = data;
      })
  }



  getArticle(params: Params) {
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
