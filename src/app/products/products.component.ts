import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Component({
	moduleId: module.id,
	selector: "products",
	templateUrl: 'products.component.html'
})
export class ProductsComponent {
	@Output('selected') selected = new EventEmitter();
	data: Observable<Array<any>>;
	active: boolean = false;
	searchText: string = "";
	url = 'api/products';

	private searchTermStream = new Subject<string>();

	constructor(private http: Http) {
		this.data = this.searchTermStream
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap((term: string) => {
				return this.loadData(term);
			});

		let _this = this;
		setTimeout(function() {
			_this.changed();
		}, 500);
	}

	changed() {
		this.search(this.searchText);
	}

	search(term: string) { 
		this.searchTermStream.next(term);
	}

	loadData(term) {
		return this.http.get(this.url + (term ? '/?name=^' + term : '')).map(res => {
			return res.json().data;
		});
	}
}
