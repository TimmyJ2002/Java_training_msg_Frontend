import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class NotificationModule { }
