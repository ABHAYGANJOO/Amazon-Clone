export const initialState = {
    basket: [],
    user: null,
    locatoin: null
}

export const getBasketTotal = (basket) => {
    return basket?.reduce((accumalator, value) => {
        return value.price + accumalator
    }, 0)
}

const reducer = (state, action) => {
    // console.log(state)
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return { ...state, basket: [...state.basket, action.item] }
        case 'REMOVE_FROM_BASKET':
            // console.log("hi")
            const index = state.basket.findIndex((basketItem) => {
                return (basketItem.id === action.payload)
            });
            let newBasket = [...state.basket];
            if (index >= 0) {
                // console.log("hi")
                newBasket.splice(index, 1)
            }
            else {
                console.warn("NOT FOUND")
            }
            return { ...state, basket: newBasket }
        case 'SET_USER':
            return { ...state, user: action.user }

        case 'SET_LOCATION':
            return { ...state, location: action.payload }
        default:
            return state;
    }
}

export default reducer;