import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MovieDetail, MovieResponse } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'pt-BR')
      .set('page', page.toString());

    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular`, { params });
  }

  searchMovies(query: string, page: number = 1): Observable<MovieResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'pt-BR')
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<MovieResponse>(`${this.baseUrl}/search/movie`, { params });
  }

  getMovieDetail(id: number): Observable<MovieDetail> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'pt-BR')
      .set('append_to_response', 'credits');

    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}`, { params });
  }
}