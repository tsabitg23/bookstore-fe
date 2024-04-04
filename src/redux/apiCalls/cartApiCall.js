import toast from "react-hot-toast";
import { cartActions, localStorageCartName } from "../slices/cartSlice";

// login user
export function addToCart(book){
    return (dispatch, getState) => {
        toast.success('Ordered!');
    }
}

// logout user
export function removeFromCart(book){
    return (dispatch, getState) => {
        const index = bookExistsInCart(getState().cart.books, book)
        if (index != -1) {
            dispatch(cartActions.remove(index));
            localStorage.setItem(localStorageCartName(), JSON.stringify(getState().cart.books))
            toast.success('Successfully deleted!')
        } else toast.error('Book is not exists')
    }
}

export function bookExistsInCart(books, book) {
    return books.findIndex(e => e._id === book._id);
}