import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always'},
  { path: 'events', component: EventsComponent},
  { path: 'search/:search', component: SearchResultsComponent, runGuardsAndResolvers: 'always'},
  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
