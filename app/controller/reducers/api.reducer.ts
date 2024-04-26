import { APITypes } from "../types";
import { APIActions } from "../actions/api.actions";
import * as Interfaces from '@/app/controller/interfaces'

interface InitState {
    data:any;
    user:any;
    products:Interfaces.Product[]
    matches:Interfaces.Product[]
    token:any;
    image:string;
    paymentLink:string;
}

const initState:InitState = {
    data:null,
    products:[],
    matches:[],
    token:null,
    user:null,
    image:'',
    paymentLink:''
}

export default (state:InitState = initState,action:APIActions) =>{
    switch(action.type){
        case APITypes.API_CHANGE_CURRENCY:
            return{
                ...state,
                products:action.products,
                currency:action.currency
            }
        case APITypes.API_SET_PRODUCTS:
            return{
                ...state,
                products:action.products
            }
        case APITypes.API_REGISTER:
            return{
                ...state,
                user:action.user,
                token:action.token,
                data:action.data,
            }
        case APITypes.API_LOGIN:
            return{
                ...state,
                user:action.user,
                token:action.token,
                data:action.data,
            }
        case APITypes.API_TEST:
            return{
                ...state,
                user:action.user,
                token:action.token,
                data:action.data,
            }
        case APITypes.API_LOGIN:
            return{
                ...state,
                user:action.user,
                token:action.token,
                data:action.data,
            }
        case APITypes.API_LOGOUT:
            return{
                ...state,
                token:action.token,
            }
        case APITypes.API_GET_USER:
            return{
                ...state,
                user:action.user,
                image:action.image
            }
        case APITypes.API_PAY:
            return{
                ...state,
                paymentLink:action.paymentLink
            }
        case APITypes.API_FILTER_PRODUCTS:
                return{
                    ...state,
                    products:action.products    
                }
        case APITypes.API_SEARCH_PRODUCTS:
                return{
                    ...state,
                    matches:action.matches    
                }
        case APITypes.API_UPDATE_PROFILE:
            return{
                ...state,
                data:action.data,
                image:action.image
            }
        default:
            return {
                ...state
            }
        }
    }