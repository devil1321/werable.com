import { APITypes } from "../types"
import * as Interfaces from '@/app/controller/interfaces'

interface TEST{
    type:APITypes.API_TEST,
    user:any;
    token:any;
    data:any;
}

interface GET_USER{
    type:APITypes.API_GET_USER,
    user:any,
    image:string;
}


interface SET_PRODUCTS{
    type:APITypes.API_SET_PRODUCTS,
    products:Interfaces.Product[]
}

interface SEARCH_PRODUCTS{
    type:APITypes.API_SEARCH_PRODUCTS,
    matches:Interfaces.Product[]
}
interface FILTER_PRODUCTS{
    type:APITypes.API_FILTER_PRODUCTS,
    products:Interfaces.Product[]
}

interface CHANGE_CURRENCY{
    type:APITypes.API_CHANGE_CURRENCY,
    currency:number;
    products:Interfaces.Product[]
}

interface LOGIN{
    type:APITypes.API_LOGIN,
    user:any;
    token:any;
    data:any;
}

interface LOGOUT{
    type:APITypes.API_LOGOUT
    token:any;
}

interface REGISTER {
    type:APITypes.API_REGISTER,
    user:any;
    token:string;
    data:any;
}


interface UPDATE_PROFILE {
    type:APITypes.API_UPDATE_PROFILE,
    data:any;
    image:string;
}
interface PAY {
    type:APITypes.API_PAY,
    paymentLink:string;
}

export type APIActions = GET_USER | TEST | SET_PRODUCTS | FILTER_PRODUCTS | SEARCH_PRODUCTS | CHANGE_CURRENCY | REGISTER | LOGIN | LOGOUT  | UPDATE_PROFILE | PAY