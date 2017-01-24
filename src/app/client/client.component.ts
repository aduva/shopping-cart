import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'

import {Store} from '@ngrx/store';
import {AppStore} from '../shared/appstore.model';
import {Animations} from '../../shared/animations';

@Component({
	moduleId: module.id,
	selector: "client",
	templateUrl: 'client.component.html'
})
export class ClientComponent {

	selectedClient: Observable<any>;

	constructor(private store: Store<AppStore>) {
		this.selectedClient = store.select('selectedClient');
	}

	clientSelected(client) {
		this.store.dispatch({type: 'SELECT_CLIENT', payload: client});
	}

	resetClient() {
		let emptyClient = {id: null, name: ''};
		this.store.dispatch({type: 'SELECT_CLIENT', payload: emptyClient});
	}
}