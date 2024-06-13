import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlePageType, ArticlesType} from "../../../../types/articles.type";
import {environment} from "../../../../environments/environment";
import {CategoriesService} from "../../../shared/services/categories.service";
import {CategoriesType} from "../../../../types/categories.type";
import {ActiveParamsType} from "../../../../types/activeParams.type";
import {debounceTime, generate} from "rxjs";
import {FormControl} from "@angular/forms";
import {AppliedFilterType} from "../../../../types/applied-filters.type";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {



  articlesPage!: ArticlePageType;
  activeParams: ActiveParamsType = {page: 1, categories: []};

  serverStaticPath = environment.serverStaticPath;
  pages: number[] = [];
  categories: CategoriesType[] = [];
  categoriesController: FormControl = new FormControl<string[]>([]);
  sortingOpen = false;
  appliedFilters: AppliedFilterType[] = [];

@ViewChild('selector') selector!: ElementRef;

  constructor(private articleService: ArticleService,
              private categoriesService: CategoriesService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.processContent();
    this.getFilterCategories();
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

  getFilterCategories() {
    this.categoriesService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })
  }

  delete(value: string) {
    if (this.activeParams.categories.includes(value)) {
      this.activeParams.categories = this.activeParams.categories.filter(category => category !== value);
    }
    const index = this.appliedFilters.findIndex(url => url.urlParam === value);
    if (index !== -1) {
      this.appliedFilters.splice(index, 1);
    }
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
    this.activeParams.page = 1;
  }

  sort(value: string) {
    if (this.activeParams.categories.includes(value)) {
      this.activeParams.categories = this.activeParams.categories.filter(category => category !== value);
    } else {
      this.activeParams.categories.push(value);
    }

    this.categories.map(item => {
      if (item.url === value) {
        if (this.activeParams.categories.includes(value)) {
          this.appliedFilters.push({
            name: item.name,
            urlParam: item.url
          })
        } else {
          const index = this.appliedFilters.findIndex(url => url.urlParam === value);
          if (index !== -1) {
            this.appliedFilters.splice(index, 1);
          }
        }
      }
    })

    this.activeParams.page = 1;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
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

  open() {
    this.sortingOpen = true;

  }

  close() {
    this.sortingOpen = false;
  }
}
