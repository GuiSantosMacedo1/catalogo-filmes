import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
  @Output() cardClick = new EventEmitter<void>();

  imageBaseUrl = environment.tmdbImageUrl;

  onClick(): void {
    this.cardClick.emit();
  }

  get posterUrl(): string {
    return this.movie.poster_path
      ? `${this.imageBaseUrl}${this.movie.poster_path}`
      : 'https://via.placeholder.com/300x450?text=Sem+imagem';
  }

  get formattedRating(): string {
    return this.movie.vote_average.toFixed(1);
  }
}