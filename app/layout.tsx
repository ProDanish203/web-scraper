import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header } from '@/components/shared'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Pyzon Ecommerce',
  description: 'Web scraping the pricing data from amazon to pyzon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </head>
      <body className='bg-bg'>
      <div className='max-w-[1500px] mx-auto w-full '>
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
        <Header/>

          <main className='min-h-[80vh]'>
            {children}
          </main>

        <Footer/>
      </div>
      </body>
    </html>
  )
}
