import store from "@/app/controller/store"
import  printful  from "@/app/controller/lib/printful"
import axios from "axios"
/*---------------------PRINTFUL API-----------------------*/

export const printfulAuth = async() =>{
    try{
        const res = await axios.get(`https://www.printful.com/oauth/authorize?client_id=${process.env.PRINTFUL_CLIENT_ID}&redirect_url=https://localhost:3000/api/printful/auth-redirect`)
        const data = res.data
        return data
    }
    catch(err){
        console.log(err)
        return err
    }
}
export const printfulAuthRedirect = async(code:string) =>{
    try{
        const res = await axios.post(`https://www.printful.com/oauth/token?grant_type=authorization_code&client_id=${process.env.PRINTFUL_CLIENT_ID}&client_secret=${process.env.PRINTFUL_SECRET}&code=${code}`)
        const data = res.data
        return data
    }
    catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetProducts = async(locale:string,category_id:string) => {
    try{
        const res = await printful.get('/products',{
            headers:{
                'X-PF-Language':locale
            },
            params:{
                category_id:category_id
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }

}

export const printfulGetVariant = async(locale:string,id:number) => {
    try{
        const res = await printful.get(`/products/variant/${id}`,{
            headers:{
                'X-PF-Language':locale
            }
        })
        const data = res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetProduct = async(locale:string,id:number) =>{
    try{
        const res = await printful.get(`/products/${id}`,{
            headers:{
                'X-PF-Language':locale
            }
        })
        const data = res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetSizes = async(id:number,unit:string) => {
    try{
        const res = await printful.get(`/products/${id}/sizes`,{
            params:{
                unit:unit
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }

}

export const printfulGetCategories = async(locale:string,) =>{
    try{
        const res = await printful.get('/categories',{
            headers:{
                'X-PF-Language':locale
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetCategory = async(locale:string,id:number) =>{
    try{
        const res = await printful.get(`/categories/${id}`,{
            headers:{
                'X-PF-Language':locale
            }
        })
        const data = await res.data
        return data 
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetSyncProducts = async(locale:string,category_id:string,status:string) =>{
    try {
        const res = await printful.get('/store/products',{
            params:{
                category_id:category_id,
                status:status
            },
            headers:{
                "X-PF-Language":locale,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulCreateSyncProduct = async(sync_product:any,sync_variants:any) =>{
    try{
        const res = await printful.post('/store/products',{
            sync_product:sync_product,
            sync_variants:sync_variants
        },{
            headers:{
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetSyncProduct  = async(locale:string,id:number) => {
    try{
       const res = await printful.get('/store/products',{
            params:{
                id:id
            },
            headers:{
                "X-PF-Language":locale,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
       })
       const data = await res.data
       return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulDeleteSyncProduct = async(id:number) => {
    try{
        const res = await printful.post('/store/products',{ id:id },{
            headers:{
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}


export const printfulModifySyncProduct = async(id:number,sync_product:any,sync_variants:any) => {
    try{
        const res = await printful.put(`/store/products/${id}`,{ 
            sync_product:sync_product,
            sync_variants:sync_variants
         },{
            headers:{
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetSyncVariant = async(locale:string,id:number) => {
    try{
        const res = await printful.get(`/store/variants/${id}`,{
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}


export const printfulDeleteSyncVariant = async(id:number) => {
    try{
        const res = await printful.delete(`/store/variants/${id}`,{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulModifySyncVariant = async(id:number,query:any) =>{
    try{
        const res = await printful.put(`/store/variants/${id}`,{
            ...query
        },{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulCreateNewSyncVariant = async(id:number,variant_body:any) => {
    try{
        const res = await printful.post(`/store/products/${id}/variants`,{
            params:{
                ...variant_body
            },
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetProductsTemplateList = async(locale:string,offset:number,limit:number) =>{
    try{
        const res = await printful.get('/product-templates',{
            params:{
                offset:offset,
                limit:limit
            },
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
            }
        })
        const data = res.data
        return data

    }catch(err){
        console.log(err)
        return err
    }

}

export const printfulGetProductTemplate = async(locale:string,id:number) => {
    try{
        const res = await printful.get(`/product-templates/${id}`,{
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
            }
        })
        const data = res.data
        return data

    }catch(err){
        console.log(err)
        return err
    }

}

export const printfulDeleteProductTemplate = async(id:number) => {
    try{
        const res = await printful.post(`product-templates/${id}`,{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
            }
        })
        const data = res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }

}
export const printfulGetListOfOrders = async(locale:string,offset:number,limit:number,status:string) =>{
    try{
        const res = await printful.get('/orders',{
            params:{
                offset:offset,
                limit:limit,
                status:status
            },
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulCreateNewOrder = async(confirm:boolean,update_existing:boolean,query:any) => {
    try{
        const res = await printful.post('/orders',{
                ...query
            },{
            params:{
                confirm:confirm,
                update_existing:update_existing,
            },
            headers:{
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const printfulGetOrderData = async(locale:string,id:number) => {
    try{
        const res = await printful.get(`/orders/${id}`,{
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulCancelAnOrder = async(id:number) => {
    try{
        const res = await printful.delete(`/orders/${id}`,{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulUpdateOrderData = async(id:number,confirm:boolean,query:any) => {
    try{
        const res = await printful.put(`/orders/${id}`,{...query},{
            params:{
                confirm:confirm
            },
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulConfirmDraftForFulfillment = async(id:number) => {
    try{
        const res = await printful.put(`/orders/${id}/confirm`,{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulEstimateOrderCost = async(order_data:any) => {
    try{
        const res = await printful.post(`/orders/estimate-cost`,{
            ...order_data
        },{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulAddANewFile = async(query:any) =>{
    try{
        const res = await printful.post('/files',{
                ...query
            },{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetFile = async(id:number) => {
    try{
        const res = await printful.get('/file',{
            params:{
                id:id
            },
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulReturnAvailableColorsFromImageUrl = async(file_url:string) => {
    try{
        const res = await printful.post('/files/thread-colors',{
            params:{
                file_url:file_url
            },
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulShippingRateAPI = async(query:any) => {
    try{
        const res = await printful.post('/shipping/rates',{
                ...query
            },{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetListOfSyncProductsEcommerce = async(locale:string,query:any) => {
    try{
        const res = await printful.get('/sync/products',{
            params:{
                ...query
            },
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetListOfSyncProductEcommerce = async(locale:string,id:number) => {
    try{
        const res = await printful.get('/sync/products',{
            params:{
                id:id
            },
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulDeleteListOfSyncProductEcommerce = async(id:number) => {
    try{
        const res = await printful.delete(`/sync/products/${id}`,{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetSyncVariantEcommerce = async(locale:string,id:number) => {
    try{
        const res = await printful.get(`/sync/variant/${id}`,{
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulModifySyncVariantEcommerce = async(id:number,query:any) => {
    try{
        const res = await printful.put(`/sync/variant/${id}`,{
                ...query
            },{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulDeleteSyncVariantEcommerce = async(id:number) => {
    try{
        const res = await printful.delete(`/sync/variant/${id}`,{
            headers:{
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetCountries = async(locale:string,) => {
    try{
        const res = await printful.get('/countries',{
            headers:{
                'X-PF-Language':locale
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulTaxRate = async(locale:string,) => {
    try{
        const res = await printful.get('/tax/countries',{
            headers:{
                'X-PF-Language':locale
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulCalculateTaxRate = async(locale:string,recipient:any) => {
    try{
        const res = await printful.post('/tax/rates',recipient,{
            headers:{
                'X-PF-Language':locale
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulDisableWebhookSupport = async() => {
    try{
        const res = await printful.delete('/webhooks')
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulStoreInformationAPI = async(locale:string,query:any) => {
    try{
        const res = await printful.post('/store/packing-slip',{...query},{
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`,
                'X-PF-Store-Id':process.env.PRINTFUL_DOMINIK_STORE_ID
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetBasicInformationAboutStores = async(locale:string,) => {
    try{
        const res = await printful.get('/stores',{
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}
export const printfulGetBasicInformationAboutStore = async(locale:string,id:number) => {
    try{
        const res = await printful.get('/stores',{
            params:{
                id:id
            },
            headers:{
                "X-PF-Language":locale,
                'Authorization':`Bearer ${process.env.PRINTFUL_TOKEN}`
            }
        })
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return err
    }
}