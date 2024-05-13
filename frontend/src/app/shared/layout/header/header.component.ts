import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserInfoService} from "../../services/user-info.service";
import {Observable} from "rxjs";
import {UserInfoType} from "../../../../types/user-info.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
user$: Observable<UserInfoType | null> = this.authService.user$.asObservable();
  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private userInfoService: UserInfoService
  ) {
    this.isLogged = this.authService.getIsLoggedIn();

    if (this.isLogged) {
      this.getUserInfo();
    }
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      if (this.isLogged) {
        this.getUserInfo();
      }
    })


  }


  logout() {
    this.authService.logout()
      .subscribe({
        next: (data: DefaultResponseType) => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }


  doLogout() {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  getUserInfo() {
    this.userInfoService.getUserInfo().subscribe();
  }

}
