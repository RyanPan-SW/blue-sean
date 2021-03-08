import React from 'react'
import { Link } from 'react-router-dom'
import triangle from '../../../../asset/triangle.png'
import './index.scss'

const list = [
  { title: 'Property Settlement & Lodgment Services', to: '/services?type=1' },
  { title: 'Property & Body Corporate Searches & Report', to: '/services?type=2' },
  {
    title: 'Legal Documents Deliveries & Service of Court Documents',
    to: '/services?type=3',
  },
]

function TopContent() {
  return (
    <>
      <div className='topContent'>
        <div className='container'>
          <div className='topContent-WeList'>
            <div className='topContent-here'>
              <h2>
                We’re here to
                <br />
                assist you with:
              </h2>
            </div>

            <div className='topContent-list'>
              {list.map((item, index) => {
                return (
                  <Link to={item.to} className='topContent-item' key={index}>
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className='topcontent-sup'>
        <img className='triangle' src={triangle} alt='' />
      </div>
    </>
  )
}

export default React.memo(TopContent)
