import { Component} from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  title = 'AngularAuth';
  
  shouldShowLoginRegisterTab(): boolean {
    return !this.authService.isUserLoggedIn();
  }

  logOutClicked() {
    this.authService.logout();
  }
}
