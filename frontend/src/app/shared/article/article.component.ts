import {ChangeDetectorRef, Component, NgIterable, OnInit} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {ArticleType} from "../../../types/article.type";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {PopularArticlesType} from "../../../types/popular-articles.type";
import {ArticlesType} from "../../../types/articles.type";
import * as url from "url";
import {CommentsService} from "../services/comments.service";
import {CommentCountType, CommentType} from "../../../types/comments.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../core/auth/auth.service";
import {ArticleCommentsActionType} from "../../../types/article-comments-action.type";

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
  comments!: CommentCountType;
  comment: string = '';

  constructor(private articleService: ArticleService,
              private commentsService: CommentsService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private changedDetector: ChangeDetectorRef) {
    this.isLogged = this.authService.getIsLoggedIn();

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getArticle(params);
      this.getArticles(params);
    })
  }

addAction(comment:CommentType, action: string) {

    this.commentsService.addReaction(comment.id, action )
      .subscribe(data => {
        // if (comment.userAction === undefined) {
          // if(action === 'like') {
          //   comment.likesCount++;
          // }
          // if(action === 'dislike') {
          //   comment.dislikesCount++;
          // }
          // comment.userAction = action;
        // }


        // this.changedDetector.detectChanges()
        this.getComments()
      });
}


  getComments() {
    this.commentsService.getComments(0, this.article.id)
      .subscribe((data: CommentCountType) => {
        this.comments = data;

        this.getArticlesCommentsAction();
      })
  }

  getArticlesCommentsAction() {
    this.commentsService.getArticlesCommentsAction(this.article.id)
      .subscribe((data: ArticleCommentsActionType[]) => {
        data.forEach(item => {
          const commentId = item.comment;
         const comment = this.comments.comments.find(comment => {
            return comment.id === commentId;
          })
          comment!.userAction = item.action;
        })
        this.changedDetector.detectChanges()
      })
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

      this.getComments();
      })
  }

  addComment() {
    this.commentsService.addComment(this.comment, this.article.id)
      .subscribe(data => {
        this.getComments();
        this._snackBar.open('Комментарий успешно добавлен!');
      })
  }

}
