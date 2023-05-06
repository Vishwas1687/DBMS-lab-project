import React from 'react'
import Header from '../components/Layout/Header'
import {useAuth} from '../context/auth'

const HomePage = () => {
  const [auth,setAuth] = useAuth();

  return (
    <div>
      <Header />
    </div>
  )
}

export default HomePage
