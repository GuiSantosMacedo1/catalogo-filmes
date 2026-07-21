import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { MovieService } from '../../core/services/movie.service';
import { MovieResponse } from '../../models/movie.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockResponse: MovieResponse = {
    page: 1,
    total_pages: 5,
    total_results: 100,
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

  beforeEach(async () => {
    const movieSpy = jasmine.createSpyObj('MovieService', ['getPopularMovies', 'searchMovies']);
    const navSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: MovieService, useValue: movieSpy },
        { provide: Router, useValue: navSpy }
      ]
    }).compileComponents();

    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  function createComponent() {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }

  it('deve criar o componente', () => {
    movieServiceSpy.getPopularMovies.and.returnValue(of(mockResponse));
    createComponent();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deve carregar filmes populares ao iniciar e desligar o loading', () => {
    movieServiceSpy.getPopularMovies.and.returnValue(of(mockResponse));

    createComponent();
    fixture.detectChanges();

    expect(movieServiceSpy.getPopularMovies).toHaveBeenCalled();
    expect(component.movies.length).toBe(1);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('deve marcar error como true quando a API falhar', () => {
    movieServiceSpy.getPopularMovies.and.returnValue(
      throwError(() => new Error('Falha na API'))
    );

    createComponent();
    fixture.detectChanges();

    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('deve exibir mensagem de "nenhum filme encontrado" quando a busca nao retornar resultados', () => {
    const emptyResponse: MovieResponse = { ...mockResponse, results: [] };
    movieServiceSpy.getPopularMovies.and.returnValue(of(mockResponse));
    movieServiceSpy.searchMovies.and.returnValue(of(emptyResponse));

    createComponent();
    fixture.detectChanges();

    component.searchTerm = 'filme-que-nao-existe';
    component.searchMovies('filme-que-nao-existe');
    fixture.detectChanges();

    expect(component.movies.length).toBe(0);

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyMessage = compiled.querySelector('.state-message p');
    expect(emptyMessage?.textContent).toContain('Nenhum filme encontrado');
  });

  it('deve navegar para a tela de detalhe ao chamar goToDetail', () => {
    movieServiceSpy.getPopularMovies.and.returnValue(of(mockResponse));
    createComponent();
    fixture.detectChanges();

    component.goToDetail(1);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/filme', 1]);
  });
});