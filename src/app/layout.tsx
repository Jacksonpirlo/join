"use client";
import Nav from "@/components/organisms/nav";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <Nav />
          <main className="flex-1 flex items-center justify-center">
            {children}
            <ToastContainer 
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="colored"
        />
          </main>
          <footer className='mt-auto p-4 text-center'>
            <p>© 2023 Riwi-Join. All rights reserved.</p>
          </footer>
          </GoogleOAuthProvider>
      </body>
    </html>
  );
}
