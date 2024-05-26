import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentCountType} from "../../../types/comments.type";
import {RequestType} from "../../../types/request.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }


  getComments(offset: number,id: string): Observable<CommentCountType> {
    return this.http.get<CommentCountType>(`${environment.api}comments?offset=${offset}&article=${id}`);
  }

  // addReaction(params: RequestType,id: string): Observable<CommentCountType> {
  //   return this.http.post<CommentCountType>(`${environment.api}comments/${id}/apply-action`, params);
  // }

  addComment(params: RequestType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', params);
  }
}
