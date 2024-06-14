import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ArticleCardComponent} from './article-card/article-card.component';
import {ArticleComponent} from './article/article.component';
import {ArticleFilterComponent} from './article-filter/article-filter.component';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    ArticleCardComponent,
    ArticleComponent,
    ArticleFilterComponent,
    LoaderComponent
  ],
  exports: [
    ArticleComponent,
    ArticleCardComponent,
    ArticleFilterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {
}
