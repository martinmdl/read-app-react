import { createBrowserRouter } from 'react-router-dom'
import { PageNotFound } from '../components/common/page_not_found/PageNotFound'
import { HomePage } from '../components/layouts/home/Home'
import SignUp from '../components/layouts/login/Login'
import { PrivateRoute } from './privateRoute'
import { Authors } from '../components/layouts/authors/Authors'
import { Books } from '../components/layouts/books/Books'
import { AuthorEdit } from '../components/layouts/authors/edit/AuthorEdit'
import { BookEdit } from '../components/layouts/books/edit/BookEdit'

export const router = createBrowserRouter([
  { path: '/', element: <SignUp />, errorElement: <PageNotFound /> },
  {
    element: <PrivateRoute />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/authors', element: <Authors /> },
      { path: '/author/:id?', element: <AuthorEdit /> },
      { path: '/books', element: <Books /> },
      { path: '/books/:id?', element: <BookEdit /> },
      { path: '/', element: <SignUp /> },
    ],
    errorElement: <PageNotFound />,
  },
])
