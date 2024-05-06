import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlePageType, ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit{

  articlesPage!: ArticlePageType;
  serverStaticPath = environment.serverStaticPath;
  pages: number[] = [];


  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,) {
  }

  ngOnInit() {
    this.articleService.getArticles()
      .subscribe((data: ArticlePageType) => {
        this.articlesPage =  data;
        this.pages = [];
        for (let i = 1; i <= data.pages; i++) {
          this.pages.push(i);
        }
      })

  }

}
