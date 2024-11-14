// src/redux/reducers/rootReducer.js
import {
  ADD_TO_CART,
  GET_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_DETAIL,
  GET_USERS,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAN_DETAIL,
  GET_BY_NAME,
  ORDER_NAME,
  SET_FILTER,
  DELETE_PRODUCT,
  SET_FILTER_PRODUCTS,
  SET_ALL_PRODUCTS,
  SET_CATEGORY_FILTER,
  FILTER_BY_BRAND,
  SET_BRANDS,
  SET_CATEGORIES,
  SEARCH_PRODUCTS_BY_NAME,
  FILTER_BY_CATEGORY,
  RESET_FILTERS,
  SET_NAME_ORDER,
  SET_PRICE_ORDER,
  SET_CART_ITEMS,
  GET_SALES,
  GET_ALL_REVIEWS,
  UPDATE_DATA_USER,
  CALCULATE_AVERAGE_RATINGS
} from "../actions/types";

import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../reducer/localStorageHelpers";

const initialState = {
  allProducts: [],
  copyProducts: [],
  producto: [],
  productDetail: { msj: "hola" },
  items: loadCartFromLocalStorage(),
  filteredProducts: [],
  categoryFilter: "",
  brandFilter: "",
  brands: [],
  categories: [],
  searchResults: [],
  allUsers: [],
  copyUsers: [],
  allProductsActivesDesactives: [],
  copyallProductsActivesDesactives: [],
  allSales: [],
  copyAllSales: [],
  allReviews: [],
  averageRatings: {},
};

const applyFilters = (products, filters) => {
  const { searchResults, categoryFilter, brandFilter } = filters;

  let filtered = products;

  // Aplicar búsqueda por nombre
  if (searchResults && searchResults.length > 0) {
    filtered = filtered.filter((product) => {
      return searchResults.some((result) => result.id === product.id);
    });
  }

  // Aplicar filtro de categoría
  if (categoryFilter !== "" && categoryFilter !== "") {
    filtered = filtered.filter((product) => {
      const normalizedCategoryPayload = String(
        product.CategoryIdCategory
      ).toLowerCase();
      return normalizedCategoryPayload === categoryFilter;
    });
  }

  // Aplicar filtro de marca
  if (brandFilter !== "default" && brandFilter !== "") {
    filtered = filtered.filter((product) => {
      const normalizedBrandIdBrand = String(product.BrandIdBrand).toLowerCase();
      return normalizedBrandIdBrand === brandFilter;
    });
  }

  return filtered;
};

const compareByName = (a, b, order) => {
  if (order === "a-z") return a.name.localeCompare(b.name);
  if (order === "z-a") return b.name.localeCompare(a.name);
  return 0;
};

