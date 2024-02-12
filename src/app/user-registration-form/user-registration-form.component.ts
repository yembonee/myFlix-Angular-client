import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('user registered successfully!', 'OK', {
          duration: 2000,
        });
      },
      error: (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
