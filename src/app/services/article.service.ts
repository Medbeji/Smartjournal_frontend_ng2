import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';;
import {Article} from '../ModelBinding/article';

@Injectable()
export class ArticleService {
  endpoint_url:string="http://smartjournal.herokuapp.com/api/article";
   articlebyjournal:string="https://smartjournal.herokuapp.com/api/journal";
  constructor(private http:Http) {
    this.http = http
   }
   
    getArticle(ArticleId : string):Promise<Article>
	{
	const url=`${this.endpoint_url}/${ArticleId}`;
	console.log(url);
	return this.http.
	get(url).
	toPromise().
	then(response => response.json()).
 then(article => new Article(article)).
	catch(this.handleError);
}


	getArticleByJournal(ArticleId : string)
	{
	const url=`${this.articlebyjournal}/${ArticleId}/article`;
	console.log(url);
	 return this.http.get(url).map(res => res.json());
	}

	private handleError(error: any): Promise<any> 
	{
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  

  getArticles()
  {
    console.log("Message from service article");
    return this.http.get(this.endpoint_url).map(res => res.json());
    
  }
}
