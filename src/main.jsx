import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <Auth0Provider
    domain="dev-cuywavmx57hbfrxo.us.auth0.com"
    clientId="v2hjL7gDCNAMMSSQO0RxsKbODdPU7pDg"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >    <App/>
  </Auth0Provider>
  </BrowserRouter>
)
