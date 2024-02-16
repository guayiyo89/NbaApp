import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateTeamComponent } from '../create-team/create-team.component';
import { Team } from 'src/app/core/interfaces/teams';
import { DIVISIONS } from 'src/app/core/constants/division.constant';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html'
})
export class EditTeamComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  editForm: FormGroup;
  conference: string = '';

  divisions = DIVISIONS

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Team,
    private fbuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateTeamComponent>
  ) {
    this.editForm = this.fbuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      nick: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(3)]],
      division: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.editForm.get('name')!.setValue(this.data.name)
    this.editForm.get('city')!.setValue(this.data.city)
    this.editForm.get('code')!.setValue(this.data.code)
    this.editForm.get('nick')!.setValue(this.data.nickname)
    this.editForm.get('division')!.setValue(this.data.leagues.standard?.division)
    this.conference = this.data.leagues.standard?.conference || ''
  }

  setConference() {
    let value = this.editForm.get('division')!.value;
    //como filtra por el nombre de division exacto se trae el valor que devuelve el arreglo
    this.conference = this.divisions.filter(
      (div) => div.divisionValue == value
    )[0].conference;
  }

  saveData() {
    let data: Team = {
      id: this.data.id,
      name: this.editForm.get('name')!.value,
      nickname: this.editForm.get('nick')!.value,
      city: this.editForm.get('city')!.value,
      code: this.editForm.get('code')!.value,
      logo: this.data.logo,
      allStar: this.data.allStar,
      nbaFranchise: this.data.nbaFranchise,
      leagues: {
        standard: {
          conference: this.conference,
          division: this.editForm.get('division')!.value,
        },
        vegas: {
          conference: this.data.leagues.vegas?.conference || '',
          division: this.data.leagues.vegas?.division || '',
        },
        utah: {
          conference: this.conference,
          division: this.editForm.get('division')!.value,
        },
        sacramento: {
          conference: this.conference,
          division: this.editForm.get('division')!.value,
        },
      },
    };

    this.onClose.emit(data);
    this.dialogRef.close();
  }

  get f() {
    return this.editForm.controls;
  }
}
