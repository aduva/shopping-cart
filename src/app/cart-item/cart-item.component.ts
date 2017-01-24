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
import {Animations} from '../shared/animations';

@Component({
	moduleId: module.id,
	selector: 'cart-item',
	templateUrl: 'cart-item.component.html',
	animations: Animations.flyInOut
})
export class CartItemComponent implements OnInit {
	@Input("item") item: any;
	
	selectedCartProduct: Observable<any>;
	selected: boolean = false;
	editing: boolean = false;
	tempAmount: number = 1;

	constructor(private store: Store<AppStore>) {}

	ngOnInit() {
		this.selectedCartProduct = this.store.select('selectedCartItem');
		this.selectedCartProduct.subscribe(v => { this.selected = (v && v.product.id === this.item.product.id); this.editing = this.editing && this.selected; });
		this.tempAmount = this.item.amount;
	}

	onClick() {
		if (!this.selected) {
			this.select();
		} else {
			this.unselect();
		}
	}

	add(amount = 1) {
		this.tempAmount += amount;
		this.set(this.item.amount, this.item.product.price * this.tempAmount);
	}

	set(amount, sum) {
		let tempItem = Object.assign({}, this.item, {amount: amount, sum: sum});
		this.update(tempItem);
	}

	save() {
		let _this = this;
		this.set(this.tempAmount, this.item.product.price * this.tempAmount);
		setTimeout(function() {
			_this.unselect();
		}, 100);
	}

	cancel() {
		this.set(this.item.amount, this.item.product.price * this.item.amount);
		let _this = this;
		setTimeout(function() {
			_this.unselect();
		}, 100);
	}

	update(item = this.item) {
		this.store.dispatch({type: 'UPDATE_CART_ITEM', payload: item});
	}

	edit() {
		this.editing = true;
	}

	delete() {
		this.unselect();
		this.store.dispatch({type: 'DELETE_CART_ITEM', payload: this.item});
	}

	unselect() {
		this.tempAmount = this.item.amount;
		this.editing = false;
		this.store.dispatch({type: 'SELECT_CART_ITEM', payload: null });
	}

	select() {
		this.store.dispatch({type: 'SELECT_CART_ITEM', payload: this.item});
	}
}