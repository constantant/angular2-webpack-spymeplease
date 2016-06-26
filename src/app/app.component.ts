/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {GeneratedUrl} from '@angular/router-deprecated/src/rules/route_paths/route_path';

import {OAuthService} from 'angular2-oauth2/oauth-service';

import {AppState} from './app.service';
import {Login} from './login';
import {Home} from './home';
import {RouterActive} from './router-active';


/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    pipes: [],
    providers: [],
    directives: [RouterActive, ROUTER_DIRECTIVES],
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./app.css')
    ],
    template: require('./app.component.html')
})
@RouteConfig([
    {path: '/', name: 'Index', component: Home, useAsDefault: true},
    {path: '/access_token', name: 'Login', redirectTo: ['/Index']},
    {path: '/home', name: 'Home', component: Home},
    // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
    {path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About')}
])
export class App {
    angularclassLogo = 'assets/img/angularclass-avatar.png';
    loading = false;
    name = 'Angular 2 Webpack Starter';
    url = 'https://twitter.com/AngularClass';

    constructor(public appState:AppState,
                private oauthService:OAuthService) {

        // Login-Url
        this.oauthService.loginUrl = "https://oauth.vk.com/authorize"; //Id-Provider?
        this.oauthService.redirectUri = window.location.origin;
        this.oauthService.clientId = "4022476";
        this.oauthService.issuer = "https://api.vk.com/method/";

        // set the scope for the permissions the client should request
        this.oauthService.scope = "8192";
        this.oauthService.oidc = false;
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.tryLogin({});

        console.log('access_token: ' + this.oauthService.getAccessToken());

    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

    login() {
        this.oauthService.initImplicitFlow();
    }

    public logoff() {
        this.oauthService.logOut();
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
