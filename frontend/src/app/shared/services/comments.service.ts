import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentCountType} from "../../../types/comments.type";
import {RequestType} from "../../../types/request.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ArticleCommentsActionType} from "../../../types/article-comments-action.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }


  getComments(offset: number,id: string): Observable<CommentCountType> {
    return this.http.get<CommentCountType>(`${environment.api}comments?offset=${offset}&article=${id}`);
  }

  getArticlesCommentsAction(articleId: string): Observable<ArticleCommentsActionType[]> {
    return this.http.get<ArticleCommentsActionType[]>(`${environment.api}comments/article-comment-actions`, {
      params: {
        articleId
      }
    });
  }

  addReaction(id: string, action: string): Observable<CommentCountType> {
    return this.http.post<CommentCountType>(`${environment.api}comments/${id}/apply-action`, {
      action: action
    });
  }

  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text: text,
      article: article
    });
  }
}
