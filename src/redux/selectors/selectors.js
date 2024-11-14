import { createSelector } from 'reselect';

const selectCartItems = (state) => state.items;

export const getMemoizedCartItems = createSelector(
    [selectCartItems],
    (items) => items.map(item => ({ ...item }))
);