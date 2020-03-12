import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module'; 
//routingComponents holds all components declared in routing module

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FindRouteComponent } from './find-route/find-route.component';
import { LocationsComponent } from './locations/locations.component';
// import { DatePipePipe } from './date-pipe.pipe';
// import { DatePipe } from './date.pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FindRouteComponent,
    LocationsComponent,
    // DatePipePipe,
    // DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


