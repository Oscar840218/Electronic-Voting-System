import { AuthServiceService } from './../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/login',         title: 'Login',             icon:'nc-key-25', class: '' },
    { path: '/register',      title: 'Register',          icon:'nc-tile-56',    class: '' },
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/typography',    title: 'Vote',              icon:'nc-tap-01',    class: '' },
    { path: '/icons',         title: 'Profile',           icon:'nc-single-02',  class: '' },
    { path: '/user',          title: 'Logout',            icon:'nc-button-power',  class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(
      public authService: AuthServiceService,
      private router: Router
    ) { }

    onLogout() {
      this.authService.logout();
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
