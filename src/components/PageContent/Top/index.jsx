import React from 'react'
import { Link } from 'react-router-dom'
import triangle from '../../../asset/triangle.png'
import right from '../../../asset/right.png'

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
    <div className='topContent'>
      <div className='topContent-WeList'>
        <span className='topContent-here'>We’re here to assist you with :</span>
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

      <img className='triangle' src={triangle} alt='' />
    </div>
  )
}

export default React.memo(TopContent)
