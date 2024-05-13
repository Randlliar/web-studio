import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../core/auth/auth.service";
import {PopularArticlesType} from "../../../types/popular-articles.type";
import {environment} from "../../../environments/environment";
import {ArticleService} from "../services/article.service";
import {ArticleType} from "../../../types/article.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: ArticleType;
  isLogged: boolean = false;
  serverStaticPath = environment.serverStaticPath;



  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {



  }



}
