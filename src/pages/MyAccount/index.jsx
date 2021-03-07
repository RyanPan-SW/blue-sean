import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function MyAccount(params) {
  return (
    <div>
      <h3>My Account</h3>

      <Link to="/orders">
        <img src='' alt='' />
        <div>
          <h4>My Orders</h4>
          <p>Track,modify or cancel packages</p>
        </div>
      </Link>

      {/* TODO：点击整个模块，当前页跳转到【修改登录密码】页 */}
      <div>
        <img src='' alt='' />
        <div>
          <h4>Password</h4>
          <p>Change your password</p>
        </div>
      </div>

      {/* TODO：点击整个模块，当前页跳转到【地址管理】页 */}
      <div>
        <img src='' alt='' />
        <div>
          <h4>Addresses</h4>
          <p>Add or edit addresses</p>
        </div>
      </div>

      {/* TODO：该模块所有内容由后台编辑展示，此处仅文字展示，可加粗、变色 */}
      <div>
        <div className='Ads-title'>
          <img src='' alt='' />
          <span>Ads & Notices</span>
        </div>

        <ul>
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
