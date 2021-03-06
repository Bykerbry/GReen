import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShareService } from '../services/share.service'
import { GeoLocateService } from '../services/geolocate.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<LandingComponent>, 
              private _share : ShareService,
              private _geoLocate: GeoLocateService) { }

  ngOnInit(): void {
  }

  exitDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this._share.closingDialog();
  }

  geoLocateUser() {
    this.dialogRef.close(true)
    this._share.setLoadingScreen()
    this._geoLocate.geoLocateUser()
  }

}
