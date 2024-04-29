import React from 'react';
// import store from '@/app/controller/store'
// import { Provider } from 'react-redux';
import "../app/globals.css";
import 'animate.css'

function MyApp({ Component, pageProps }:{Component:any,pageProps:any}) {
  return (
    // <Provider store={store}>
      <Component {...pageProps} />
    // </Provider>
  );
}

export default MyApp;