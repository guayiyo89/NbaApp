import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/core/interfaces/teams';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  addForm: FormGroup;
  conference: string = ''

  divisions = [
    {divisionValue: 'Southeast', conference: 'East'},
    {divisionValue: 'Central', conference: 'East'},
    {divisionValue: 'Atlantic', conference: 'East'},
    {divisionValue: 'Southwest', conference: 'West'},
    {divisionValue: 'Northwest', conference: 'West'},
    {divisionValue: 'Pacific', conference: 'West'},
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: Team,  private fbuilder: FormBuilder) { 
    this.addForm = this.fbuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      nick: ['', Validators.required],
      code: ['', Validators.required],
      division: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  setConference() {
    let value = this.addForm.get('division')!.value
    this.conference = this.divisions.filter(div => div.divisionValue == value)[0].conference
  }

  get f() { return this.addForm.controls; }

}

const DIVISION = {
  
}
