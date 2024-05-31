import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PopularArticlesType} from "../../../types/popular-articles.type";
import {ArticlePageType, ArticlesType} from "../../../types/articles.type";
import {ArticleType} from "../../../types/article.type";
import * as url from "url";
import {ActiveParamsType} from "../../../types/activeParams.type";
import {CategoriesType} from "../../../types/categories.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getPopularArticles(): Observable<PopularArticlesType[]> {
    return this.http.get<PopularArticlesType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<ArticlePageType> {
    return this.http.get<ArticlePageType>(`${environment.api}articles`, {
      params: params
    });
  }
  getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(`${environment.api}articles/${url}`);
  }
  getRelatedArticle(url: string): Observable<ArticlesType[]> {
    return this.http.get<ArticleType[]>(`${environment.api}articles/related/${url}`);
  }
}
