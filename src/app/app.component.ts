import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {Notification} from  "./notification/models/notification";
import {NotificationService} from "./notification/services/notification.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {NotificationDialogComponent} from "./notification/components/notification-dialog/notification-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
    title = 'untitled';
    notifications: Notification[] = [];
    isLoggedIn: boolean = false;

    constructor(public authService: AuthService,
                private router: Router,
                private notificationService: NotificationService,
                public dialog: MatDialog) {
        this.isLoggedIn = this.authService.isAuthenticated();
    }

    logout() {
        this.authService.logout().subscribe(
            () => {
                this.isLoggedIn = false;
                console.log('Logged out successfully');
                this.authService.clearAccessToken();
                this.router.navigate(['/login']);
            },
            (error) => {
                console.error('Error logging out:', error);
            }
        );
    }

    getNotifications() {
        this.notificationService.getNotifications().subscribe(notifications => {
            this.notifications = notifications;
        })
    }

    openDialog(notification: Notification) {
        const dialogRef = this.dialog.open(NotificationDialogComponent, {
            width: '400px',
            data: notification
        });
        notification.isRead = true;
        this.notificationService.markNotificationAsRead(notification.id, notification)
            .subscribe(() => {
            });
        console.log("marked as read");

    }

    ngOnInit(): void {
        this.getNotifications();
    }
}


