import { APITypes, PrintfulTypes } from "../types";
import { APIActions } from "../actions/api.actions";
import * as Interfaces from '@/app/controller/interfaces'

interface InitState {
    oAuthToken:any;
    storeHeader:any;
    refreshToken:any;
    html:any;
    data:any;
    user:any;
    products:Interfaces.Product[]
    matches:Interfaces.Product[]
    token:any;
    paymentLink:string;
    product:any;
    categories:any[];
    category:any;
    sizes:any[];
    stores:any[];
    store:any;
    countries:any[];
    variants:any[];
    variant:any;
}

const initState:InitState = {
    html:undefined,
    oAuthToken:process.env.PRINTFUL_TOKEN,
    storeHeader:null,
    refreshToken:null,
    data:null,
    matches:[],
    token:null,
    user:null,
    paymentLink:'',
    products:[],
    product:null,
    variants:[],
    variant:null,
    categories:[],
    category:null,
    sizes:[],
    store:null,
    stores:[],
    countries:[],
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
        case PrintfulTypes.PRINTFUL_AUTH:
            return{
                ...state,
                html:action.html
            }
        case PrintfulTypes.PRINTFUL_AUTH_REDIRECT:
            return{
                ...state,
                storeHeader:action.storeHeader,
                oAuthToken:action.accessToken,
                refreshToken:action.refreshToken
            }
        case PrintfulTypes.PRINTFUL_GET_PRODUCTS:
            return{
                ...state,
                products:action.products
            }
        case PrintfulTypes.PRINTFUL_GET_VARIANT:
            return{
                ...state,
                variant:action.variant
            }
        case PrintfulTypes.PRINTFUL_GET_PRODUCT:
            return{
                ...state,
                product:action.product
            }
        case PrintfulTypes.PRINTFUL_GET_SIZES:
            return{
                ...state,
                sizes:action.sizes
            }
        case PrintfulTypes.PRINTFUL_GET_CATEGORIES:
            return{
                ...state,
                categories:action.categories
            }
        case PrintfulTypes.PRINTFUL_GET_CATEGORY:
            return{
                ...state,
                category:action.category
            }
        default:
            return {
                ...state
            }
        }
    }