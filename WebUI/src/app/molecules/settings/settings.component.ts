import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  changeAxis: boolean;
  
  constructor(public activeModal: NgbActiveModal,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.changeAxis = this.settingsService.changeAxis;
  }

  onChangeChangeAxis($event: boolean) {
    this.changeAxis = $event;
    this.settingsService.changeAxis = this.changeAxis;
  }

}
