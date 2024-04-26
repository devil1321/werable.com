
import { UITypes } from "../types"

interface CHANGE_LANGUAGE{
    type:UITypes.UI_CHANGE_LANGUAGE,
    language:string;
}
interface CHANGE_CURRENCY{
    type:UITypes.UI_CHANGE_CURRENCY_STRING,
    currency:string;
}


export type UIActions = CHANGE_LANGUAGE | CHANGE_CURRENCY  | any
