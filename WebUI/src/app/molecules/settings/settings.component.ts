import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  reverse: boolean;
  
  constructor(public activeModal: NgbActiveModal,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.reverse = this.settingsService.reverse;
  }

  onChangeReverse($event: boolean) {
    this.reverse = $event;
    this.settingsService.reverse = this.reverse;
  }

}
