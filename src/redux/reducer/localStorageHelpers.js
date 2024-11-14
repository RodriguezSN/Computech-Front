export const saveCartToLocalStorage = (cartItems) => {
    try {
        const serializedCartItems = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', serializedCartItems);
    } catch (error) {
        console.error('Could not save cart items to localStorage:', error);
    }
};

export const loadCartFromLocalStorage = () => {
    try {
        const serializedCartItems = localStorage.getItem('cartItems');
        if (serializedCartItems === null) {
            return [];
        }
        return JSON.parse(serializedCartItems).map(item => ({
            ...item,
            quantity: item.quantity ?? 1, 
        }));
    } catch (error) {
        console.error('Could not load cart items from localStorage:', error);
        return [];
    }
};