import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import './style/polish.css';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        theme="colored"
        transition={Slide}
        style={{ width: '350px', fontSize: '15px', fontWeight: '500' }}
      />
    </BrowserRouter>
  </StrictMode>,
);
