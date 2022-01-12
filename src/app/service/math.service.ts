import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  ZIRO_KM_latitude = 55.75578;
  ZIRO_KM_longitude = 37.61786;
  MEAN_EARTH_RADIUS = 6371;

  public calcDistanceToZeroKm(latitude: number, longitude: number) {
    return this.MEAN_EARTH_RADIUS * Math.acos(
      Math.sin(this.ZIRO_KM_latitude * Math.PI / 180) * Math.sin(latitude * Math.PI / 180) +
      Math.cos(this.ZIRO_KM_latitude * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) *
      Math.cos((this.ZIRO_KM_longitude - longitude) * Math.PI / 180)
    );
  }
}
