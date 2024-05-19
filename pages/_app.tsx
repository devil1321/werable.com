import React, { useEffect } from 'react';
import store  from '@/app/controller/store'
import { Provider, useSelector } from 'react-redux';
import "../app/globals.css";
import 'animate.css'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '@/app/controller/reducers/root.reducer';
import { AppProps } from 'next/app';
import Layout from './layout';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider store={store}>
      <WithRedux>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WithRedux>
    </Provider>
  );
};

export default MyApp

const WithRedux:React.FC<{ children:React.ReactNode }> = ({children}) =>{

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)
  const { cart } = useSelector((state:State) => state.shop) 


  useEffect(()=>{
    APIActions.printfulGetCategories()
    APIActions.printfulGetAllSyncProducts(0,100)
  },[])

  useEffect(()=>{
    console.log(cart)
  },[cart])

  return <>{children}</>
}