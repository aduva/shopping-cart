import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule}      from '@angular/core';
import {RouterModule, Router} from '@angular/router';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';

import {AppComponent} from "./app.component";
import {AppRouterModule} from './app.router';
import {FormsModule} from "@angular/forms";
import {HttpModule, XSRFStrategy, CookieXSRFStrategy, Http, ConnectionBackend, XHRBackend, RequestOptions} from '@angular/http';

import {selectedClient, cartItems, sum, selectedCartItem} from './shared/appstore.model';
import {AppInMemoryApiModule} from './app-inmemoryapi.module';
import {COMPONENTS} from './components';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppInMemoryApiModule,
        StoreModule.provideStore({selectedClient, cartItems, sum, selectedCartItem}),
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: 'right'
            })
        }),
        StoreLogMonitorModule
    ],
    declarations: [
        AppComponent,
        COMPONENTS
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
