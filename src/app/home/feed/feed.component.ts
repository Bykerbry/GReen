import { Component, OnInit } from '@angular/core';
import { INotification } from '../../interfaces';
import { NotificationFeedService } from '../../services/notification-feed.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  notifications : INotification[];

  constructor(private _feed : NotificationFeedService){}

  ngOnInit() {
    this.notifications = this._feed.getNotifications();
  }

}
