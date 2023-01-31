import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import About from "../Components/About/About"
import App from "../App2"
import PostId from "../Components/Posts/PostId"
import NotFound from "../Components/NotFound"
import Login from "../Components/Login"
import Logout from "../Components/Logout"
import FormAPI from "../Components/FormAPI"
import Create from "../Components/Create"
import Order from "../Components/Order"
import Navbar from "./Navbar"
import StyledNavbar from "./StyledNavbar"
import ProtectedRoute from "../Components/ProtectedRoute"
import Posts from "../Components/Posts/Posts"
import Checkout from "../Components/Checkout"
import Element from "../Components/Element"

function RoutesPrivate() {
  return (
    <div>
      {/* <Routes> */}
      <Route index element={<Navigate replace to="todo" />} />
      <Route path="/todo" element={<App />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/todo/:id/" element={<PostId />} />
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
      {/* </Routes> */}
    </div>
  )
}

export default RoutesPrivate
