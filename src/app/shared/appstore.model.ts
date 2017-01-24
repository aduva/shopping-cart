export interface AppStore {
	selectedClient: any;
	selectedProducts: [];
	sum: number;
	selectedCartProduct: any;
};

export const selectedClient = (state: any = null, {type, payload}) => {
	switch (type) {
		case 'SELECT_CLIENT':
			return payload;
		default:
			return state;
	}
};

export const selectedCartItem = (state: any = null, {type, payload}) => {
	switch (type) {
		case 'SELECT_CART_ITEM':
			return payload;
		default:
			return state;
	}
};

export const cartItems = (state: any = [], {type, payload}) => {
  	switch (type) {
	    case 'ADD_CART_ITEM':
	    	return [...state, payload];
	    case 'UPDATE_CART_ITEM':
	      	return state.map(item => {
	      		return item.product.id === payload.product.id ? Object.assign(item, payload) : item;
	      	});
	    case 'DELETE_CART_ITEM':
	      	return state.filter(item => {
	        	return item.product.id !== payload.product.id;
	      	});
	    default:
	      	return state;
  	}
};

export const sum = (state: any = 0, {type, payload}) => {
	switch (type) {
	    case 'UPDATE_SUM':
	    	return payload;
	    default:
	      	return state;
  	}
};