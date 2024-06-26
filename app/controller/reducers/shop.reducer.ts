import { ShopTypes } from "../types"
import { ShopActions } from "../actions/shop.actions"
import * as Interfaces from "../interfaces"

interface InitState {
    cart:any[];
    summary:number;
    favoruites:any[];
}

const initState:InitState = {
    cart:[],
    summary:0,
    favoruites:[]
}

export default (state:InitState = initState,action:ShopActions) =>{
    switch(action.type){
        case ShopTypes.SHOP_SET_CART:
            return{
                ...state,
                cart:action.cart
            }
        case ShopTypes.SHOP_ADD_TO_CART:
            return{
                ...state,
                cart:action.cart
            }
        case ShopTypes.SHOP_INCREMENT:
            return{
                ...state,
                cart:action.cart
            }
        case ShopTypes.SHOP_DECREMENT:
            return{
                ...state,
                cart:action.cart
            }
        case ShopTypes.SHOP_REMOVE_FROM_CART:
            return{
                ...state,
                cart:action.cart
            }
        case ShopTypes.SHOP_CLEAR_CART:
            return{
                ...state,
                cart:action.cart
            }
        case ShopTypes.SHOP_SET_FAVORUITES:
            return{
                ...state,
                favoruites:action.favoruites
            }
        case ShopTypes.SHOP_ADD_FAVORUITE:
            return{
                ...state,
                favoruites:action.favoruites
            }
        case ShopTypes.SHOP_REMOVE_FAVORUITE:
            return{
                ...state,
                favoruites:action.favoruites
            }
        case ShopTypes.SHOP_SUMMARY:
            return{
                ...state,
                summary:action.summary
            }
       
        default:
            return {
                ...state
            }
        }
    }