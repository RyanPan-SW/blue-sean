import React, { useEffect, useState } from 'react'
import PromptModel from '@/components/PromptModel'
import Cookies from 'js-cookie'
import './index.scss'

function LogOut(props) {
  const [time, setTime] = useState(3)

  useEffect(() => {

    Cookies.remove('token')
    
    localStorage.clear()

    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1)
      } else {
        props.history.push('/')
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [props.history, time])

  return (
    <div>
      <PromptModel>
        <h4 className='sign-out'>Sign Out</h4>

        <p>You are now signed out. </p>

        <p>You will be redirected to the homepage in {time} seconds.</p>
      </PromptModel>
    </div>
  )
}

export default LogOut
