import React from 'react'
import { Button } from 'antd'
import './index.scss'

export default function LoadingSubmit(props) {
  const { className } = props

  return (
    <Button type='primary' htmlType='submit' className={`${className} signup-form-loading`}>
      <div className='signup-loading'>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </Button>
  )
}