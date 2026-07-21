import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error = false;
  searchTerm = '';

  private searchSubject = new Subject<string>();

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPopularMovies();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(term => {
        if (term.trim().length === 0) {
          this.loadPopularMovies();
        } else {
          this.searchMovies(term);
        }
      });
  }

  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  loadPopularMovies(): void {
    this.loading = true;
    this.error = false;

    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  searchMovies(term: string): void {
    this.loading = true;
    this.error = false;

    this.movieService.searchMovies(term).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  goToDetail(movieId: number): void {
    this.router.navigate(['/filme', movieId]);
  }
}