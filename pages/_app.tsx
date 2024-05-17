import React, { useEffect } from 'react';
import store from '@/app/controller/store'
import { Provider } from 'react-redux';
import "../app/globals.css";
import 'animate.css'
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

function MyApp({ Component, pageProps }:{Component:any,pageProps:any}) {
  return (
  <Provider store={store}>
    <WithRedux>
      <Component {...pageProps} />
    </WithRedux>
  </Provider>
  );
}

export default MyApp;

const WithRedux:React.FC<{ children:React.ReactNode }> = ({children}) =>{

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)


  useEffect(()=>{
    APIActions.printfulGetCategories()
    APIActions.printfulGetAllSyncProducts(0,100)
  },[])

  return children
}