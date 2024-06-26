import {Component, ElementRef, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {PopularArticlesType} from "../../../types/popular-articles.type";
import {environment} from "../../../environments/environment";
import {CategoriesService} from "../../shared/services/categories.service";
import {CategoriesType} from "../../../types/categories.type";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {RequestService} from "../../shared/services/request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
// import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: false
  }

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  };

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
  ];

  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  articles: PopularArticlesType[] = [];
  categories: CategoriesType[] = [];
  serverStaticPath = environment.serverStaticPath;
  success: boolean = false;
  dialogRef: MatDialogRef<any> | null = null;
  form = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    service: new FormControl(),
    type: new FormControl(),
  })

  constructor(private articleService: ArticleService,
              private categoriesService: CategoriesService,
              private router: Router,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private requestService: RequestService
              ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe((data: CategoriesType[]) => {
        this.categories = data;
      })

    this.articleService.getPopularArticles()
      .subscribe((data: PopularArticlesType[]) => {
        this.articles = data;
      })
  }

  getOrder(value: string) {
    this.form.get('type')?.setValue('order')
    this.form.get('service')?.setValue(value)
    this.dialogRef = this.dialog.open(this.popup);
  }

  getRequest() {
    const formData = this.form.getRawValue()
    this.requestService.createRequest(formData)
      .subscribe({
        next: (data) => {
          this.success = true;
        },
        error: (error: HttpErrorResponse) => {
          this._snackBar.open("Произошла ошибка при отправке формы, попробуйте еще раз");
          throw new Error(error.error.message)
        }
      })
  }

  closePopup() {
    this.dialogRef?.close();
    this.success = false;
    this.form.get('name')?.setValue('');
    this.form.get('phone')?.setValue('');
  }
}
