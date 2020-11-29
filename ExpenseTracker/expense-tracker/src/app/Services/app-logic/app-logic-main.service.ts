import { Injectable } from '@angular/core';
import { AppLogicSignalR } from './app-logic-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class AppLogicMain {

  constructor(private appLogicSignalR: AppLogicSignalR) { }

  applogicMainTest() {
    this.appLogicSignalR.applogicSignalrTest();
  }
}
