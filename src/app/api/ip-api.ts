import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MathService} from '../service/math.service';
import {PersonInfo} from '../model/person-info.model';


@Injectable({
  providedIn: 'root',
})
export class IpApiService {

  private errorMessage: string = '';

  public get ErrorMessage(): string {
    return this.errorMessage;
  }

  constructor(private http: HttpClient,
              private mathService: MathService) {

  }

  public getPersonInfo(ip: string): Observable<PersonInfo> {
    const url = this.getUrl(ip);

    return this.http.get<any>(url)
      .pipe(
        map((data) => {
          return this.personInfo(data, data.latitude, data.longitude);
        }),
        catchError((err) => {
          console.log(err);
          this.errorMessage = err.message;
          return [];
        })
      );
  }

  private personInfo(data: any, latitude: number, longitude: number): PersonInfo {
    return {
      region: data.region,
      city: data.city,
      timezone: data.timezone,
      distanceToZeroKm: this.mathService.calcDistanceToZeroKm(latitude, longitude)
    }
  }

  private getUrl(ip: string) {
    return 'https://ipapi.co/' + ip + '/json/';
  }
}
