import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/apiResponse';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private API_KEY = '3f8198f7'
  private API_URL = `http://www.omdbapi.com/?apikey=${this.API_KEY}`

  getMovies(searchTerm: string): Observable<Movie[]> {
    return this.http.get<ApiResponse>(this.API_URL + '&s=' + searchTerm).pipe(
      map(response => {
        return response.Search;
      })
    );
  }
}
