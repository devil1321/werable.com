export enum UITypes {
    SET_CAROUSEL_COUNT = 'SET_CAROUSEL_COUNT',
    UI_CHANGE_LANGUAGE = 'UI_CHANGE_LANGUAGE',
    UI_CHANGE_CURRENCY_STRING = 'UI_CHANGE_CURRENCY_STRING',
}

export enum ShopTypes {
    SHOP_SET_CART = 'SHOP_SET_CART',
    SHOP_ADD_TO_CART = 'SHOP_ADD_TO_CART',
    SHOP_REMOVE_FROM_CART = 'SHOP_REMOVE_FROM_CART',
    SHOP_CLEAR_CART = 'SHOP_CLEAR_CART',
    SHOP_INCREMENT = "SHOP_INCREMENT",
    SHOP_DECREMENT = 'SHOP_DECREMENT',
    SHOP_SUMMARY = 'SHOP_SUMMARY',
}

export enum APITypes {
    API_TEST = 'API_TEST',
    API_GET_USER = 'API_GET_USER',
    API_LOGIN = 'API_LOGIN',
    API_LOGOUT = 'API_LOGOUT',
    API_REGISTER = 'API_REGISTER',
    API_UPDATE_PROFILE = 'API_UPDATE_PROFILE',
    API_PAY = 'API_PAY',
    API_SET_PRODUCTS = 'API_SET_PRODUCTS',
    API_FILTER_PRODUCTS = 'API_FILTER_PRODUCTS',
    API_CHANGE_CURRENCY = 'API_CHANGE_CURRENCY',
    API_SEARCH_PRODUCTS = 'API_SEARCH_PRODUCTS'
}

export enum PrintfulTypes {
    PRINTFUL_GET_PRODUCTS = "PRINTFUL_GET_PRODUCTS",
    PRINTFUL_GET_VARIANT = 'PRINTFUL_GET_VARIANT',
    PRINTFUL_GET_SIZES = 'PRINTFUL_GET_SIZES',
    PRINTFUL_GET_CATEGORIES = 'PRINTFUL_GET_CATEGORIES',
    PRINTFUL_GET_CATEGORY = 'PRINTFUL_GET_CATEGORY',
    PRINTFUL_GET_SYNC_PRODUCTS = 'PRINTFUL_GET_SYNC_PRODUCTS',
    PRINTFUL_CREATE_SYNC_PRODUCT = 'PRINTFUL_CREATE_SYNC_PRODUCT',
    PRINTFUL_GET_SYNC_PRODUCT = 'PRINTFUL_GET_SYNC_PRODUCT',
    PRINTFUL_DELETE_SYNC_PRODUCT = 'PRINTFUL_DELETE_SYNC_PRODUCT',
    PRINTFUL_MODIFY_SYNC_PRODUCT = 'PRINTFUL_MODIFY_SYNC_PRODUCT'
}