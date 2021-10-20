import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import node from '../../asset/account-node.png'
import lock from '../../asset/account-lock.png'
import address from '../../asset/account-address.png'
import announcement from '../../asset/announcement.png'
import { getConfigContent } from '@/api/config'
import { getCookie } from '@/helper/env'
import './index.scss'

function MyAccount(props) {
  const { history } = props
  const [adsNotes, setAdsNotes] = useState('')

  useEffect(() => {
    if (!getCookie('token')) {
      history.push('/login')
    }
  })

  useEffect(() => {
    getConfigContent({ code: 'PMCP' }).then(({ data, code }) => {
      if (code === '200') {
        setAdsNotes(data.content)
      }
    })
  }, [])

  return (
    <div className='container'>
      <div className='myAccount'>
        <h3 className='account-title'>My Account</h3>

        <div className='account-card'>
          <Link to='/orders'>
            <img src={node} alt='' />
            <div>
              <h4>My Orders</h4>
              <p>Track,modify or cancel packages</p>
            </div>
          </Link>

          <Link to='/changepassword'>
            <img src={lock} alt='' />
            <div>
              <h4>Password</h4>
              <p>Change your password</p>
            </div>
          </Link>

          {/* TODO：点击整个模块，当前页跳转到【地址管理】页 */}
          <Link to='/address'>
            <img src={address} alt='' />
            <div>
              <h4>Addresses</h4>
              <p>Add or edit address</p>
            </div>
          </Link>
        </div>

        <div className='account-notices'>
          <div className='Ads-title'>
            <img src={announcement} alt='' />
            <div>Ads & Notices</div>
          </div>

          {/* TODO：该模块所有内容由后台编辑展示，此处仅文字展示，可加粗、变色 */}
          <ul className='account-list' dangerouslySetInnerHTML={{ __html: adsNotes }}>
            {/* <li>Warm prompt: Due to the weather, delivery to Brisbane will be delayed by 2 hour</li>
            <li>
              Christmas sales: 20% discount！20% discount！There is a 20% discount for express
              delivery！It's so important that it should be repeated for three times.
            </li>
            <li>我们是后台编辑填写的广告、通知信息等等，我们只是纯文字的展示。</li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default MyAccount
