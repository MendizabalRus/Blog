// Packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from "react-router"

// Style
import '../style/main.css';
import "../../../shared/style/_variables.css";
import "../../../shared/style/_reset.css";

// Files
import { AuthProvider }  from '../../../shared/context/authContext';
import routes from "./Routes.jsx"

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
