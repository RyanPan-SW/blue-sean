import React from 'react'
import { Link } from 'react-router-dom'
import triangle from '../../../asset/triangle.png'
import right from '../../../asset/right.png'
import './index.scss'

const list = [
  { title: 'Property Settlement & Lodgment Services', to: '/base/services?type=1' },
  { title: 'Property & Body Corporate Searches & Report', to: '/base/services?type=2' },
  {
    title: 'Legal Documents Deliveries & Service of Court Documents',
    to: '/base/services?type=3',
  },
]

function TopContent() {
  return (
    <>
      <div className='topContent'>
        <div className='container'>
          <div className='topContent-WeList'>
            <div className='topContent-here'>We’re here to assist you with ：</div>

            <div className='topContent-list'>
              {list.map((item, index) => {
                return (
                  <Link to={item.to} className='topContent-item' key={index}>
                    <span>{item.title}</span>
                    <img src={right} alt='' />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="topcontent-sup">
        <img className='triangle' src={triangle} alt='' />
      </div>
    </>
  )
}

export default React.memo(TopContent)
