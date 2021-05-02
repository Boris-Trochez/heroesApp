import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes )
  }

}
