import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ArticleCardComponent} from './article-card/article-card.component';
import {ArticleComponent} from './article/article.component';
import {ArticleFilterComponent} from './article-filter/article-filter.component';


@NgModule({
  declarations: [
    ArticleCardComponent,
    ArticleComponent,
    ArticleFilterComponent
  ],
  exports: [
    ArticleComponent,
    ArticleCardComponent,
    ArticleFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule {
}
