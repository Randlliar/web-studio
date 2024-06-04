import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlePageType, ArticlesType} from "../../../../types/articles.type";
import {environment} from "../../../../environments/environment";
import {CategoriesService} from "../../../shared/services/categories.service";
import {CategoriesType} from "../../../../types/categories.type";
import {ActiveParamsType} from "../../../../types/activeParams.type";
import {debounceTime} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articlesPage!: ArticlePageType;
  activeParams: ActiveParamsType = {categories: [], page: 1};

  serverStaticPath = environment.serverStaticPath;
  pages: number[] = [];
  categories: CategoriesType[] = [];
  categoriesController: FormControl = new FormControl<string[]>([]);
  sortingOpen = false;


  constructor(private articleService: ArticleService,
              private categoriesService: CategoriesService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.processContent();

    this.filter();

    this.subscribeToCategoriesChanges();
  }

  get selectedCategories(): string[] {
    return this.categoriesController.value;
  }
  subscribeToCategoriesChanges() {
    this.categoriesController.valueChanges.subscribe((data: string[]) => {
      this.activeParams.categories = data;

      this.processContent();
    })
  }

  filter() {
    this.categoriesService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })
  }

  processContent() {
    this.activatedRoute.queryParams
      .pipe(
        debounceTime(500)
      )
      .subscribe(params => {
        if (params['page']) {
          this.activeParams.page = +params['page'];
        }
        this.getArticles();
      })
  }


  getArticles() {
    this.articleService.getArticles(this.activeParams)
      .subscribe((data) => {
        this.pages = [];
        this.articlesPage = data;

        for (let i = 1; i <= data.pages; i++) {
          this.pages.push(i);
        }
      })
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }

}
