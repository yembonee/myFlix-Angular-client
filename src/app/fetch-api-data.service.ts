import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://rendermovieapi.onrender.com';

/**
 * @description Service for user registration operations
 * @injectable
 */

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * @param {HttpClient} http - Angular module that makes http requests
   */

  constructor(private http: HttpClient) {}

  /**
   * @description Calls API to create user
   * @param {userDetails} - The user's deetails for registration
   * @returns {Observable<any>} returns Observable
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Calls API to login user
   * @param {userDetails} - The user's deetails for login
   * @returns {Observable<any>} returns Observable with token
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Calls API to recieve all movies
   * @returns {Observable<any>} returns Observable that contains all movies
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Extracts non-types response data from API
   * @param {Object}
   * @returns {any}
   * @private
   */

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
   * @description Calls API to recieve one movie
   * @param {title} - The selected movie's title
   * @returns {Observable<any>} - Information on selected movie
   */

  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to recieve one director
   * @returns {Observable<any>} - Information on selected director
   */

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/director/:directorName', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to recieve one genre
   * @returns {Observable<any>} - Information on selected genre
   */

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/genre/:genreName', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to recieve all users
   * @returns {Observable<any>} - Information on all users
   */

  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to recieve one user
   * @returns {Observable<any>} Information on one user
   */

  getUser(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.getAllUsers().subscribe((response) => {
      user = response.filter((item: any) => item.Username == user.Username);
    });
    return user;
  }

  /**
   * @description Calls API to recieve User's Favorite Movie list
   * @param {username} - selected user's username
   * @returns {Observable<any>} - list of user's favorite movie list
   */

  getFavoriteMovie(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to Add selected movie to user's favorite movie list
   * @param {movie} - selected movie
   * @returns {Observable<any>} Added movie to Favorite movie list
   */

  addFavoriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    return this.http
      .post(apiUrl + '/users/' + user.Username + '/movies/' + movie._id, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to update the user's information
   * @param {userDetails} - the user's details to be updated
   * @returns {Observable<any>} the updated user's information
   */

  editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/' + userDetails.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to remove user from database
   * @returns {Observable<any>} removes user
   */

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(apiUrl + '/users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls API to remove movie from favorite movie list
   * @param {movie} - selected movie ready to be removed
   * @returns {Observable<any>} new list without the selected movie
   */

  removeFavoriteMovie(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + user.Username + '/movies/' + movie._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Extracts non typed respone data from API
   * @param {error} - API response
   * @returns {any} Extracted Response
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
