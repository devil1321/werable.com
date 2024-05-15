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
    products:any[]
    product:any;
    matches:any[]
    token:any;
    paymentLink:string;
    categories:any[];
    category:any;
    sizes:any[];
    stores:any[];
    store:any;
    countries:any[];
    variants:any[];
    variant:any;
    locale:string;
    locales:any[];
    templates:any[];
    template:any;
    informationCost:any;
    packing:any;
    tax:any;
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
    locale:'en_US',
    locales:[],
    templates:[],
    template:null,
    informationCost:null,
    packing:null,
    tax:null
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
        case PrintfulTypes.PRINTFUL_SET_LOCALE:
            return{
                ...state,
                locale:action.locale
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
        case PrintfulTypes.PRINTFUL_GET_COUNTRIES:
            return{
                ...state,
                countries:action.countries
            }
        case PrintfulTypes.PRINTFUL_GET_ALL_SYNC_PRODUCTS:
            return{
                ...state,
                products:action.products
            }
        case PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCTS:
            return{
                ...state,
                products:action.products
            }
        case PrintfulTypes.PRINTFUL_CREATE_SYNC_PRODUCT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCT:
            return {
                ...state,
                product:action.product
            }
        case PrintfulTypes.PRINTFUL_DELETE_SYNC_PRODUCT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_MODIFY_SYNC_PRODUCT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_GET_SYNC_VARIANT:
            return {
                ...state,
                variant:action.variant
            }
        case PrintfulTypes.PRINTFUL_DELETE_SYNC_VARIANT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_MODIFY_SYNC_VARIANT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_CREATE_NEW_SYNC_VARIANT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_GET_PRODUCT_TEMPLATE_LIST:
            return {
                ...state,
                templates:action.templates
            }
        case PrintfulTypes.PRINTFUL_GET_PRODUCT_TEMPLATE:
            return {
                ...state,
                template:action.template
            }
        case PrintfulTypes.PRINTFUL_DELETE_PRODUCT_TEMPLATE:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_GET_LIST_OF_ORDERS:
            return {
                ...state,
                orders:action.orders
            }
        case PrintfulTypes.PRINTFUL_CREATE_NEW_ORDER:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_GET_ORDER_DATA:
            return {
                ...state,
                order:action.order
            }
        case PrintfulTypes.PRINTFUL_CANCEL_AN_ORDER:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_UPDATE_ORDER_DATA:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_CONFIRM_DRAFT_FOR_FULLFILMENT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_ESTIMATE_ORDER_COST:
            return {
                ...state,
                informationCost:action.informationCost
            }
        case PrintfulTypes.PRINTFUL_ADD_A_NEW_FILE:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_GET_FILE:
            return {
                ...state,
                file:action.file
            }
        case PrintfulTypes.PRINTFUL_AVAILABLE_THREDS_COLORS_FROM_IMAGE_URL:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_SHIPPING_RATE_API:
            return {
                ...state,
                shipping:action.shipping
            }
        case PrintfulTypes.PRINTFUL_GET_LIST_OF_SYNC_PRODUCTS_ECOMMERCE:
            return {
                ...state,
                products:action.products
            }
        case PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCT_ECOMMERCE:
            return {
                ...state,
                product:action.product
            }
        case PrintfulTypes.PRINTFUL_DELETE_SYNC_PRODUCT_ECOMMERCE:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_GET_SYNC_VARIANT_ECOMMERCE:
            return {
                ...state,
                variant:action.variant
            }
        case PrintfulTypes.PRINTFUL_MODIFY_SYNC_VARIANT_ECOMMERCE:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_DELETE_SYNC_VARIANT_ECOMMERCE:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_TAX_API:
            return {
                ...state,
                tax:action.tax
            }
        case PrintfulTypes.PRINTFUL_CALCULATE_TAX_RATE:
            return {
                ...state,
                tax:action.tax
            }
        case PrintfulTypes.PRINTFUL_DISABLE_WEBHOOK_SUPPORT:
            return {
                ...state,
                data:action.data
            }
        case PrintfulTypes.PRINTFUL_CHANGE_PACKING_SLIP:
            return {
                ...state,
                packing:action.packing
            }
        case PrintfulTypes.PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORE:
            return {
                ...state,
                store:action.store
            }
        case PrintfulTypes.PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORES:
            return {
                ...state,
                stores:action.stores
            }
        default:
            return {
                ...state
            }
        }
    }