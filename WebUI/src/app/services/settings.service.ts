import { Injectable, EventEmitter, Input, Output } from '@angular/core';

import { ISettings } from './../interfaces/isettings'

@Injectable()
export class SettingsService {

  private changeAxisValue: boolean;
  private invertPitchValue: boolean;
  private invertRollValue: boolean;
  private settings: ISettings;

  @Output() changeAxisChange  = new EventEmitter<boolean>();
  @Output() invertPitchChange = new EventEmitter<boolean>();
  @Output() invertRollChange  = new EventEmitter<boolean>();

  constructor() { 
    this.settings = {
      changeAxis: false,
      invertPitch: false,
      invertRoll: false
    }
    this.update();
  }

  @Input() set invertPitch(val: boolean) {
    this.invertPitchValue = val;
    this.saveSettings();
    this.invertPitchChange.emit(val);
  };

  get invertPitch() {
    return this.invertPitchValue;
  }

  @Input() set invertRoll(val: boolean) {
    this.invertRollValue = val;
    this.saveSettings();
    this.invertRollChange.emit(val);
  };

  get invertRoll() {
    return this.invertRollValue;
  }

  get changeAxis() {
    return this.changeAxisValue;
  }

  @Input() set changeAxis(val: boolean) {
    this.changeAxisValue = val;
    this.saveSettings();
    this.changeAxisChange.emit(val);
  };

  public loadSettings() {
    this.loadData('settings.dat').then((settings: string) => {
      this.settings = JSON.parse(settings);
      if(this.settings !== undefined) {
        this.changeAxis   = this.settings.changeAxis;
        this.invertRoll   = this.settings.invertRoll;
        this.invertPitch  = this.settings.invertPitch;
      } else {
        this.initSettings();
      }
      this.update();
    }).catch((fileError: FileError) => {
      this.initSettings();
      this.update();
    });
  }

  public saveSettings() {
    this.settings.changeAxis  = this.changeAxis;
    this.settings.invertPitch = this.invertPitch;
    this.settings.invertRoll  = this.invertRoll;
    this.saveData('settings.dat', JSON.stringify(this.settings)).then(() => {
    }).catch((fileError: FileError) => {
    });
  }

  private update() {
    this.changeAxis   = this.settings.changeAxis;
    this.invertPitch  = this.settings.invertPitch;
    this.invertRoll   = this.settings.invertRoll;
  }

  private initSettings() {
    this.settings.changeAxis  = false;
    this.settings.invertPitch = false;
    this.settings.invertRoll  = false;
  }

  private saveData(fileName: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let   dataObj: Blob;

      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (directoryEntry: DirectoryEntry) => {
        directoryEntry.getFile(fileName, { create: true }, (fileEntry: FileEntry) => {
          fileEntry.createWriter((fileWriter: FileWriter) => {

            fileWriter.onwriteend = function (e) {
              resolve();
            };

            fileWriter.onerror = function (e) {
              reject(JSON.stringify(e));
            };

            dataObj = new Blob([data], { type: 'text/plain' });
            fileWriter.write(dataObj);
          }, (fileError: FileError) => {
            reject(fileError);
          });
        }, (fileError: FileError) => {
          reject(fileError);
        });
      }, (fileError: FileError) => {
        reject(fileError);
      });
    });
  }

  private loadData(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (directoryEntry: DirectoryEntry) => {
        directoryEntry.getFile(fileName, { create: false }, (fileEntry: FileEntry) => {
          fileEntry.file(function (file) {
            const reader = new FileReader();

            reader.onloadend = function () {
              resolve(this.result);
            };
            reader.onerror = (ev) => {
              reject(JSON.stringify(ev.error));
            };
            reader.readAsText(file);
          });
        }, (fileError: FileError) => {
          reject(fileError);
        });
      }, (fileError: FileError) => {
        reject(fileError);
      });
    });
  }
}
