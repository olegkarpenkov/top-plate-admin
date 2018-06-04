import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from './components/app-common.module';
import { SignInRouteComponent } from './routes/sign-in-route/sign-in-route.component';
import { HomeRouteComponent } from './routes/home-route/home-route.component';
import { AuthGuard } from './guards/auth.guard';
import { GeneralDataResolver } from './resolvers/generalData.resolver';
import { UsersDataResolver } from './resolvers/usersData.resolver';
import { UsersRouteComponent } from './routes/users-route/users-route.component';
import { PlatesRouteComponent } from './routes/plates-route/plates-route.component';

const appRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInRouteComponent,
    data: {}
  },
  {
    path: 'home',
    component: HomeRouteComponent,
    resolve: {
      generalData: GeneralDataResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'plates',
    component: PlatesRouteComponent,
    resolve: {
      // platesData: UsersDataResolver
    },
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'sign-in'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppCommonModule
  ],
  providers: [
    AuthGuard,
    GeneralDataResolver,
    UsersDataResolver
  ],
  declarations: [
    SignInRouteComponent,
    HomeRouteComponent,
    UsersRouteComponent,
    PlatesRouteComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    SignInRouteComponent,
    HomeRouteComponent,
    UsersRouteComponent,
    PlatesRouteComponent
  ]
})
export class AppRoutingModule {}

export const AppRouting = RouterModule.forRoot(appRoutes, {useHash: true});
