import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserInfoType} from "../../../types/user-info.type";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private http: HttpClient) { }


  getUserInfo(): Observable<UserInfoType > {
    return this.http.get<UserInfoType>(environment.api + 'users');
  }
}
