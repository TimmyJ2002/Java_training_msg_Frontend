import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Notification} from '../../models/notification'
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css'],
})
export class NotificationDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public notification: Notification,
              public dialogRef: MatDialogRef<NotificationDialogComponent>, public notificationService: NotificationService) {}

  ngOnInit() {
    if (!this.notification.isRead){
      this.notification.isRead = true;
      this.dialogRef.close({markAsRead: true});
    }
  }

  setUnRead(notification: Notification){
    notification.isRead = false;
    this.notificationService.markNotificationAsRead(notification.id, notification)
        .subscribe(() => {
        });
    console.log("marked as read");
  }
}
