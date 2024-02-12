import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Urbanist} from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/providers/react-toast-provider'
import Chat from '@/components/chat'
import UsePreviewProvider from '@/providers/use-preview-provider'
import {Widget} from '../components/Widget/index';

export const runtime = "edge"
const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ForgeStore',
  description: 'A e-commerce store powered by ForgeCommerce api',
  icons:{
    icon:"/icons/StoreIcon1.png",
    apple:"/icons/StoreIcon1.png",
  },
  manifest:"/manifest.json"
}
export const viewport:Viewport={
  themeColor:"#FFFFFF",
}
export const revalidate = 0;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" data-theme="winter">
      <UsePreviewProvider/>
      <body className={urbanist.className}>
        <Navbar/>
        {/* <Chat/> */}
        <div className=' absolute right-[5vw] bottom-[5vh] flex flex-col gap-2 w-[35vw] h-[600px] z-[999999999]' >
          
        <Widget/>
        </div>
        <ToastProvider/>
        {children}
        </body>
    
    </html>
    </ClerkProvider>
  )
}
