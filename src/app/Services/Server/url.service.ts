import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  // === Server NetWork === //
  serverIp: any;
  public url: any;
  // === Server NetWork === //
  constructor() {}
  async setupUrlConnection() {
    await fetch('./assets/ip.json')
      .then((res) => res.json())
      .then((json) => {
        this.serverIp = json;
        this.url = `http://${this.serverIp.ip}:${this.serverIp.port}/`;
      });
    // console.log('UrlService URL:', this.url);
    return this.url;
  }
}
