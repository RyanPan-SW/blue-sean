import React from 'react'
// import { Layout } from 'antd'
import logo from '../../asset/footer-logo.jpg'
import Email from '../../asset/email.png'
import address from '../../asset/address.png'
// import letter from '../../asset/letter.png'
import phone from '../../asset/phone.png'
import clock from '../../asset/clock.png'
// import fax from '../../asset/fax.png'
import './index.scss'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Space } from 'antd'

// const { Footer } = Layout

const FooterComponent = () => {
  const { pathname } = useLocation()

  return (
    <>
      {pathname.search('/home') > -1 && (
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
              {/* <li>
            <img src={letter} alt='' />
            <span>PO Box: TBA</span>
          </li> */}
              <li>
                <img src={clock} alt='' />
                <span>Office Hours: Monday – Friday 8:30am to 5:00pm</span>
              </li>
              <li>
                <img src={phone} alt='' />
                <span>PH: 07 5649 8619</span>
              </li>
              {/* <li>
            <img src={fax} alt='' />
            <span>FAX: TBA</span>
          </li> */}
            </ul>
          </div>
        </div>
      )}

      <div className='Copyright'>
        <div className='container'>
          <span>Copyright © DC Global Solution - All rights reserved.</span>
          <Space>
            <Link className='Privacy-Policy' to='/privacypolicy'>
              Privacy Policy
            </Link>
            <Link to='/website'>Terms of Use</Link>
          </Space>
        </div>
      </div>
    </>
  )
}

export default FooterComponent
