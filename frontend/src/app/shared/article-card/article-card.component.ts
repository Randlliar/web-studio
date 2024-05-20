import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ArticlesType} from "../../../types/articles.type";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: ArticlesType;
  isLogged: boolean = false;
  serverStaticPath = environment.serverStaticPath;



  constructor(

  ) {
  }

  ngOnInit(): void {



  }



}
