import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler, HttpClientModule} from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavigationComponent } from '../app/navigation/navigation.component';
import { ClientService } from '../app/client/client.service';
import { ClientListComponent } from '../app/client/client-list-component/client-list-component';
import { HomeComponent } from './home/home.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';

@NgModule({
  declarations: [
    AppComponent, NavigationComponent, HomeComponent, AutoLoginComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule  ,
    FormsModule   ,       
    HttpModule,    
   AuthModule.forRoot(),
   RouterModule.forRoot ( [ 
      {  path: 'main' , component: AppComponent }
      ,
      {  path: 'home' , component: HomeComponent }
      ,
      {  path: 'autologin' , component: AutoLoginComponent }
     
] )        
  ],
  providers: [OidcSecurityService,HttpClient, AuthModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public oidcSecurityService: OidcSecurityService) {

      const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
      openIDImplicitFlowConfiguration.stsServer = 'https://daue2sungtwb01.azurewebsites.net/core';
      openIDImplicitFlowConfiguration.redirect_url = environment.redirectUrl;
      openIDImplicitFlowConfiguration.client_id = 'lex.test.client';
      openIDImplicitFlowConfiguration.response_type = 'id_token token';
      openIDImplicitFlowConfiguration.scope = 'openid profile roles all_claims lexapi';
      openIDImplicitFlowConfiguration.post_logout_redirect_uri = environment.postLogoutRedirectUri;
      openIDImplicitFlowConfiguration.post_login_route = '/home';
      openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
      openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
      openIDImplicitFlowConfiguration.trigger_authorization_result_event = true;
      openIDImplicitFlowConfiguration.log_console_warning_active = true;
      openIDImplicitFlowConfiguration.log_console_debug_active = true;
      openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 20;
      openIDImplicitFlowConfiguration.override_well_known_configuration = false;

      this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
}
