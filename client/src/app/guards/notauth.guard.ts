import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authServiceService.loggedIn()) {
        this.router.navigate(['/']);
        return false;
    } else {
        return true;
    }
  }
}
