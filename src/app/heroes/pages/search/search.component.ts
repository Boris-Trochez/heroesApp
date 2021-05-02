import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  term: string = '';
  heroes: Hero[] = [];
  heroSelected: Hero | undefined ;

  constructor(
    private heroesServie: HeroesService
  ) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroesServie.getSuggestions( this.term.trim() )
      .subscribe( heroes => this.heroes = heroes);

  }

  optionSelected( event: MatAutocompleteSelectedEvent ) {
    if( !event.option.value ) {
      this.heroSelected = undefined;
      return;
    }
    
    const hero: Hero = event.option.value;
    this.term = hero.superhero;

    this.heroesServie.getHeroesById( hero.id )
      .subscribe( hero => this.heroSelected = hero )
  }



}
