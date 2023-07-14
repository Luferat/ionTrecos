import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {

  public coords = {
    latitude: 0,
    longitude: 0,
    speed: 0,
    accuracy: 0,
    mapURL: ''
  }

  public photoImg: any;

  constructor() {

    // Obtém dados do GPS do dispositivo.
    Geolocation.getCurrentPosition()
      .then((x) => {
        console.log(x);
        this.coords = {
          latitude: x.coords.latitude,
          longitude: x.coords.longitude,
          speed: (x.coords.speed) ? x.coords.speed : 0,
          accuracy: x.coords.accuracy,
          mapURL: `https://www.google.com/maps/search/?api=1&query=${x.coords.latitude},${x.coords.longitude}`
        }
      })

    // Obtém dados do próprio dispositivo.
    Device.getInfo()
      .then((x) => {
        console.log('Dados do dispositivo:', x);
      })

    // Obtém status da bateria.
    Device.getBatteryInfo()
      .then((x) => {
        console.log('Status da bateria:', x);
      })

    // Obtém o Id único do dispositivo.
    Device.getId()
      .then((x) => {
        console.log('Id do dispositivo:', x);
      })

  }

  ngOnInit(): void { }

}
