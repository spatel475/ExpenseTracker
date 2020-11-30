import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalR";
import { listenerCount } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    this.startConnection();
  }

  startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/serverhub')
      .build();

    this.connection.start()
      .then(() => console.log("SignalR Connected."))
      .catch(e => console.log(e))
  }

  disconnect() {
    if (this.connection || this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.stop();
      this.connection = null;
      console.warn('SignalR disconnected.');
    }
  }

  invoke(methodName: string, ...args: any[]): Promise<any> {
    return this.connection.invoke(methodName, ...args);
  }
}
