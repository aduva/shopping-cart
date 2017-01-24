import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'

@Component({
	moduleId: module.id,
	selector: "client-select",
	templateUrl: 'client-select.component.html'
})
export class ClientSelectComponent implements OnInit {
	@Input('url') url: string;
	@Output('selected') selected = new EventEmitter();
	data: Observable<Array<any>>;
	active: boolean = false;
	searchText: string;
	showCreateHint: Observable<boolean>;

	private searchTermStream = new Subject<string>();
	private showCreateHintStream = new Subject<boolean>();

	constructor(private http: Http) {
		this.data = this.searchTermStream
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap((term: string) => this.loadData(term));

		this.showCreateHint = this.showCreateHintStream
			.debounceTime(2000)
			.distinctUntilChanged()
			.switchMap(show => Observable.of(show));
	}

	ngOnInit() {
	}

	select(item) {
		this.data.forEach(i => i.selected = false);
		item.selected = true;
		this.searchText = item.name;
		this.showCreateHintStream.next(false);
		this.selected.emit(item);
	}

	changed() {
		this.search(this.searchText);
	}

	onEnter() {
	}

	search(term: string) { 
		this.searchTermStream.next(term);
		this.showCreateHintStream.next((term || term.length > 0));
	}

	loadData(term) {
		return this.http.get(this.url + term).map(res => res.json().data);
	}

	focusLost() {
		let _this = this;
		setTimeout(function() { _this.active = false; }, 300);
	}

	focusIn() {
		this.active = !this.active;
		this.search('');
	}
}
