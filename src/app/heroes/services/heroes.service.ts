import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiEndPoint: string = environment.apiEndPoint;

  constructor( 
    private http: HttpClient
   ) { }

   getHeroes(): Observable<Hero[]> {
     return this.http.get<Hero[]>(`${ this.apiEndPoint }/heroes`);
   }

   getHeroesById(id: string): Observable<Hero> {
     
     return this.http.get<Hero>(`${ this.apiEndPoint }/heroes/${ id }`);
   }

   getSuggestions( term: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.apiEndPoint }/heroes?q=${ term }&_limit=6`);
  }

  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.apiEndPoint }/heroes`, hero  );
  }

  updateHero( hero: Hero ): Observable<Hero> {
    return this.http.put<Hero>(`${ this.apiEndPoint }/heroes/${ hero.id }`, hero);
  }

  deleteHero( id: string ): Observable<any> {
    return this.http.delete<any>(`${ this.apiEndPoint }/heroes/${ id }`);
  }
}
