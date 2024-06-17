import React from 'react'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import favicon from "./../public/Promt.ico"

export const metadata = {
    title: "Promptopia | Discover and Share AI prompts",
    description: "Discover and Share AI prompts",
    icons:{
        icon: `${favicon.src}`
    } 
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className='gradient'/>
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout