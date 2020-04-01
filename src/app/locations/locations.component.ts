import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ICoords, IRoute, ILatLng } from '../interfaces';
import { ShareService } from '../services/share.service';
import { GetRoutesService } from '../services/get-routes.service';
import { MapInfoWindow } from '@angular/google-maps';
import { RecycleCentersService } from '../services/recycle-centers.service';
import { CategoriesService } from '../services/categories.service';
import { GetPickupDateService } from '../services/get-pickup-date.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  
  center: ILatLng;
  zoom: number;
  routes: IRoute[];
  labelLocation: any;
  userRouteInfo: any = { route: '', day: '' }
  infoWindowInfo: any = { route: '', day: '' }
  clicking: boolean = false;
  centerData: any;
  wantsRefuse: boolean;
  subscription: any;
  userNextPickup: Date;
  isLocationSubmitted: boolean = false;
  markers: any[] = [];
  
   
  constructor(
    private _share: ShareService, 
    private _getRoutes: GetRoutesService, 
    private _recycleCenters: RecycleCentersService,
    private _category: CategoriesService,
    private _pickupDate: GetPickupDateService,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.wantsRefuse         = this._share.viewRefuse
    this.centerData          = this._recycleCenters.getCenterData()
    this.clicking            = false
  
    // in case user starts from/bookmarks locations pg
    if (this._getRoutes.refuseRoutes) {
      this.routes = this.wantsRefuse ? this._getRoutes.refuseRoutes : this._getRoutes.recycleRoutes
    } else {
      this.routes = this._getRoutes.getRoutes(this.wantsRefuse)
    }

    this.subscription = this._share.getLocation().subscribe((res: ICoords) => {
      this.center              = res.coords;
      this.zoom                = res.zoom;
      this.isLocationSubmitted = this._share.userSubmittedLocation
      this.clicking            = false

      if (this.isLocationSubmitted) {
        this._pickupDate.getRoute(res.coords, true);
        this._pickupDate.getRoute(res.coords, false);
        this.userNextPickup = this.wantsRefuse ? this._pickupDate.refusePickupDate : this._pickupDate.recyclePickupDate
        this.userRouteInfo  = this.wantsRefuse ? this._pickupDate.refuseRouteInfo : this._pickupDate.recycleRouteInfo
        this._cdr.detectChanges()
        this.placeInfoWindow()
      }
    })
  }

  /***  Methods for Google Map + Polygons ****/

  onPolygonClick(polygon: any, event: any, info: any) {
    this.clicking = true
    // this._cdr.detectChanges()
    this.labelLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    },
    this.infoWindowInfo = info
    this.infoWindow.open(polygon)
  }

  placeInfoWindow() {
    if (this.infoWindow) {
      this.labelLocation = this.center;
      if (this.wantsRefuse) {
        this.infoWindow.close()
        this._cdr.detectChanges()
        this.infoWindow.open(this._pickupDate.refusePolygon)
      }  else {
        this.infoWindow.close()
        this._cdr.detectChanges()
        this.infoWindow.open(this._pickupDate.recyclePolygon)
      }
    }
  }

  toggleRoutes() {
    this._getRoutes.getRoutes(this.wantsRefuse)
    this._share.setRoutesView(this.wantsRefuse)
    this.ngOnInit()
  }

  ngAfterViewInit() {
    if (this.isLocationSubmitted) {
      this.labelLocation = this.center;
      if (this.wantsRefuse) {
        this.infoWindow.open(this._pickupDate.refusePolygon)
      } else {
        this.infoWindow.open(this._pickupDate.recyclePolygon)
      }
    }
  }

  /**** Methods for Categories (Should be a separate component) ****/

  getMarkers(category) {
    this.markers = []
    let centers: any = Object.values(category)[0];
    this.zoom = 11
    let i = 1
    centers.map(center => {
      this.markers.push({
        position: center.coords,
        label: {
          color: '#FFF',
          text: `${i++}`
        },
        address: center.position,
        desc: center.label,
        title: center.title,
        phone: center.phone,
        website: center.website
      })
    })
  }

  getCategoryName(category: any) {
    return Object.keys(category)[0]
  }

  getPath(category: string) {
    return this._category.getPath(category)
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "end"});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
