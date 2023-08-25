import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {LanguageService} from "./services/language.service";
import {interval, Subject, Subscription, switchMap, takeUntil} from "rxjs";
import {TranslateService} from '@ngx-translate/core';
import {translate} from "@angular/localize/tools";
import {Notification} from  "./notification/models/notification";
import {NotificationService} from "./notification/services/notification.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {NotificationDialogComponent} from "./notification/components/notification-dialog/notification-dialog.component";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
    title = 'untitled';
    notifications: Notification[] = [];
    isLoggedIn: boolean = false;
    selectedLanguage: string = 'ro';
    languages = [
        { value: 'en', viewValue: 'English' },
        { value: 'ro', viewValue: 'Romanian' }
    ];
    rightsList: string[] = [];
    unReadNotificationsCount: number = 0;
    private unsubscribe$ = new Subject<void>();
    isChecked: boolean = false;

    constructor(public authService: AuthService,
                private router: Router,
                private notificationService: NotificationService,
                public dialog: MatDialog,
                private languageService: LanguageService) {
    }

  private startPeriodicNotifications(): void {
    interval(5000)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(() => this.notificationService.getNotifications())
      )
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.unReadNotificationsCount = notifications.filter(
          (notification) => !notification.isRead
        ).length;
      });
  }

  private stopPeriodicNotifications(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
            this.unReadNotificationsCount = notifications.filter(notification => !notification.isRead).length;
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


    }

    hasPermission(requiredPermissions: string[]) {
        this.getPermission();
        return (requiredPermissions).some((right) => this.rightsList.includes(right))
    }

    getPermission(): void {
        jwtDecode(sessionStorage.getItem("accessToken")!);
        let token = jwtDecode<{sub: string, permissions: string[]}>(sessionStorage.getItem("accessToken")!)
        this.rightsList = token.permissions;
    }

    switchLanguage(language: string) {
        console.log(this.languageService);
        this.languageService.setLanguage(language);
    }
    getTranslatedMessage(key: string): string {
        return this.languageService.getTranslation(key);
    }

    ngOnInit(): void {
      this.switchLanguage('en');
      this.isLoggedIn = this.authService.isAuthenticated();
      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.startPeriodicNotifications();
        } else {
          this.stopPeriodicNotifications();
        }
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the interval and clean up when the component is destroyed
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected readonly sessionStorage = sessionStorage;

}


