import { Button } from 'antd'
import React from 'react'
import notFound from '../../asset/noFound.png'
import './404.scss'

const Page404 = (props) => {
  return (
    <div className='noFound'>
      <div className='notFound-content'>
        <img src={notFound} alt='' />
        <div className='notFound-title'>This Page Isn't Available Right Now</div>
        <p className='notFound-describe'>
          This may be because of a technical error that we're working to get fixed.Try reloading
          this page.
        </p>

        <Button
          className='notFound-reload'
          onClick={() => {
            props.history.goBack(-1)
          }}
        >
          Reload Page
        </Button>
      </div>
    </div>
  )
}

export default Page404
