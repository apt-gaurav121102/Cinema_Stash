package com.cinema_stash.dto;

import java.time.LocalDate;

import com.cinema_stash.entities.MovieGenre;
import com.cinema_stash.entities.MovieLanguage;
import com.cinema_stash.entities.MovieType;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class MovieResponseDto {
    private long movieId;
    private String name;
    private String poster;
    private MovieGenre genre;
    private MovieLanguage language;
    private MovieType type;
    private double duration;
    private LocalDate releaseDate;
    private double rating;
	public long getMovieId() {
		return movieId;
	}
	public void setMovieId(long movieId) {
		this.movieId = movieId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public MovieGenre getGenre() {
		return genre;
	}
	public void setGenre(MovieGenre genre) {
		this.genre = genre;
	}
	public MovieLanguage getLanguage() {
		return language;
	}
	public void setLanguage(MovieLanguage language) {
		this.language = language;
	}
	public MovieType getType() {
		return type;
	}
	public void setType(MovieType type) {
		this.type = type;
	}
	public double getDuration() {
		return duration;
	}
	public void setDuration(double duration) {
		this.duration = duration;
	}
	public LocalDate getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(LocalDate releaseDate) {
		this.releaseDate = releaseDate;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
}
