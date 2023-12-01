import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from './Pages/Home'
import Collection from "./Pages/Collection";


const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/collection",
    element:<Collection/>
  },
 
 
]);


function App() {
  return (
    <><RouterProvider router={router} /></>
  );
}

export default App;
