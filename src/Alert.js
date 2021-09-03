import React, { useEffect } from 'react'

const Alert = ({type , msg ,removeAlert,list}) => {
// here we want to show  the alert for a moment and then hide it so we will use useEffect
  useEffect(()=>{
    const timeout = setTimeout(() => {
      removeAlert()
      
    }, 3000);
    return ()=> clearTimeout(timeout)

  },[list])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
