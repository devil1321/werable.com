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
    PRINTFUL_SET_LOCALE = 'PRINTFUL_SET_LOCALE',
    PRINTFUL_AUTH = "PRINTFUL_AUTH",
    PRINTFUL_AUTH_REDIRECT = 'PRINTFUL_AUTH_REDIRECT',
    PRINTFUL_GET_ALL_SYNC_PRODUCTS = 'PRINTFUL_GET_ALL_SYNC_PRODUCTS',
    PRINTFUL_GET_PRODUCTS = "PRINTFUL_GET_PRODUCTS",
    PRINTFUL_GET_PRODUCT = "PRINTFUL_GET_PRODUCT",
    PRINTFUL_GET_VARIANT = 'PRINTFUL_GET_VARIANT',
    PRINTFUL_GET_SIZES = 'PRINTFUL_GET_SIZES',
    PRINTFUL_GET_CATEGORIES = 'PRINTFUL_GET_CATEGORIES',
    PRINTFUL_GET_CATEGORY = 'PRINTFUL_GET_CATEGORY',
    PRINTFUL_GET_SYNC_PRODUCTS = 'PRINTFUL_GET_SYNC_PRODUCTS',
    PRINTFUL_CREATE_SYNC_PRODUCT = 'PRINTFUL_CREATE_SYNC_PRODUCT',
    PRINTFUL_GET_SYNC_PRODUCT = 'PRINTFUL_GET_SYNC_PRODUCT',
    PRINTFUL_DELETE_SYNC_PRODUCT = 'PRINTFUL_DELETE_SYNC_PRODUCT',
    PRINTFUL_MODIFY_SYNC_PRODUCT = 'PRINTFUL_MODIFY_SYNC_PRODUCT',
    PRINTFUL_GET_SYNC_VARIANT = "PRINTFUL_GET_SYNC_VARIANT",
    PRINTFUL_DELETE_SYNC_VARIANT = 'PRINTFUL_DELETE_SYNC_VARIANT',
    PRINTFUL_MODIFY_SYNC_VARIANT = 'PRINTFUL_MODIFY_SYNC_VARIANT',
    PRINTFUL_CREATE_NEW_SYNC_VARIANT = 'PRINTFUL_CREATE_NEW_SYNC_VARIANT',
    PRINTFUL_GET_PRODUCT_TEMPLATES = 'PRINTFUL_GET_PRODUCT_TEMPLATES',
    PRINTFUL_GET_PRODUCT_TEMPLATE_LIST = 'PRINTFUL_GET_PRODUCT_TEMPLATE_LIST',
    PRINTFUL_GET_PRODUCT_TEMPLATE = 'PRINTFUL_GET_PRODUCT_TEMPLATE',
    PRINTFUL_DELETE_PRODUCT_TEMPLATE = 'PRINTFUL_DELETE_PRODUCT_TEMPLATE',
    PRINTFUL_GET_LIST_OF_ORDERS = 'PRINTFUL_GET_LIST_OF_ORDERS',
    PRINTFUL_CREATE_NEW_ORDER = 'PRINTFUL_CREATE_NEW_ORDER',
    PRINTFUL_GET_ORDER_DATA = 'PRINTFUL_GET_ORDER_DATA',
    PRINTFUL_CANCEL_AN_ORDER = 'PRINTFUL_CANCEL_AN_ORDER',
    PRINTFUL_UPDATE_ORDER_DATA = 'PRINTFUL_UPDATE_ORDER_DATA',
    PRINTFUL_CONFIRM_DRAFT_FOR_FULLFILMENT = 'PRINTFUL_CONFIRM_DRAFT_FOR_FULLFILMENT',
    PRINTFUL_ESTIMATE_ORDER_COST = 'PRINTFUL_ESTIMATE_ORDER_COST',
    PRINTFUL_ADD_A_NEW_FILE = 'PRINTFUL_ADD_A_NEW_FILE',
    PRINTFUL_GET_FILE = 'PRINTFUL_GET_FILE',
    PRINTFUL_AVAILABLE_THREDS_COLORS_FROM_IMAGE_URL = 'PRINTFUL_AVAILABLE_THREDS_COLORS_FROM_IMAGE_URL',
    PRINTFUL_SHIPPING_RATE_API = 'PRINTFUL_SHIPPING_RATE_API',
    PRINTFUL_GET_LIST_OF_SYNC_PRODUCTS_ECOMMERCE = 'PRINTFUL_GET_LIST_OF_SYNC_PRODUCTS',
    PRINTFUL_GET_SYNC_PRODUCT_ECOMMERCE = 'PRINTFUL_GET_SYNC_PRODUCT_ECOMMERCE',
    PRINTFUL_DELETE_SYNC_PRODUCT_ECOMMERCE = 'PRINTFUL_DELETE_SYNC_PRODUCT_ECOMMERCE',
    PRINTFUL_GET_SYNC_VARIANT_ECOMMERCE = 'PRINTFUL_GET_SYNC_VARIANT_ECOMMERCE',
    PRINTFUL_MODIFY_SYNC_VARIANT_ECOMMERCE = 'PRINTFUL_MODIFY_SYNC_VARIANT_ECOMMERCE',
    PRINTFUL_DELETE_SYNC_VARIANT_ECOMMERCE = 'PRINTFUL_DELETE_SYNC_VARIANT_ECOMMERCE',
    PRINTFUL_GET_COUNTRIES = 'PRINTFUL_GET_COUNTRIES',
    PRINTFUL_COUNTRY_OR_STATE_CODE = 'PRINTFUL_COUNTRY_OR_STATE_CODE',
    PRINTFUL_TAX_API = 'PRINTFUL_TAX_API',
    PRINTFUL_CALCULATE_TAX_RATE = 'PRINTFUL_CALCULATE_TAX_RATE',
    PRINTFUL_GET_WEBHOOK_CONFIGURATION = 'PRINTFUL_GET_WEBHOOK_CONFIGURATION',
    PRINTFUL_SETUP_WEBHOOK_CONFIGURATION = 'PRINTFUL_SETUP_WEBHOOK_CONFIGURATION',
    PRINTFUL_DISABLE_WEBHOOK_SUPPORT = 'PRINTFUL_DISABLE_WEBHOOK_SUPPORT',
    PRINTFUL_CHANGE_PACKING_SLIP = 'PRINTFUL_CHANGE_PACKING_SLIP',
    PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORES = 'PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORES',
    PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORE = 'PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORE',
    PRINTFUL_CREATE_MOCKUP_GENERATION_TASK = 'PRINTFUL_CREATE_MOCKUP_GENERATION_TASK',
    PRINTFUL_RETRIVE_PRODUCT_VARIANT_PRINTFILES = 'PRINTFUL_RETRIVE_PRODUCT_VARIANT_PRINTFILES',
    PRINTFUL_MOCKUP_GENERATION_TASK_RESULT = 'PRINTFUL_MOCKUP_GENERATION_TASK_RESULT',
    PRINTFUL_LAYOUT_TEMPLATES = 'PRINTFUL_LAYOUT_TEMPLATES',
    PRINTFUL_WAREHOUSE_PRODUCTS_API = 'PRINTFUL_WAREHOUSE_PRODUCTS_API',
    PRINTFUL_GET_WAREHOUSE_PRODUCT_DATA = 'PRINTFUL_GET_WAREHOUSE_PRODUCT_DATA',
    PRINTFUL_REPORTS_API = 'PRINTFUL_REPORTS_API',
    PRINTFUL_APPROVAL_SHEETS_API = 'PRINTFUL_APPROVAL_SHEETS_API',
    PRINTFUL_APPROVE_DESIGN = 'PRINTFUL_APPROVE_DESIGN',
    PRINTFUL_SUBMIT_CHANGES_TO_APPROVAL_SHEET = 'PRINTFUL_SUBMIT_CHANGES_TO_APPROVAL_SHEET',

}