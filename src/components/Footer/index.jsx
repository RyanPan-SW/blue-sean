import React from 'react'
import { Layout } from 'antd'
import logo from '../../asset/logo-small.png'
import Email from '../../asset/email.png'
import address from '../../asset/address.png'
import letter from '../../asset/letter.png'
import phone from '../../asset/phone.png'
import clock from '../../asset/clock.png'
import fax from '../../asset/fax.png'
import './index.scss'

const { Footer } = Layout

const FooterComponent = () => {
  return (
    <div className='page-footer'>
      <div className='container'>
        <div className='footContent'>
          <img src={logo} alt='' />
        </div>

        <ul>
          <li>
            <img src={Email} alt='' />
            <span>Email: info@dcglobalsolutions.com.au</span>
          </li>
          <li>
            <img src={address} alt='' />
            <span>Address: 5/5 Davenport Street, Southport QLD 4215</span>
          </li>
          <li>
            <img src={letter} alt='' />
            <span>PO Box: TBA</span>
          </li>
          <li>
            <img src={phone} alt='' />
            <span>Office Hours: Monday – Friday 8.30am</span>
          </li>
          <li>
            <img src={clock} alt='' />
            <span>PH: TBA</span>
          </li>
          <li>
            <img src={fax} alt='' />
            <span>FAX: TBA</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FooterComponent
