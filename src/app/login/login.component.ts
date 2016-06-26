/**
 * Created by constantant on 17.06.2016.
 */
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {OAuthService} from 'angular2-oauth2/oauth-service';

@Component({
    directives: [ROUTER_DIRECTIVES],
    template: require('./login.component.html'),
    styles: [
        require('./login.component.css')
    ]
})
export class Login {

    constructor(private oauthService:OAuthService) {

    }

    ngOnInit() {
        console.log('login ' + this.oauthService.getAccessToken());
        console.log(this);
        // this.title.getData().subscribe(data => this.data = data);
    }
}
