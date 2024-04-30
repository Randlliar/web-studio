import {Component, ElementRef, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../../shared/services/article.service";
import {PopularArticlesType} from "../../../../types/popular-articles.type";
import {environment} from "../../../../environments/environment";
import {CategoriesService} from "../../../shared/services/categories.service";
import {CategoriesType} from "../../../../types/categories.type";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
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
  dialogRef: MatDialogRef<any> | null = null;

  constructor(private articleService: ArticleService,
              private categoriesService: CategoriesService,
              // private router: Router,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe((data: CategoriesType[]) => {
        this.categories = data

      })

    this.articleService.getPopularArticles()
      .subscribe((data: PopularArticlesType[]) => {
        this.articles = data;
      })
  }
//Вернуться в проект im в ордер компонетнт посмотреть реализацию модалки и передачи в гет запрос параметров

  getOrder() {
    // this.dialogRef = this.dialog.open(this.popup);
    // this.dialogRef.backdropClick()
    //   .subscribe(() => {
    //     this.router.navigate(['/']);
    //   });
  }

  closePopup() {
    // this.dialogRef?.close();
    // this.router.navigate(['/']);
  }
}
