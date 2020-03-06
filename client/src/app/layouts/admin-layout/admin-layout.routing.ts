import { NotAuthGuard } from '../../guards/notauth.guard';
import { AuthGuard } from '../../guards/auth.guard';

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { LoginComponent } from './../../pages/login/login.component';
import { RegisterComponent } from './../../pages/register/register.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent ,     canActivate: [AuthGuard]},
    { path: 'user',           component: UserComponent ,          canActivate: [AuthGuard]},
    { path: 'table',          component: TableComponent ,         canActivate: [AuthGuard]},
    { path: 'typography',     component: TypographyComponent ,    canActivate: [AuthGuard]},
    { path: 'icons',          component: IconsComponent ,         canActivate: [AuthGuard]},
    { path: 'notifications',  component: NotificationsComponent , canActivate: [AuthGuard]},
    { path: 'login',          component: LoginComponent ,         canActivate: [NotAuthGuard]},
    { path: 'register',       component: RegisterComponent ,      canActivate: [NotAuthGuard]}
];
