import {InMemoryDbService} from 'angular2-in-memory-web-api';

export class InMemoryService implements InMemoryDbService {
	createDb() {
		let products = [
			{ id: 1, name: 'Windstorm', price: 1260 },
			{ id: 2, name: 'Bombasto', price: 1260 },
			{ id: 3, name: 'Magneta', price: 1260 },
			{ id: 4, name: 'Tornado', price: 1260 },
			{ id: 5, name: 'Windstorm2', price: 1260 },
			{ id: 6, name: 'Bombasto2', price: 1260 },
			{ id: 7, name: 'Magneta2', price: 1260 }
		];
		let clients = [
			{ id: 1, name: 'Milkhouse', phone: '+77077803676' },
			{ id: 2, name: 'Marge', phone: '+77077803676' },
			{ id: 3, name: 'Maggie', phone: '+77077803676' },
			{ id: 4, name: 'Lisa', phone: '+77077803676' },
			{ id: 5, name: 'Bart', phone: '+77077803676' },
			{ id: 6, name: 'Moe', phone: '+77077803676' },
			{ id: 7, name: 'Homer', phone: '+77077803676' }
		];
		return {products, clients};
	}
}

export interface Product {
	id: number;
	name: string;
	price: number;
};

export interface CartItem {
	product: Product;
	amount: number;
	sum: number;
	discount: number;
};