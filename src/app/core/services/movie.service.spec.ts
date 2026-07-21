import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { MovieResponse } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  const mockResponse: MovieResponse = {
    page: 1,
    total_pages: 10,
    total_results: 200,
    results: [
      {
        id: 1,
        title: 'Interestelar',
        overview: 'Uma jornada pelo espaço e tempo.',
        poster_path: '/poster.jpg',
        backdrop_path: null,
        release_date: '2014-11-06',
        vote_average: 8.6,
        genre_ids: [878, 18]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Garante que nao sobrou nenhuma requisicao pendente/inesperada
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar filmes populares e retornar a lista corretamente', () => {
    service.getPopularMovies().subscribe((response) => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].title).toBe('Interestelar');
    });

    const req = httpMock.expectOne(
      (request) => request.url === `${environment.tmdbBaseUrl}/movie/popular`
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('language')).toBe('pt-BR');
    expect(req.request.params.get('page')).toBe('1');

    req.flush(mockResponse);
  });

  it('deve buscar filmes por termo de pesquisa', () => {
    service.searchMovies('interestelar').subscribe((response) => {
      expect(response.results[0].title).toBe('Interestelar');
    });

    const req = httpMock.expectOne(
      (request) => request.url === `${environment.tmdbBaseUrl}/search/movie`
    );

    expect(req.request.params.get('query')).toBe('interestelar');

    req.flush(mockResponse);
  });

  it('deve propagar erro quando a API falhar', () => {
    let errorReceived = false;

    service.getPopularMovies().subscribe({
      next: () => fail('nao deveria ter sucesso neste teste'),
      error: () => {
        errorReceived = true;
      }
    });

    const req = httpMock.expectOne(
      (request) => request.url === `${environment.tmdbBaseUrl}/movie/popular`
    );

    req.flush('Erro simulado', { status: 500, statusText: 'Server Error' });

    expect(errorReceived).toBeTrue();
  });
});