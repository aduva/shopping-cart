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
	selector: "products-item",
	templateUrl: 'products-item.component.html'
})
export class ProductsItemComponent implements OnInit {
	@Input("item") item: any;
	selected: boolean = false;

	constructor(private store: Store<AppStore>) {}

	ngOnInit() {
		this.store.select('cartItems').subscribe(v => {
		 	this.selected = v.some((i) => i.product.id === this.item.id);
		});
	}

	onClick() {
		if (!this.selected) {
			this.add();
		} else {
			this.delete();
		}
	}

	add() {
		let cartItem = {
			product: this.item,
			amount: 1,
			sum: this.item.price,
			discount: 0
		};
		
		this.store.dispatch({type: 'ADD_CART_ITEM', payload: cartItem});
	}

	delete() {
		let cartItem = {
			product: this.item
		};
		this.store.dispatch({type: 'DELETE_CART_ITEM', payload: cartItem});
	}
}
