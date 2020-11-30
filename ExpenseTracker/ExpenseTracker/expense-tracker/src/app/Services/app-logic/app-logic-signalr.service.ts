import { Injectable } from '@angular/core';
import { SignalRService } from '../signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class AppLogicSignalR {

  constructor(private signalR: SignalRService) { }

  applogicSignalrTest() {
    this.signalR.invoke("TestMethod")
      .then(c => console.log(c))
      .catch(e => console.warn(e));
  }
}
