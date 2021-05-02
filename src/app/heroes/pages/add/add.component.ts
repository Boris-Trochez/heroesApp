import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img: {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AddComponent implements OnInit {
  
  publishers = [
    {
      id: 'DC comics',
      desc: 'DC - comics'
    },
    {
      id: 'Marvel comics',
      desc: 'Marvel - comics'
    }
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( 
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if( !this.router.url.includes('edit')) {
      return;
    } 

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroesById( id ) )
      )
      .subscribe( hero => this.hero = hero );
  }

  save() {
    
    if( this.hero.superhero.trim().length === 0 ) {
      return;
    }

    if( this.hero.id ) {
      //Update  - PUT 
      this.heroesService.updateHero( this.hero )
        .subscribe( hero => this.showSnackBar('Updated information')) 
    } else {
      //Create - POST
      console.log("this", this.hero )
      this.heroesService.addHero( this.hero )
        .subscribe( hero => {
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar('Created hero');
        })
    }
  }

  deleteHero() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.hero
    });

    dialog.afterClosed()    
    .pipe(
      switchMap( (result)  => {
        if( result ){
          this.router.navigate(['/heroes']);
          return this.heroesService.deleteHero( this.hero.id );
        } else {
          return of( false );
        }
      })
    )
    .subscribe(); 
  }

  showSnackBar( message: string ): void {
    this.snackBar.open(message, 'ok!', {
      duration: 2500
    });
  }
}
