import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import News from './components/News/News.tsx'
import DetailsNews from './components/Details/DetailsNews.tsx'
import Login from './components/Login/Login.tsx'
import NewsCreateForm from './components/News/NewsCreateForm.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[{
      path:"/",
      element:<News></News>
    },
    {
      path:"news/:id",
      element:<DetailsNews/>,
      loader:async ({ params }) => {
        return fetch(`http://localhost:3000/api/news/${params.id}`);
    }},
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/newscreate",
      element:<NewsCreateForm/>
    }
  
  ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </UserContextProvider>
  </StrictMode>,
)
