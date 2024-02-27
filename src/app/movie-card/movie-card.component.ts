import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { DescriptionInfoComponent } from '../description-info/description-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  userData = { Username: '', FavoriteMovies: [] };
  FavoriteMovies: any[] = [];
  isFavoriteMovie: boolean = false;

  /**
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * @description calls getAllMovies() to receive all movies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @description Opens DirectorInfoComponent
   * @param name - Name of specified Director
   * @param bio - Bio of Specified Director
   * @param birth - Birthdate of specified director
   */

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '1000px',
    });
  }

  /**
   * @description Opens GenreInfoComponent
   * @param name - Name of specified genre
   * @param description - description of specified genre
   */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * @description Opens DescriptionInfoComponent
   * @param description - description of specified movie
   */

  openDescriptionDialog(description: string): void {
    this.dialog.open(DescriptionInfoComponent, {
      data: {
        Description: description,
      },
      width: '700px',
    });
  }

  /**
   * @description calls getUser() to obtain FavoriteMovie list
   */

  getFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Fav Movies in getFavoriteMovie', this.FavoriteMovies);
  }

  /**
   * @description function to check whether or not the selected movie is in the user's FavoriteMovie list
   * @param movie
   * @returns true if movie is in list, false if movie is not
   */

  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description calls the isFav() function and changes the status depending on which it is (isFavorite ? notFavorite)
   * @param movie
   */

  toggleFavorite(movie: any): void {
    const isFavorite = this.isFav(movie);
    console.log(isFavorite);
    isFavorite ? this.removeFavMovie(movie) : this.addFavMovie(movie);
  }

  addFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    console.log();
    this.fetchApiData.addFavoriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open('Movie was added to Favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * @description calls on getUser() and removeFavoriteMovie() to remove selected movie from FavoriteMovie list
   * @param movie
   */

  removeFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.removeFavoriteMovie(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open('Movie has been removed from favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}
