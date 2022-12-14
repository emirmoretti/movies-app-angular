import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinct, filter, fromEvent, map, switchMap, tap, Subscription, Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  movies: Movie[] = [];

  @ViewChild('movieSearchInput', { static: true }) movieSearchInput!: ElementRef;

  movies$!: Observable<Movie[]> // pipe async se subscribe solo

  movieSuscription!: Subscription;

  constructor(private movieServices: MovieService) { }

  ngOnInit(): void {
    this.movies$ = fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event: Event) => {
        const searchTerm = (event.target as HTMLInputElement).value;
        return searchTerm;
      }), //ahora el tap recibe un string
      filter((searchTerm: string) => searchTerm.length > 3), //condicion para seguir la ejecucion
      debounceTime(1000), // delay para realizar la peticion cuando termine de escribir 500 = medio segundo
      distinct(), // No se ejecuta la peticion si se vuelve a poner el mismo valor
      tap((searchTerm: string) => console.log(searchTerm)), //debugear
      switchMap((searchTerm: string) => this.movieServices.getMovies(searchTerm)),
    )
  }
}
