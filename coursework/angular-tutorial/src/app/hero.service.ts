import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { Hero } from './hero'
import { HEROES } from './mock-heroes'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private heroesUrl = 'api/heroes'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Yet to do: send the error to remote logging infrastructure
      console.error(error) // logging to console instead

      // Yet to do: better job transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result
      return of(result as T)
    }
  }

  // GET heroes from the server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }
  
  // GET hero by id. 404 if not found
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero by id ${id}`)),
        catchError(this.handleError<Hero>(`getHero id ${id}`))
      )
  }

  // PUT / Update the hero on the server
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Updated hero by id ${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  // POST / Add a new hero to the server
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`Added hero with id ${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  // DELETE the hero from the server
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero: hero.id
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`Deleted hero by id ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  
  // GET heroes whose name contains search term
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if no search term, return empty array of heroes
      return of([])
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name = ${term}`)
    .pipe(
      tap(x => x.length ?
        this.log(`found heroes matching ${term}`) :
        this.log(`no heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

}
