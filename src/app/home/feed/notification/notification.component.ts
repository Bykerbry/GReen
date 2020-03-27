import { Component, OnInit, Input } from '@angular/core';
import { INotification } from '../../../interfaces';
import { NotificationFeedService } from '../../../services/notification-feed.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification : INotification;

  constructor(public service : NotificationFeedService) { }

  ngOnInit() {
  }

}
