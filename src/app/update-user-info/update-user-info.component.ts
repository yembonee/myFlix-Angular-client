import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss'],
})
export class UpdateUserInfoComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserInfoComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('user updated profile successfully!', 'Ok', {
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
