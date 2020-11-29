import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalR";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private connection: signalR.HubConnection;

  constructor() { }

  startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('')
      .build();
  }

  disconnect() {
    if (this.connection || this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.stop();
      this.connection = null;
      console.warn('SignalR disconnected.');
    }
  }

  invoke(methodName: string, ...args: any[]): Promise<any> {
    return this.connection.invoke(methodName, args);
  }

}
