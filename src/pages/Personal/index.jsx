import React from 'react'
import signhome from '../../asset/sign-home.png'
import signuser from '../../asset/sign-user.png'
import signaddress from '../../asset/sign-address.png'
import { Link } from 'react-router-dom'
import './index.scss'

function Personal(props) {
  return (
    <div className='signup-success'>
      <div className='congratulations'>
        <h4>Congratulations!</h4>
        <h4>Your account has been activated.</h4>

        <span>We have sent you an email with instructions to complete sign up.</span>
      </div>

      <div className='next'>
        <h4>WHAT'S  NEXT ?</h4>

        <div className='banner'>
          <Link to='/' className='item'>
            <img src={signhome} alt='' />
            <span>Back Homepage</span>
          </Link>

          <Link to='/account' className='item'>
            <img src={signuser} alt='' />
            <span>My Account</span>
          </Link>

          <Link to='/address' className='item'>
            <img src={signaddress} alt='' />
            <span>Add My Address</span>
          </Link>
        </div>

        <span className='or'>or</span>

        <Link to='/filestep/add' className='new-pickup'>
          Schedule a New Pickup
        </Link>
      </div>
    </div>
  )
}

export default Personal
