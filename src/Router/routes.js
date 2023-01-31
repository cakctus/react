import React, { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Context from "../Context/context"
import About from "../Components/About/About"
import App from "../Components/Posts/App2"
import PostId from "../Components/Posts/PostId"
import NotFound from "../Components/NotFound/NotFound"
import Login from "../Components/Auth/Login"
import Logout from "../Components/Auth/Logout"
import FormAPI from "../Components/Forms/FormAPI"
import Create from "../Components/Forms/Create"
import Order from "../Components/Order/Order"
import Navbar from "./Navbar"
import StyledNavbar from "./StyledNavbar"
import ProtectedRoute from "../Components/Order/ProtectedRoute"
import Posts from "../Components/Posts/Posts"
import Checkout from "../Components/Checkout/Checkout"
import Element from "../Components/Element"
import { privateRoutes, publicRoutes } from "../r"

function BaseRouter() {
  const { isAuth } = useContext(Context)
  return (
    <div>
      <Routes>
        {/* {isAuth === true
          ? privateRoutes.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))
          : publicRoutes.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))} */}

        <Route path="/" element={<StyledNavbar />}>
          <Route index element={<Navigate replace to="todo" />} />
          <Route path="/todo" element={<App />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/todo/:id/" element={<PostId />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/create" element={<Create />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Order isAuth={isAuth} />
              </ProtectedRoute>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  )
}

export default BaseRouter
