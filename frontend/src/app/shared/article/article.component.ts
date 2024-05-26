import {Component, NgIterable, OnInit} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {ArticleType} from "../../../types/article.type";
import {ActivatedRoute, Params} from "@angular/router";
import {environment} from "../../../environments/environment";
import {PopularArticlesType} from "../../../types/popular-articles.type";
import {ArticlesType} from "../../../types/articles.type";
import * as url from "url";
import {CommentsService} from "../services/comments.service";
import {CommentCountType, CommentType} from "../../../types/comments.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article!: ArticleType;
  serverStaticPath = environment.serverStaticPath;
  articles: ArticlesType[] = [];
  comments!: CommentCountType;


  constructor(private articleService: ArticleService,
              private commentsService: CommentsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getArticle(params);
      this.getArticles(params);
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

        this.commentsService.getComments(0, this.article.id)
          .subscribe((data: CommentCountType) => {
            this.comments = data;
          })
      })
  }

  addComment() {

  }

}
