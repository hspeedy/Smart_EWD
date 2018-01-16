import { Injectable, EventEmitter, Input, Output } from '@angular/core';

import { ISettings } from './../interfaces/isettings'

@Injectable()
export class SettingsService {

  private changeAxisValue: boolean;
  private settings: ISettings;

  @Output() changeAxisChange = new EventEmitter<boolean>();

  constructor() { 
    this.settings = {
      changeAxis: false
    }
  }

  @Input() set changeAxis(val: boolean) {
    this.changeAxisValue = val;
    this.saveSettings();
    this.changeAxisChange.emit(val);
  };

  get changeAxis() {
    return this.changeAxisValue;
  }

  public loadSettings() {
    this.loadData('settings.dat').then((settings: string) => {
      this.settings = JSON.parse(settings);
      if(this.settings !== undefined) {
        this.changeAxis  = this.settings.changeAxis;
      } else {
        this.initSettings();
      }
      this.update();
    }).catch((fileError: FileError) => {
      this.initSettings();
    });
  }

  public saveSettings() {
    this.settings.changeAxis = this.changeAxis;
    this.saveData('settings.dat', JSON.stringify(this.settings)).then(() => {
    }).catch((fileError: FileError) => {
    });
  }

  private update() {
    this.changeAxis      = this.settings.changeAxis;
  }

  private initSettings() {
    this.settings.changeAxis = false;
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
