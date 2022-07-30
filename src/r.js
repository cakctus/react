import React from "react"
import { Navigate } from "react-router-dom"

import About from "./About"
import App from "./App2"
import PostId from "./Components/Posts/PostId"
import NotFound from "./Components/NotFound"
import FormAPI from "./Components/FormAPI"

import Login from "./Components/Login"

export const privateRoutes = [
  { path: "", element: <Navigate />, replateTo: "todo" },
  { path: "/about/", element: <About /> },
  { path: "/todo/", element: <App /> },
  { path: "/todo/:id/", element: <PostId /> },
  { path: "*", element: <NotFound /> },
  { path: "/create/", element: <FormAPI /> },
]

export const publicRoutes = [{ path: "/login", element: <Login /> }]
