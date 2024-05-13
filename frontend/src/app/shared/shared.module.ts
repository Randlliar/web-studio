import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
    declarations: [
        ArticleCardComponent,
        ArticleComponent
    ],
    exports: [
        ArticleCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ]
})
export class SharedModule { }
