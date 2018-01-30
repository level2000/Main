import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorizedSubscription: Subscription;
    isAuthorized: boolean;
    redirectUrl: string;

    constructor( private oidcSecurityService: OidcSecurityService, private router: Router) {
        console.log('auth guard: constructing...');
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log('auth guard: can activate ...');
        return this.oidcSecurityService.getIsAuthorized()
        .map((isAuthorized: boolean) => {
            if ( isAuthorized ) {
                return true;
            }
            this.redirectUrl = state.url;
            console.log('auth guard: redirect to login:');
            // this.oidcSecurityService.authorize();
            this.router.navigate(['/autologin'], {queryParams: { returnUrl: state.url }});
            return false;
        });

        // return this.getAuthorized(state.url);
    }

    // private getAuthorized(url: string): Observable<boolean> | boolean {
    //     this.oidcSecurityService.getIsAuthorized().subscribe((isAuthorized: boolean) => {
    //         this.isAuthorized = isAuthorized;
    //         console.log('authguard-service for ' + url + ' isAuthorized: ' + this.isAuthorized);
    //         if (this.isAuthorized) {
    //             return true;
    //         }
    //         this.oidcSecurityService.authorize();
    //         return false;
    //     });
    // }
}
