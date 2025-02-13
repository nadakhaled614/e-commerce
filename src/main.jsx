import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import CounterContextProvider from './Context/CounterContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
<QueryClientProvider client={queryClient}>
  <CounterContextProvider>
    <AuthContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer autoClose={1000} theme="dark"></ToastContainer>
      <App />
    </AuthContextProvider>
  </CounterContextProvider>
  </QueryClientProvider >


)
