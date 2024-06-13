import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FocusDirective} from "../../shared/directives/focus.directive";


@NgModule({
  declarations: [
    ArticlesComponent,
    FocusDirective
  ],
    imports: [
        CommonModule,
        ArticlesRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class ArticlesModule { }
