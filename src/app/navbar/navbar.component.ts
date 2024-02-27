import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /**
   * @param router
   * @param snackBar
   */
  constructor(public router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  /**
   * @description navigates to the movies tab
   */

  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @description navigates to the profile tab
   */

  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @description navigates to the welcome screen after logging out user
   */

  public logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('User logout succesfully', 'OK', {
      duration: 2000,
    });
  }
}
