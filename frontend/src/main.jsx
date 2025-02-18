import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import store from './services/store.js';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux"
import { ToastContainer, Bounce } from 'react-toastify';
import AuthProvider from './components/Auth/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Toaster />
          <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce} />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
