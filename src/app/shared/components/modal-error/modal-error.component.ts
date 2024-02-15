import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

enum MessageType {
  error = 'error',
  warning = 'warning',
  check = 'check'
}

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {
  tipoMsg: MessageType
  hasActions: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.tipoMsg = (data.tipo as MessageType) || MessageType.error
    this.hasActions = data.actions
   }

  ngOnInit() {
  }

}