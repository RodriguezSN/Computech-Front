import Swal from "sweetalert2";
import axios from "axios";
import {
	GET_DETAIL,
	GET_PRODUCTS,
	GET_ALL_PRODUCTS,
	GET_USERS,
	GET_SALES,
	CLEAN_DETAIL,
	SET_FILTER,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	UPDATE_CART_ITEM_QUANTITY,
	SET_FILTER_PRODUCTS,
	DELETE_PRODUCT,
	SET_ALL_PRODUCTS,
	SET_CATEGORY_FILTER,
	FILTER_BY_BRAND,
	FILTER_BY_CATEGORY,
	SET_BRANDS,
	SEARCH_PRODUCTS_BY_NAME,
	SET_CATEGORIES,
	SET_NAME_ORDER,
	SET_PRICE_ORDER,
	SET_CART_ITEMS,
	RESET_FILTERS,
	GET_ALL_REVIEWS,
	UPDATE_DATA_USER,
	CALCULATE_AVERAGE_RATINGS
} from "./types";

export const getProducts = () => async (dispatch) => {
	try {
		const response = await axios.get("/products");
		const { data } = response;
		dispatch(setAllProducts(data));
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};

export const setNameOrder = (order) => ({
	type: SET_NAME_ORDER,
	payload: order
});

export const setPriceOrder = (order) => ({
	type: SET_PRICE_ORDER,
	payload: order
});

export const getBrands = () => async (dispatch) => {
	try {
		const response = await fetch("/brands");
		const data = await response.json();
		dispatch({ type: SET_BRANDS, payload: data });
	} catch (error) {
		console.error("Error fetching brands:", error);
	}
};

export const getCategories = () => async (dispatch) => {
	try {
		const response = await fetch("/categories");
		const data = await response.json();
		dispatch({ type: SET_CATEGORIES, payload: data });
	} catch (error) {
		console.error("Error fetching brands:", error);
	}
};

export const searchProductsByName = (name) => {
	return async (dispatch, getState) => {
		try {
			let response;
			if (name.trim() === "") {
				// Si el nombre está vacío, obtiene todos los productos
				response = await axios.get("/products");
			} else {
				// Busca productos por nombre
				response = await axios.get(`/products/name?name=${name}`);
			}

			if (response.data.length === 0) {
				// Si el resultado de la búsqueda está vacío, muestra un mensaje de alerta
				alert("No se encontraron productos con ese nombre");
			}

			const searchResults = response.data;

			dispatch({
				type: SEARCH_PRODUCTS_BY_NAME,
				payload: searchResults
			});
		} catch (error) {
			console.error("Error searching products:", error);
		}
	};
};
export const setAllProducts = (products) => ({
	type: SET_ALL_PRODUCTS,
	payload: products
});

export const setCategoryFilter = (category) => ({
	type: SET_CATEGORY_FILTER,
	payload: category
});

export const resetFilters = () => ({
	type: RESET_FILTERS
});

export const setFilterProducts = (products) => ({
	type: SET_FILTER_PRODUCTS,
	payload: products
});

export const setBrandFilter = (brand) => ({
	type: FILTER_BY_BRAND,
	payload: brand
});

export const filterByBrand = (brand) => {
	return {
		type: FILTER_BY_BRAND,
		payload: brand
	};
};

export const filterByCategory = (category) => {
	return {
		type: FILTER_BY_CATEGORY,
		payload: category
	};
};

export const addToCart = (product) => {
	return {
		type: ADD_TO_CART,
		payload: {
			...product,
			cartItemId: Math.random().toString(36).substr(2, 9) // Genera un ID único para el cartItemId
		}
	};
};

export const updateCartItemQuantity = (itemId, quantity) => ({
	type: UPDATE_CART_ITEM_QUANTITY,
	payload: { itemId, quantity }
});

export const removeFromCart = (cartitemId) => ({
	type: REMOVE_FROM_CART,
	payload: cartitemId
});

export const getDetail = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/products/${id}`);
			return dispatch({
				type: GET_DETAIL,
				payload: data
			});
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const cleanDetail = () => {
	return {
		type: CLEAN_DETAIL
	};
};
export const setFilter = (filter) => ({
	type: SET_FILTER,
	payload: filter
});

export const deleteProduct = (id, boolean) => {
	return async (dispatch) => {
		try {
			console.log("action:" + id, boolean);
			await axios.delete(`/products/delete/${id}`, {
				data: { exterminateProduct: boolean }
			});
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	};
};

export const deleteUser = (email) => {
	return async (dispatch) => {
		try {
			console.log("action:", email);
			const response = await axios.delete(`/users/${email}`);
			dispatch({ type: "DELETE_USER_SUCCESS", payload: response.data });
			Swal.fire("Usuario desactivado correctamente");
		} catch (error) {
			console.error("Error updating user:", error);
			dispatch({ type: "DELETE_USER_FAILURE", error });
			Swal.fire("Error al desactivar el usuario");
		}
	};
};
export const setCartItems = (items) => ({
	type: SET_CART_ITEMS,
	payload: items
});

export const getUsers = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/users/");
			return dispatch({
				type: GET_USERS,
				payload: data
			});
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const getAllProducts = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/products/all");
			return dispatch({
				type: GET_ALL_PRODUCTS,
				payload: data
			});
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};
};

export const getAllSales = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/order/");
			return dispatch({
				type: GET_SALES,
				payload: data
			});
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};
};

export const calculateAverageRatings = () => ({
	type: CALCULATE_AVERAGE_RATINGS
});

export const getAllReviews = () => async (dispatch) => {
	try {
		const response = await axios.get("/reviews");
		dispatch({
			type: GET_ALL_REVIEWS,
			payload: response.data
		});
		dispatch(calculateAverageRatings());
	} catch (error) {
		console.error("Error fetching reviews:", error);
	}
};

export const updateDataUser = (id, userData) => {
	console.log("update action id", id);
	console.log("update action", userData);
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/users/put/${id}`, {
				name: userData.name,
				address: userData.address,
				phone: userData.phone,
				image: userData.image
			});
			console.log("data del put", data);
			return dispatch({
				type: UPDATE_DATA_USER,
				payload: data
			});
		} catch (error) {
			console.error("Error updating user data:", error.message);
		}
	};
};
