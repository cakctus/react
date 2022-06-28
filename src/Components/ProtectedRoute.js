import React from 'react'

const ProtectedRoute = ({isAuth, children}) => {

  return (
    <div> 
      {isAuth && children}
    </div>
  )
}

export default ProtectedRoute;
