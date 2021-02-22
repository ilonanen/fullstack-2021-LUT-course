import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Hero } from './hero'
import { HEROES } from './mock-heroes'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private heroesUrl = 'api/heroes'

  // GET heroes from the server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }
  
  getHero(id: number): Observable<Hero> {
    // Yet to do: send the message after fetching the hero
    this.messageService.add(`HeroService: fetched hero ${id}`)
    return of(HEROES.find(hero => hero.id === id))
  }
  
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

}
