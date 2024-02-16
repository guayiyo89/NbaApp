import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/core/interfaces/teams';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html'
})
export class ShowTeamComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Team) { }

  ngOnInit() {

  }



}
