import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../../core/services/movie.service';
import { MovieDetail } from '../../models/movie.model';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockMovieDetail: MovieDetail = {
    id: 1,
    title: 'Interestelar',
    overview: 'Uma jornada pelo espaço e tempo.',
    poster_path: '/poster.jpg',
    backdrop_path: null,
    release_date: '2014-11-06',
    vote_average: 8.6,
    genre_ids: [878, 18],
    runtime: 169,
    genres: [{ id: 878, name: 'Ficção científica' }],
    credits: {
      cast: [
        { id: 10, name: 'Matthew McConaughey', character: 'Cooper', profile_path: null }
      ]
    }
  };

  function setup(routeId: string | null) {
    const movieSpy = jasmine.createSpyObj('MovieService', ['getMovieDetail']);
    const navSpy = jasmine.createSpyObj('Router', ['navigate']);

    const activatedRouteStub = {
      snapshot: {
        paramMap: convertToParamMap(routeId ? { id: routeId } : {})
      }
    };

    TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
        { provide: MovieService, useValue: movieSpy },
        { provide: Router, useValue: navSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  }

  it('deve criar o componente e carregar o detalhe do filme pelo id da rota', () => {
    setup('1');
    movieServiceSpy.getMovieDetail.and.returnValue(of(mockMovieDetail));

    fixture.detectChanges();

    expect(movieServiceSpy.getMovieDetail).toHaveBeenCalledWith(1);
    expect(component.movie?.title).toBe('Interestelar');
    expect(component.loading).toBeFalse();
  });

  it('deve marcar error como true quando a API falhar', () => {
    setup('1');
    movieServiceSpy.getMovieDetail.and.returnValue(
      throwError(() => new Error('Filme nao encontrado'))
    );

    fixture.detectChanges();

    expect(component.error).toBeTrue();
    expect(component.movie).toBeNull();
  });

  it('deve exibir titulo, sinopse e generos na tela apos carregar', () => {
    setup('1');
    movieServiceSpy.getMovieDetail.and.returnValue(of(mockMovieDetail));

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Interestelar');
    expect(compiled.querySelector('.overview')?.textContent).toContain('jornada pelo espaço');
    expect(compiled.querySelector('.genre-tag')?.textContent).toContain('Ficção científica');
  });

  it('deve voltar para a Home ao chamar goBack', () => {
    setup('1');
    movieServiceSpy.getMovieDetail.and.returnValue(of(mockMovieDetail));
    fixture.detectChanges();

    component.goBack();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});