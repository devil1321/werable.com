import { Dispatch } from "redux"
import { ShopTypes } from "../types"
import store from "../store"
import * as Interfaces from '@/app/controller/interfaces'

export const addToCart = (id:number,quantity:number,price:number,color:any) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const { products } = store.getState().api
    let tmpCart = cart
    const product = products.find((p:Interfaces.Product) => p.id === id) as Interfaces.Product
    product.inCart = true
    tmpCart.push({ id, quantity,price,color })
    dispatch({
        type:ShopTypes.SHOP_ADD_TO_CART,
        cart:tmpCart
    })
}
export const setCart = (cart:Interfaces.CartItem[]) => (dispatch:Dispatch) =>{
    dispatch({
        type:ShopTypes.SHOP_SET_CART,
        cart:cart
    })
}
export const increment = (id:number,count:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const cartItem = cart.find((i:Interfaces.CartItem) =>  i.id === id) as Interfaces.CartItem
    cartItem.quantity += count
    dispatch({
        type:ShopTypes.SHOP_INCREMENT,
        cart:cart
    })
}
export const decrement = (id:number,count:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const cartItem = cart.find((i:Interfaces.CartItem) =>  i.id === id) as Interfaces.CartItem
    if(cartItem.quantity > 1){
        cartItem.quantity -= count
    }
    dispatch({
        type:ShopTypes.SHOP_DECREMENT,
        cart:cart
    })
}
export const removeFromCart = (id:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const { products } = store.getState().api
    const tmpCart = cart.filter((i:Interfaces.CartItem) =>  i.id !== id) as Interfaces.CartItem[]
    const product = products.find((p:Interfaces.Product) => p.id === id) as Interfaces.Product
    product.inCart = false
    dispatch({
        type:ShopTypes.SHOP_REMOVE_FROM_CART,
        cart:tmpCart
    })
}
export const clearCart = () => (dispatch:Dispatch) =>{
    store.getState().api.products.forEach((p:Interfaces.Product) => p.inCart = false)
    dispatch({
        type:ShopTypes.SHOP_CLEAR_CART,
        cart:[]
    })
}
export const summary = () => (dispatch:Dispatch) =>{
    const { products } = store.getState().api
    const { cart } = store.getState().shop
    let summary = 0
    cart.map((c:Interfaces.CartItem)=>{
        const current = products.find((p:Interfaces.Product) => p.id == c.id) as Interfaces.Product
        if(current){
            summary += (c.quantity * current.price)
        }
    })
    dispatch({
        type:ShopTypes.SHOP_SUMMARY,
        summary:summary
    })
}