import React,{Fragment} from 'react';
import Head from 'next/head';
import Header from './Header';

//contenedor padre de otros componentes 
//al no saber el nombre de los componentes se les pasa como children
const Layout = ({children}) => {
    return (
        <Fragment>
            <Head>
                <title>node Send</title>
                <link href="https://unpkg.com/tailwindcss@2.0.4/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>
            
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-20">
                        {children}
                    </main>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Layout
