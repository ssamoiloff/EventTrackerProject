import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AttendingPipe } from './pipes/attending.pipe';
import { EventsService } from './services/events.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    NavBarComponent,
    NotFoundComponent,
    CreateEventComponent,
    SearchResultsComponent,
    AttendingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    EventsService,
    DatePipe,
    AttendingPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
