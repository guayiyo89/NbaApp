import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';

@NgModule({
  declarations: [	
    HeaderComponent,
    ModalErrorComponent,
    NotFoundComponent,
   ],
  imports: [
    MaterialModule,
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    ModalErrorComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }