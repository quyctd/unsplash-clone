import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';
import { JoinComponent } from './main/join/join.component';
import { ErrorComponent } from './common/error/error.component';
import { HomeComponent } from './main/home/home.component';
import { TopbarComponent } from './main/general/topbar/topbar.component';
import { CarouselComponent } from './main/home/editorial/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinComponent,
    ErrorComponent,
    HomeComponent,
    TopbarComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
