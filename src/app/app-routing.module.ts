import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component';
import { ReportMissingComponent } from './report-missing/report-missing.component';
import { RecycleItemComponent } from './category/recycle-item/recycle-item.component';
import { ResourcesComponent } from './resources/resources.component';
import { FeedComponent } from './home/feed/feed.component';
import { NotificationComponent } from './home/feed/notification/notification.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'recyclables',
    component: CategoryComponent
  },
  {
    path: 'reportmissing',
    component: ReportMissingComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: '**',
    component: HomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [HomeComponent, 
  LocationsComponent, ReportMissingComponent, CategoryComponent,
  RecycleItemComponent, ResourcesComponent, FeedComponent,
 NotificationComponent];
