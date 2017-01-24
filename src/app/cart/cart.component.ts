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

@Component({
	moduleId: module.id,
	selector: "cart",
	templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

	data: Observable<any>;
	sum: Observable<number>;

	constructor(private store: Store<AppStore>) {
		this.data = store.select('cartItems');
		this.sum = store.select('sum');

		this.data.subscribe(v => {
			let sum = v.map(x => x.sum).reduce((a, b) => a + b, 0);
			store.dispatch({type: 'UPDATE_SUM', payload: sum});
		});
	}

	ngOnInit() {
	}
}