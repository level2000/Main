import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Client } from './client';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClientService {
  private clientsUrl = environment.lexiconApi + 'clients';
  private headers: Headers;
  private requestOptions;
  private gotBearerToken = false;

  constructor(
    private http: Http,
    public securityService: OidcSecurityService
  ) {
    console.log('ClientService.Constructor()');
    this.setHeaders();
  }

  getClients(): Promise<Client[]> {
    if ( this.gotBearerToken === false ) {
      console.log('Can\'t get client list because there is no bearer token!!!');
      return null;
    }
    console.log('getting client list from api.');
    return this.http.get(this.clientsUrl, this.requestOptions)
      .toPromise()
      .then(response => {
        console.log('converting response.json to client[].');
        return response.json() as Client[];
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred in the client service.', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private setHeaders() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    const token = this.securityService.getToken();

    if ( token !== '') {
      const tokenValue = 'Bearer ' + token;
      this.headers.append('Authorization', tokenValue);
        console.log('Finished setting ClientService authorization header with bearer token.');
        this.gotBearerToken = true;
    }
    this.requestOptions = {headers: this.headers};
  }
}
