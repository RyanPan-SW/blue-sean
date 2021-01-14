import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

function TopContent() {
  return (
    <section className='ourSericer'>
      <div className='container'>
        <h3>Our Services</h3>

        <div className='ourSericer-colContent'>
          <div className='bg1 ourSericer-content '>
            <div>
              <span>{'  '}</span>
              <span>LEGAL DOCUMENTS DELIVERIES</span>
              <span>&</span>
              <span>SERVICES OF COURT DOCUMENTS</span>
              <span>{'  '}</span>
            </div>
            <Link to='/base/services?type=1'>
              <div className='button'>Read More</div>
            </Link>
          </div>

          <div className='bg2 ourSericer-content '>
            <div>
              <span>PROPERTY</span>
              <span>&</span>
              <span>BODY CORPORATE SEARCHES</span>
              <span>&</span>
              <span>REPORT</span>
            </div>
            <Link to='/base/services?type=2'>
              <div className='button'>Read More</div>
            </Link>
          </div>

          <div className='bg3 ourSericer-content '>
            <div>
              <span>{'  '}</span>
              <span>LEGAL DOCUMENTS DELIVERIES</span>
              <span>&</span>
              <span>SERVICES OF COURT DOCUMENTS</span>
              <span>{'  '}</span>
            </div>
            <Link to='/base/services?type=3'>
              <div className='button'>Read More</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(TopContent)
