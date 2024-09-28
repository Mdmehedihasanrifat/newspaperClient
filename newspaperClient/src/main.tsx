import {  StrictMode, useContext } from 'react'
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
import PrivateRoute from './components/PrivateRoute/PrivateRoute.tsx'
import CreatedNews from './CreatedNews/CreatedNews.tsx'
import Register from './components/Register/Register.tsx'
import { ToastContainer } from 'react-toastify'

const user=JSON.parse(localStorage.getItem("user")) ;

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
      path: "/newscreate",
      element: (
        <PrivateRoute>
          <NewsCreateForm />
        </PrivateRoute>
      ),},
      {
        path: "/register",
        element: <Register></Register>}

      ,{

        path:"/profile",
        element:    <PrivateRoute><CreatedNews></CreatedNews></PrivateRoute>,
        loader:async () => {
          return fetch(`http://localhost:3000/api/news?userId=${user.id}`);
      }},
      {
        path: "/news",
        element: <CreatedNews />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const categoryName = url.searchParams.get("category"); // Extract query parameter
          return fetch(`http://localhost:3000/api/news?category=${categoryName}`);
        }
      },
      { path:"/news/:newsId/edit" ,
        element:<NewsCreateForm/>,
        loader:async ({ params }) => {
          return fetch(`http://localhost:3000/api/news/${params.newsId}`);
      }
      }
      
  ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
     <ToastContainer></ToastContainer>
    </UserContextProvider>
  </StrictMode>,
)
