import { Injectable } from '@angular/core';
import { SignalRService } from '../signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class AppLogicSignalR {

  constructor(private signalR: SignalRService) { }


  applogicSignalrTest(){
    console.log('test method print');
  }
}
