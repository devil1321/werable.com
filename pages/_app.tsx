import App from 'next/app';
import React, { useEffect } from 'react';
import store  from '@/app/controller/store'
import { Provider, useSelector } from 'react-redux';
import "../app/globals.css";
import 'animate.css'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import * as ShopActions from '@/app/controller/action-creators/shop.action-creators'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '@/app/controller/reducers/root.reducer';
import { AppProps } from 'next/app';
import { startTransition } from 'react';
const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider store={store}>
      <WithRedux>
        <Component {...pageProps}/>
        <SpeedInsights />
        <Analytics />
      </WithRedux>
    </Provider>
  );
};

export default MyApp

  

const WithRedux:React.FC<{ children:React.ReactNode }> = ({children}) =>{

  const { locale } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const shopActions = bindActionCreators(ShopActions,dispatch)
  


  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const language = localStorage.getItem('wearable-locale')
      if(language){
        startTransition(()=>{
          APIActions.printfulSetLocale(language)
        })
      }
    }
  },[locale])

  useEffect(()=>{
    shopActions.setFavoruites()
    startTransition(()=>{
      APIActions.printfulGetCategories()
    })
    if(typeof window !== undefined){
      const storage = localStorage.getItem('wearable-products')
      const parsed = JSON.parse(storage as string)
      APIActions.printfulSetAllSyncProducts(parsed)
    }
  },[])

  return <>{children}</>
}

