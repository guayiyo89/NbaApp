import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DIVISIONS } from 'src/app/core/constants/division.constant';
import { Team } from 'src/app/core/interfaces/teams';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  addForm: FormGroup;
  conference: string = '';

  divisions = DIVISIONS

  constructor(
    private fbuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateTeamComponent>
  ) {
    this.addForm = this.fbuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      nick: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(3)]],
      division: ['', Validators.required],
    });
  }

  setConference() {
    let value = this.addForm.get('division')!.value;
    //como filtra por el nombre de division exacto se trae el valor que devuelve el arreglo
    this.conference = this.divisions.filter(
      (div) => div.divisionValue == value
    )[0].conference;
  }

  saveData() {
    let data: Team = {
      id: 999,
      name: this.addForm.get('name')!.value,
      nickname: this.addForm.get('nick')!.value,
      city: this.addForm.get('city')!.value,
      code: this.addForm.get('code')!.value,
      logo: '',
      allStar: false,
      nbaFranchise: true,
      leagues: {
        standard: {
          conference: this.conference,
          division: this.addForm.get('division')!.value,
        },
        vegas: {
          conference: this.conference,
          division: this.addForm.get('division')!.value,
        },
        utah: {
          conference: this.conference,
          division: this.addForm.get('division')!.value,
        },
        sacramento: {
          conference: this.conference,
          division: this.addForm.get('division')!.value,
        },
      },
    };

    this.onClose.emit(data);
    this.dialogRef.close();
  }

  get f() {
    return this.addForm.controls;
  }
}

const DIVISION = {};
