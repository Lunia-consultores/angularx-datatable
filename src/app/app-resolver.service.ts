import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StartupData} from './startup-data.model';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppResolverService {
  private startupData: StartupData;
  constructor(private injector: Injector,
              private httpClient: HttpClient) { }
  load(): Promise<any> {

    this.startupData = null;

    return this.httpClient
      .get('production-config.json')
      .pipe(map((res: Response) => res.json()))
      .toPromise()
      .then((data: any) => this.startupData = data)
      .catch((err: any) => {
        this.startupData = environment;
        Promise.resolve();
      });
  }

  public getStartUpData(): StartupData {
    return this.startupData;
  }

}
