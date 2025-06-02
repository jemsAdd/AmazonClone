import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from "./components/DataProvider/DataProvider";
import { initialState, reducer } from "./utility/reducer";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState} >
    <App/>
    </DataProvider>
  </StrictMode>,
)
