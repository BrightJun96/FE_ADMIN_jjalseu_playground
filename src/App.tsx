import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { useState } from 'react'
import {RouterProvider} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import router from "./router/router.tsx";
const queryClient = new QueryClient()


function App() {

  return (
      <QueryClientProvider
          client={queryClient}
      >
          <RouterProvider router={router}/>
      </QueryClientProvider>
  )
}

export default App
