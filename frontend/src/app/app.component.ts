import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/auth/auth.service";
import {filter, mergeMap} from "rxjs";
import {LoginResponseType} from "../types/login-response.type";
import {DefaultResponseType} from "../types/default-response.type";
import {UserInfoType} from "../types/user-info.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.authService.refresh()
      .pipe(
        filter((data: LoginResponseType | DefaultResponseType) => {
          return (data as DefaultResponseType).error === undefined
        }),
        mergeMap((data: LoginResponseType | DefaultResponseType) => {
          const loginResponse = data as LoginResponseType;

          this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
          this.authService.userId = loginResponse.userId;

          return this.authService.getUser();

        })
      )
      .subscribe({
        next: (user: UserInfoType) => {
          this.authService.user$.next(user);
        },

      })
  }
}
