import React from 'react'
import triangle from '../../../asset/triangle.png'
import teacher from '../../../asset/teacher.png'
import cooperation from '../../../asset/cooperation.png'
import competitive from '../../../asset/competitive.png'
import './index.scss'

function AboutUs() {
  return (
    <>
      <div className='listContent'>
        <div className='container'>
          <h3>About Us</h3>

          <span className='direction'>
            DC Global Solution is a company provides multiple initiatives of property and other
            legal area related settling, searching, servicing, lodging and delivering service. Our
            professional team helps other legal professionals and clients with buying and selling of
            property and everyday business, no matter how intractable the matter is. We are able and
            ready to assist you. Our search services cover the entire Queensland transactions, and
            our friendly team attend to Gold Coast and Brisbane area.
          </span>

          <div className='newList'>
            <img src={teacher} alt='' />
            <div>
              <p className='title'>EXPERIENCED AND EFFICIENT</p>
              <span>
                Experienced company would support you every step of your purchase, client
                communication always is a priority and keep regular updates on the status of
                transaction with advice when settlement is done.
              </span>
            </div>
          </div>

          <div className='newList'>
            <img src={cooperation} alt='' />
            <div>
              <p className='title'>FULLY INDEPENDENT LEGAL ADVICE</p>
              <span>
                We have professional team on body corporate and conveyancing services. You can take
                it easy for any residential or commercial conveyancing, and body corporate
                settlement and report. With our vast experiences, it makes every property
                transaction smooth and efficient.
              </span>
            </div>
          </div>

          <div className='newList'>
            <img src={competitive} alt='' />
            <div>
              <p className='title'>COMPETITIVE RATES</p>
              <span>
                Compare our service standard, we have competitive price rates on local market. No
                surprise out-of-pocket fee happened anytime.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutUs-sup">
        <img className='triangle' src={triangle} alt='' />
      </div>
    </>
  )
}

export default React.memo(AboutUs)
