import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import '../index.css'
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import HomePage from './../pages/HomePage/HomePage';
import MasterEquipment from './../pages/MasterEquipment/MasterEquipment';
import MasterEquipmentType from './../pages/MasterEquipmentType/MasterEquipmentType';


import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

//import './index.css';
// import '../flags.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/MasterEquipment",
    element: <MasterEquipment />,
  },
  {
    path: "/MasterEquipmentType",
    element: <MasterEquipmentType />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>    
    <RouterProvider router={router} />
  </StrictMode>
);

