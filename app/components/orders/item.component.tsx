import { State } from '@/app/controller/reducers/root.reducer'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { bindActionCreators } from 'redux'
import Link from 'next/link'

const Item:React.FC<{ order:any }> = ({order}) => {

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const { tab } = useSelector((state:State) => state.ui)
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const itemRef = useRef() as MutableRefObject<HTMLDivElement>

  
  const handleInitTabs = () =>{
    if(typeof window !== 'undefined'){
        if(typeof document !== 'undefined'){
            const tabs = itemRef.current.querySelectorAll('.orders-tab') as NodeListOf<HTMLDivElement>
            tabs.forEach((t:HTMLDivElement) => t.style.display = 'none')
            if(tabs[tab]){
                tabs[tab].style.display = 'block'
            }
        }
    }
  }


  const handleTab = () =>{
    if(typeof window !== 'undefined'){
        if(typeof document !== 'undefined'){
            const tabs = document.querySelectorAll('.orders-tab') as NodeListOf<HTMLDivElement>
            tabs.forEach((t:HTMLDivElement) => t.style.display = 'none')
            if(tabs[tab]){
                tabs[tab].style.display = 'block'
            }
        }
    }
  }

  useEffect(()=>{
    handleInitTabs()
  },[itemRef.current,isOpen])

  useEffect(()=>{
    handleTab()
  },[tab])

  return (
    <div onClick={()=>setIsOpen(!isOpen)} ref={itemRef} className="orders-item-wrapper mx-2  md:mx-12 my-6 bg-blue-300 hover:bg-blue-500 transition-all cursor-pointer  rounded-md  overflow-hidden px-2 md:px-12">
        <div className="orders-item-nav flex justify-between items-center flex-wrap">
            <h3 className="font-bold text-2xl text-white">{order?.external_id}</h3>
            <h3 className="font-bold text-white mt-5 md:mt-0">Status: <span className='ml-2 rounded-md bg-orange-300 p-2 text-md font-bold text-white'>{order?.status}</span></h3>
            <button onClick={()=>APIActions.printfulCancelAnOrder(order?.id)} className='orders-cancel-btn font-bold text-white w-max rounded-md px-3 py-2 my-5'>Cancel An Order</button>
        </div>
        {isOpen && 
            <div className='orders-item my-6 w-[100%] overflow-hidden flex justify-start items-start'>
                <div className='orders-tab bg-blue-400 md:p-5 rounded-md orders-shipping-tab w-[100%]'>
                    <div className="orders-shipping-tab-header flex flex-wrap justify-between items-center">
                        <h3 className='text-md font-bold text-white my-6 '>Shipping <span className='ml-2 bg-orange-300 font-bold text-white text-md p-2 rounded-md'>{order?.shipping}</span></h3>
                        <h3 className='text-md font-bold text-white my-6 '>Shipping Service Name <span className='block md:flex md:ml-2 bg-orange-300 font-bold text-white text-md p-2 rounded-md'>{order?.shipping_service_name}</span></h3>
                    </div>
                    <div className="orders-shipping-tab-body">
                        <h3 className="font-bold text-white text-md underline">Shipments</h3>
                        {order?.shipments?.map((s:any)=>
                        <div className='my-5'>
                            <p className="text-sm font-bold text-white mt-5">ID: <span className='p-2 rounded-md font-bold bg-orange-300'>{s.id}</span></p>
                            <p className="text-sm font-bold text-white my-5">Carrier: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{s.carrier}</span></p>
                            <p className="text-sm font-bold text-white my-5">Service: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{s.service}</span></p>
                            <p className="text-sm font-bold text-white my-5">Tracking Number: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{s.tracking_number}</span></p>
                            <p className="text-sm font-bold text-white my-5">Ship Date: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{s.ship_date}</span></p>
                            <Link className="underline text-white" href={s.tracking_url}><p className="text-sm font-bold text-white my-5">Track Your Shipment: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>URL</span></p></Link> 
                        </div>
                        )}
                    </div>
                </div>
                <div className='orders-tab bg-blue-400 p-5 rounded-md orders-recipient-tab w-[100%]'>
                    <h3 className="font-bold text-white text-md underline">Recipient</h3>
                    <p className="text-sm font-bold text-white mt-5">Name: <span className='p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.name}</span></p>
                    <p className="text-sm font-bold text-white my-5">Company: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.company}</span></p>
                    <p className="text-sm font-bold text-white my-5">Address 1: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.address1}</span></p>
                    <p className="text-sm font-bold text-white my-5">Address 2: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.address2}</span></p>
                    <p className="text-sm font-bold text-white my-5">City: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.city}</span></p>
                    <p className="text-sm font-bold text-white my-5">State Code: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.state_code}</span></p>
                    <p className="text-sm font-bold text-white my-5">State Name: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.state_name}</span></p>
                    <p className="text-sm font-bold text-white my-5">Country Code: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.country_code}</span></p>
                    <p className="text-sm font-bold text-white my-5">Country Name: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.country_name}</span></p>
                    <p className="text-sm font-bold text-white my-5">Zip: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.zip}</span></p>
                    <p className="text-sm font-bold text-white my-5">Phone: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.phone}</span></p>
                    <p className="text-sm font-bold text-white my-5">Email: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.email}</span></p>
                    <p className="text-sm font-bold text-white my-5">Tax Number: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.recipient?.tax_number}</span></p>
                </div>
                <div className='orders-tab bg-blue-400 p-5 rounded-md orders-items-tab w-[100%]'>
                <h3 className="font-bold text-white text-md underline">Products</h3>
                {order?.items.map((i:any)=>
                    <div className="orders-product-item p-2 rounded-md bg-violet-500 my-3">
                        <p className="text-sm font-bold text-white my-5">Name: <span className='block md:flex md:ml-2 p-2 rounded-md font-bold bg-orange-300'>{i.name}</span></p>
                        <p className="text-sm font-bold text-white my-5">Quantity: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{i.quantity}</span></p>
                        <p className="text-sm font-bold text-white my-5">Retail Price: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{i.retail_price}</span></p>
                        <p className="text-sm font-bold text-white my-5">Out Of Stock: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{i.out_of_stock ? "true" : "false"}</span></p>
                    </div>
                )}
                </div>
                <div className='orders-tab bg-blue-400 p-5 rounded-md orders-incomplete-items-tab w-[100%]'>
                    <h3 className="font-bold text-white text-md underline">Incomplete Items</h3>
                    {order?.incomplete_items.map((i:any)=>
                    <div className="orders-product-item p-2 rounded-md bg-violet-500 my-3">
                        <p className="text-sm font-bold text-white my-5">Name: <span className='block md:flex md:ml-2 p-2 rounded-md font-bold bg-orange-300'>{i.name}</span></p>
                        <p className="text-sm font-bold text-white my-5">Quantity: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{i.quantity}</span></p>
                    </div>
                    )}
                </div>
                <div className='orders-tab bg-blue-400 p-5 rounded-md orders-costs-tab w-[100%]'>
                    <h3 className="font-bold text-white text-md underline">Costs</h3>
                    <p className="text-sm font-bold text-white my-5">Currency: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.currency}</span></p>
                    <p className="text-sm font-bold text-white my-5">Subtotal: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.subtotal}</span></p>
                    <p className="text-sm font-bold text-white my-5">Discount: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.discount}</span></p>
                    <p className="text-sm font-bold text-white my-5">Shipping: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.shipping}</span></p>
                    <p className="text-sm font-bold text-white my-5">Digitization: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.digitization}</span></p>
                    <p className="text-sm font-bold text-white my-5">Additional fee: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.additional_fee}</span></p>
                    <p className="text-sm font-bold text-white my-5">Fulfillment fee: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.fulfillment_fee}</span></p>
                    <p className="text-sm font-bold text-white my-5">Retail delivery fee: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.retail_delivery_fee}</span></p>
                    <p className="text-sm font-bold text-white my-5">Tax:  <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.tax}</span></p>
                    <p className="text-sm font-bold text-white my-5">Vat:  <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.vat}</span></p>
                    <p className="text-sm font-bold text-white my-5">Total: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.costs?.total}</span></p>
                </div>
                <div className='orders-tab bg-blue-400 p-5 rounded-md orders-packing-slip-tab w-[100%]'>
                    <h3 className="font-bold text-white text-md underline">Packing Slip</h3>
                    <p className="text-sm font-bold text-white my-5">Email: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.packing_slip?.email}</span></p>
                    <p className="text-sm font-bold text-white my-5">Phone: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.packing_slip?.phone}</span></p>
                    <p className="text-sm font-bold text-white my-5">Store Name: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.packing_slip?.store_name}</span></p>
                    <p className="text-sm font-bold text-white my-5">Custom Order ID: <span className='ml-2 p-2 rounded-md font-bold bg-orange-300'>{order?.packing_slip?.customer_order_id}</span></p>
                </div>
            </div>}
    </div> 
  )
}

export default Item
