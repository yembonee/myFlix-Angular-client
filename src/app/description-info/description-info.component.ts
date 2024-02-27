import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-info',
  templateUrl: './description-info.component.html',
  styleUrls: ['./description-info.component.scss'],
})
export class DescriptionInfoComponent implements OnInit {
  /**
   * @param data - director data based off selected movie
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
