import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'
import {Animations} from '../shared/animations';

@Component({
	moduleId: module.id,
	selector: "client-details",
	templateUrl: 'client-details.component.html',
	animations: Animations.flyInOut
})
export class ClientDetailsComponent {
	@Input('client') client: any;
	@Output('resetClient') resetClient = new EventEmitter();

	selected: boolean = false;

	delete() {
		this.resetClient.emit();
	}
}
