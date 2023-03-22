import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
interface ServerIp {
  ip: string;
  port: number;
}
@Injectable({
  providedIn: 'root',
})
export class UrlService {
  // === Server NetWork === //
  serverIp!: ServerIp;
  url!: string;
  // === Server NetWork === //
  constructor() {}
  // async
  async setupUrlConnection() {
    await fetch('./assets/ip.json')
      .then((res) => res.json())
      .then((json) => {
        this.serverIp = json;
        this.url = `http://${this.serverIp.ip}:${this.serverIp.port}`;
      });
    // console.log('UrlService URL:', this.url);
    return this.url;
  }
}