const compareByPrice = (a, b, order) => {
  if (order === "asc") return a.price - b.price;
  if (order === "desc") return b.price - a.price;
  return 0;
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        copyProducts: [...action.payload],
      };

    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
        copyUsers: [...action.payload],
      };

    case GET_SALES:
      return {
        ...state,
        allSales: action.payload,
        copyAllSales: [...action.payload],
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProductsActivesDesactives: action.payload,
        copyallProductsActivesDesactives: [...action.payload],
      };

    case SEARCH_PRODUCTS_BY_NAME:
      const { payload: searchResults } = action;
      const resetFiltersState = {
        ...state,
        brandFilter: "",
        categoryFilter: "",
        searchResults,
      };
      const filteredResultsAfterSearch = applyFilters(
        state.allProducts,
        resetFiltersState
      );
      return {
        ...resetFiltersState,
        filteredProducts: searchResults,
      };

    case GET_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case SET_BRANDS:
      return { ...state, brands: action.payload };

    case SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.payload,
      };

    case FILTER_BY_BRAND:
      const { payload: brandPayload } = action;
      const normalizedBrandPayload = String(brandPayload).toLowerCase();
      const newStateAfterBrandFilter = {
        ...state,
        brandFilter: normalizedBrandPayload,
      };
      const filteredResultsByBrand = applyFilters(
        state.searchResults.length > 0
          ? state.searchResults
          : state.allProducts,
        newStateAfterBrandFilter
      );
      if (filteredResultsByBrand.length === 0) {
        alert("No se encontraron productos con esa marca");
      }
      return {
        ...newStateAfterBrandFilter,
        filteredProducts: filteredResultsByBrand,
      };

    case FILTER_BY_CATEGORY:
      const { payload: categoryPayload } = action;
      const normalizedCategoryPayload = String(categoryPayload).toLowerCase();
      const newStateAfterCategoryFilter = {
        ...state,
        categoryFilter: normalizedCategoryPayload,
      };
      const filteredProductsByCategory = applyFilters(
        state.searchResults.length > 0
          ? state.searchResults
          : state.allProducts,
        newStateAfterCategoryFilter
      );
      if (filteredProductsByCategory.length === 0) {
        alert("No se encontraron productos en esa categoría");
      }
      return {
        ...newStateAfterCategoryFilter,
        filteredProducts: filteredProductsByCategory,
      };

    case SET_FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id_Product === action.payload.id_Product
      );
      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      saveCartToLocalStorage(updatedItems);
      return {
        ...state,
        items: updatedItems,
      };

    case REMOVE_FROM_CART:
      const updatedItemsAfterRemoval = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
      saveCartToLocalStorage(updatedItemsAfterRemoval);
      return {
        ...state,
        items: updatedItemsAfterRemoval,
      };

    case UPDATE_CART_ITEM_QUANTITY:
      const updatedItemsAfterQuantityChange = state.items.map((item) =>
        item.cartItemId === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      saveCartToLocalStorage(updatedItemsAfterQuantityChange);
      return {
        ...state,
        items: updatedItemsAfterQuantityChange,
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        productDetail: {},
      };

    case GET_BY_NAME:
      return {
        ...state,
        copyProducts: action.payload,
      };

    case ORDER_NAME:
      if (action.payload === "a-z") {
        const orderByName = [...state.copyProducts].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return {
          ...state,
          copyProducts: orderByName,
        };
      } else if (action.payload === "z-a") {
        const orderByName = [...state.copyProducts].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        return {
          ...state,
          copyProducts: orderByName,
        };
      }

    case RESET_FILTERS:
      return {
        ...state,
        brandFilter: "",
        categoryFilter: "",
        filteredProducts: state.allProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.payload
        ),
        copyProducts: state.copyProducts.filter(
          (product) => product.id !== action.payload
        ),
      };

    case SET_NAME_ORDER: {
      const nameOrder = action.payload;
      const productsToSort = state.filteredProducts.length
        ? state.filteredProducts
        : state.allProducts;
      const sortedProducts = [...productsToSort].sort((a, b) =>
        compareByName(a, b, nameOrder)
      );
      return {
        ...state,
        nameOrder,
        filteredProducts: state.filteredProducts.length ? sortedProducts : [],
        allProducts: state.filteredProducts.length
          ? state.allProducts
          : sortedProducts,
      };
    }

    case SET_PRICE_ORDER: {
      const priceOrder = action.payload;
      const productsToSort = state.filteredProducts.length
        ? state.filteredProducts
        : state.allProducts;
      const sortedProducts = [...productsToSort].sort((a, b) =>
        compareByPrice(a, b, priceOrder)
      );
      return {
        ...state,
        priceOrder,
        filteredProducts: state.filteredProducts.length ? sortedProducts : [],
        allProducts: state.filteredProducts.length
          ? state.allProducts
          : sortedProducts,
      };
    }
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        users: state.allUsers.map((user) =>
          user.id === action.payload.id
            ? { ...user, active: action.payload.active }
            : user
        ),
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    case GET_ALL_REVIEWS:
      return {
        ...state,
        allReviews: action.payload,
      };
    case UPDATE_DATA_USER:
      return {
        ...state,
        currentUserData: action.payload,
      };
	  
	  case CALCULATE_AVERAGE_RATINGS:
		const productRatings = {};
		state.allReviews.forEach((review) => {
		  const { ProductIdProduct, ranking, Product } = review;
		  if (!productRatings[ProductIdProduct]) {
			productRatings[ProductIdProduct] = {
			  name: Product.name,
			  id: ProductIdProduct,
			  totalRanking: 0,
			  count: 0,
			};
		  }
		  productRatings[ProductIdProduct].totalRanking += ranking;
		  productRatings[ProductIdProduct].count += 1;
		});
  
		const averageRatings = Object.keys(productRatings).reduce((acc, productId) => {
		  const { name, totalRanking, count } = productRatings[productId];
		  acc[productId] = {
			name,
			id: productId,
			averageRanking: totalRanking / count,
		  };
		  return acc;
		}, {});
  
		return {
		  ...state,
		  averageRatings,
		};
      
    default:
      return { ...state };
  }
}

export default rootReducer;
