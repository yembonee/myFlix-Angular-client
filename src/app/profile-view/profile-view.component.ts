import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DescriptionInfoComponent } from '../description-info/description-info.component';
import { UpdateUserInfoComponent } from '../update-user-info/update-user-info.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  /**
   *
   * @param fetchApiData
   * @param snackBar
   * @param router
   * @param dialog
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getFavoriteMovies();
  }

  /**
   * @description calls on getUser() to obtain a single user's information
   */

  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) =>
        this.user.FavoriteMovies.includes(movie._id)
      );
    });
  }

  /**
   * @description Opens UpdateUserInfoComponent
   */

  openUpdateUserInfoDialog(): void {
    this.dialog.open(UpdateUserInfoComponent, {
      width: '360px',
    });
  }

  /**
   * @description calls deleteUser() to remove user from database
   */

  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User succesffuly removed', 'OK', {
        duration: 2000,
      });
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
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
   * @description calls on getUser() and removeFavoriteMovie() to remove selected movie from FavoriteMovie list
   * @param movie
   */

  removeFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.removeFavoriteMovie(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.getProfile();
      this.snackBar.open('Movie has been removed from favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}
