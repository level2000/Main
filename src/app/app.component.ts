import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../app/navigation/navigation.component'
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { OidcSecurityService, AuthorizationResult } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  
})
export class AppComponent {
  title = 'loading...';

  constructor(public securityService: OidcSecurityService,
    private router: Router
) {
    // if ( this.securityService.moduleSetup) {
    //     this.onOidcModuleSetup();
    // } else {
    //     this.securityService.onModuleSetup.subscribe(() => {
    //         this.onOidcModuleSetup();
    //     });
    // }
}

private onOidcModuleSetup() {
    console.log('App.Component: onOidcModuleSetup: ' + window.location.href);
    if ( this.gotTokenInHref() ) {
        console.log('App.Component: onOidcModuleSetup: found token in href.');
        this.securityService.authorizedCallback();
    } else {
        if ('/autologin' !== window.location.pathname) {
            console.log('redirecting to ' + window.location.pathname + ' .');
            this.write('redirect', window.location.pathname);
        }
        console.log('AppComponent:onModuleSetup');
        this.securityService.getIsAuthorized().subscribe((authorized: boolean) => {
            if (!authorized) {
                console.log('redirecting to auto login.');
                this.router.navigate(['/autologin']);
            }
        });
    }
}

private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
    console.log('App.Component: onAuthorizationResultComplete');
    const path = this.read('redirect');
    console.log('AppComponent:onAuthorizationResultComplete: path: ' + path);
    if (authorizationResult === AuthorizationResult.authorized) {
        this.router.navigate([path]);
    } else {
        this.router.navigate(['/Unauthorized']);
    }
}

private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data != null) {
        return JSON.parse(data);
    }

    return;
}

private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

ngOnInit() {
    // if (window.location.hash) {
    if ( this.gotTokenInHref() ) {
            console.log('App.Component: ngOnInit: found token in href.');
        this.securityService.authorizedCallback();
    }
}

gotTokenInHref(): boolean {
    return (window.location.href.indexOf('#id_token') > -1);
}

login() {
    console.log('start login');
    this.securityService.authorize();
}

refreshSession() {
    console.log('start refreshSession');
    this.securityService.authorize();
}

logout() {
    console.log('start logoff');
    this.securityService.logoff();
}



}
