import React from 'react'
import { Link } from 'react-router-dom'
import node from '../../asset/account-node.png'
import lock from '../../asset/account-lock.png'
import address from '../../asset/account-address.png'
import './index.scss'

function MyAccount(params) {
  return (
    <div className='MyAccount'>
      <h3>My Account</h3>

      <div className='account-card'>
        <Link to='/orders'>
          <img src={node} alt='' />
          <div>
            <h4>My Orders</h4>
            <p>Track,modify or cancel packages</p>
          </div>
        </Link>

        {/* TODO：点击整个模块，当前页跳转到【修改登录密码】页 */}
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
            <p>Add or edit addresses</p>
          </div>
        </Link>
      </div>

      {/* TODO：该模块所有内容由后台编辑展示，此处仅文字展示，可加粗、变色 */}
      <div className="account-notices">
        <div className='Ads-title'>
          <img src='' alt='' />
          <span>Ads & Notices</span>
        </div>

        <ul className="account-list">
          <li>Warm prompt: Due to the weather, delivery to Brisbane will be delayed by 2 hour</li>
          <li>
            Christmas sales: 20% discount！20% discount！There is a 20% discount for express
            delivery！It's so important that it should be repeated for three times.
          </li>
          <li>我们是后台编辑填写的广告、通知信息等等，我们只是纯文字的展示。</li>
        </ul>
      </div>
    </div>
  )
}
export default MyAccount
