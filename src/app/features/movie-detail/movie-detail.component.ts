import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieDetail } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDetail | null = null;
  loading = false;
  error = false;
  imageBaseUrl = environment.tmdbImageUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovieDetail(+id);
    }
  }

  loadMovieDetail(id: number): void {
    this.loading = true;
    this.error = false;

    this.movieService.getMovieDetail(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  get posterUrl(): string {
    if (!this.movie?.poster_path) {
      return 'https://via.placeholder.com/400x600?text=Sem+imagem';
    }
    return `${this.imageBaseUrl}${this.movie.poster_path}`;
  }
}