export interface User{
    id:number;
    nickname:string;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    city:string;
    zip:string;
    phone:string;
}

export interface Product{
    id:number;
    img:string;
    event:string | null;
    title:string;
    colors:any[];
    price:number;
    prevPrice:number;
    company:string;
    rating:number;
    inCart:boolean;
}

export interface CartItem{
    id:number;
    quantity:number;
    price:number;
    color:any
}