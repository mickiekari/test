import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MathService} from '../service/math.service';
import {PersonInfoJson, PersonInfo} from '../model/person-info.model';


@Injectable({
  providedIn: 'root',
})
export class IpApiService {
  httpParams: object = {
    responseType: 'json'
  }

  private errorMessage: string = '';

  public get ErrorMessage(): string {
    return this.errorMessage;
  }

  constructor(private http: HttpClient,
              private mathService: MathService) {

  }

  public getPersonInfo(ip: string): Observable<PersonInfo> {
    const url = this.getUrl(ip);

    return this.http.get<PersonInfoJson>(url, this.httpParams)
      .pipe(
        map((data) => {
          return this.personInfo(data);
        }),
        catchError((err) => {
          console.log(err);
          this.errorMessage = err.message;
          return [];
        })
      );
  }

  private personInfo(data: PersonInfoJson): PersonInfo {
    return {
      region: data.region,
      city: data.city,
      timezone: data.timezone,
      latitude: data.latitude,
      longitude: data.longitude,
      distanceToZeroKm: this.mathService.calcDistanceToZeroKm(data.latitude, data.longitude)
    }
  }

  private getUrl(ip: string) {
    return 'https://ipapi.co/' + ip + '/json/';
  }
}
