import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRouting } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppCommonModule } from './components/app-common.module';
import { AppComponent } from './app.component';
import { AccessPointService } from './services/access-point.service';
import { AuthService } from './services/auth.service';


@NgModule({
  imports: [
    AppRouting,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppCommonModule
  ],
  declarations: [AppComponent],
  providers: [
    AccessPointService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
