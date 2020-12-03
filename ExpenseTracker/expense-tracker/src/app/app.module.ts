import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { SpeechService } from './Services/speech.service';
import { ListenComponent } from './Components/listen/listen.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListenComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    SpeechService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
