'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'animate.css'
import Nav from "./components/global/nav.component";
import Footer from "./components/global/footer.component";
import store from "./controller/store";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ApiActions from '@/app/controller/action-creators/api.action-creators'

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <WithRedux>
            <Nav />
            {children}
            <Footer />
          </WithRedux>
        </div>
      </body>
    </html>
  );
}

const WithRedux:React.FC<{children:React.ReactNode}> = ({children}) =>{
  return <Provider store={store}>{children}</Provider>
}

const InitStateProvider:React.FC<{children:React.ReactNode}> = ({children}) =>{

  const dispatch = useDispatch()
  const APIActions = bindActionCreators(ApiActions,dispatch)

  useEffect(()=>{
    APIActions.printfulGetSyncProducts(1,'all')
  },[])

  return children
}