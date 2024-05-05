import React from 'react';
import store from '@/app/controller/store'
import { Provider } from 'react-redux';
import "../app/globals.css";
import 'animate.css'
import Nav from '@/app/components/global/nav.component';
import Footer from '@/app/components/global/footer.component';
import Foot from '@/app/components/global/foot.component';

function MyApp({ Component, pageProps }:{Component:any,pageProps:any}) {
  return (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  );
}

export default MyApp;