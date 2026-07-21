import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Movie } from '../../../models/movie.model';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie: Movie = {
    id: 1,
    title: 'Interestelar',
    overview: 'Uma jornada pelo espaço e tempo.',
    poster_path: '/poster.jpg',
    backdrop_path: null,
    release_date: '2014-11-06',
    vote_average: 8.6,
    genre_ids: [878, 18]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o titulo do filme na tela', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.movie-title');
    expect(titleElement?.textContent).toContain('Interestelar');
  });

  it('deve exibir a nota formatada com uma casa decimal', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ratingElement = compiled.querySelector('.rating-badge');
    expect(ratingElement?.textContent).toContain('8.6');
  });

  it('deve emitir o evento cardClick ao ser clicado', () => {
    spyOn(component.cardClick, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const cardElement = compiled.querySelector('.movie-card') as HTMLElement;

    cardElement.click();

    expect(component.cardClick.emit).toHaveBeenCalled();
  });
});