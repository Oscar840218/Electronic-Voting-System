import { NotAuthGuard } from '../../guards/notauth.guard';
import { AuthGuard } from '../../guards/auth.guard';

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { LoginComponent } from './../../pages/login/login.component';
import { RegisterComponent } from './../../pages/register/register.component';
import { VoteComponent } from './../../pages/vote/vote.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent ,     canActivate: [AuthGuard]},
    { path: 'user',           component: UserComponent ,          canActivate: [AuthGuard]},
    { path: 'vote',           component: VoteComponent ,          canActivate: [AuthGuard]},
    { path: 'icons',          component: IconsComponent ,         canActivate: [AuthGuard]},
    { path: 'login',          component: LoginComponent ,         canActivate: [NotAuthGuard]},
    { path: 'register',       component: RegisterComponent ,      canActivate: [NotAuthGuard]}
];
