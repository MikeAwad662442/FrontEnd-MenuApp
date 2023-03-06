import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { UrlService } from 'src/app/Services/Server/url.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: Socket;
  connect!: string;
  constructor(private urlService: UrlService) {}
  async setupSocketConnection() {
    await this.urlService.setupUrlConnection().then(() => {
      // console.log('SocketService url', this.urlService.url);
      this.socket = io(this.urlService.url);
      this.socket.on('connect', () => {
        this.connect = this.socket.id;
      });
    });
  }
  ifNotConnect() {
    // if (this.socket.connected) {
    if (this.connect) {
      // console.log('socket.connected 2', this.connect); // true
      return true;
    } else {
      return false;
    }
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
