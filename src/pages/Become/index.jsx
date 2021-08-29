import React, { useRef } from 'react'
import { connect } from 'react-redux'
import * as CounterActionCreator from '@/store/actions/counter'
import becomeBanner from '../../asset/becom-banner.png'
import becomeBoss from '../../asset/become-boss.png'
import becomeJob from '../../asset/become-job.png'
import becomeWork from '../../asset/become-work.png'
import becomePraise from '../../asset/become-praise.png'
import becomeCar from '../../asset/become-car.png'
import becomeABN from '../../asset/become-abn.png'
import { Button } from 'antd'
import './index.scss'

const becomeList = [
  {
    image: becomeBoss,
    title: 'Be Your Own Boss',
    dircetion: 'Work when you want. Choose what //work you want to do.',
  },
  {
    image: becomeJob,
    title: 'A Friendly Job',
    dircetion: 'Drive around town and deliver //documents to happy & //excited customers.',
  },
  {
    image: becomeWork,
    title: 'Easy Work',
    dircetion: 'All you have to do is follow the route //and use your common sense.',
  },
]

const becomeWeNeed = [
  {
    image: becomePraise,
    title: 'Friendly, can-do attitude',
    dircetion: 'Great customer service //goes a long way!',
  },
  {
    image: becomeCar,
    title: 'Your own vehicle',
    dircetion: 'Sedan, hatchback, station //wagon, ute or van.',
  },
  {
    image: becomeABN,
    title: 'An ABN',
    dircetion: 'You’ll be working as an //independent contractor.',
  },
]

function Become() {
  const refRegisterNow = useRef(null)
  const refBecomeRow = useRef(null)
  console.log('🚀 ~ file: index.jsx ~ line 52 ~ Become ~ refRegisterNow', refRegisterNow.current)

  const scrollTo = (i) => {
    let offsetTop1 = refBecomeRow && refBecomeRow.current.offsetTop
    let offsetTop2 = refRegisterNow && refRegisterNow.current.offsetTop
    if (i === 1) {
      window.scrollTo({
        top: offsetTop1 - 130,
      })
    } else if (i === 2) {
      window.scrollTo({
        top: offsetTop2 - 130,
      })
    }
  }

  return (
    <div className='become'>
      <div className='banner'>
        <div className='become-deriction'>
          <div className='become-banner-title'>Courier & Delivery Driver Jobs</div>
          <div className='become-banner-title'>in Brisbane & Gold Coast</div>
          <div className='become-banner-subhead'>We can't wait to meet you!</div>
          <div className='become-banner-buttonGroup'>
            <Button
              className='becomer-banner-register'
              onClick={(i) => {
                scrollTo(1)
              }}
            >
              Register Now
            </Button>
            <Button
              className='become-banner-finf'
              onClick={(i) => {
                scrollTo(2)
              }}
            >
              Find Out More
            </Button>
          </div>
        </div>

        <div className='become-banner-img'>
          <img src={becomeBanner} alt='' />
        </div>
      </div>

      <div className='become-row' ref={refBecomeRow}>
        <div className='become-card'>
          {becomeList.map((item, index) => {
            return (
              <div key={index}>
                <img className='become-row-img' src={item.image} alt='' />
                <p className='become-row-title'>{item.title}</p>
                {replaceStr(item.dircetion)}
              </div>
            )
          })}
        </div>
      </div>

      <div className='become-need'>
        <h3>What We Need From You</h3>

        <div className='become-need-list'>
          {becomeWeNeed.map((item, index) => {
            return (
              <div className='become-need-box' key={index}>
                <img src={item.image} alt='' />

                <h4>{item.title}</h4>

                {replaceStr(item.dircetion)}
              </div>
            )
          })}
        </div>
      </div>

      <div className='become-Register-Now' ref={refRegisterNow}>
        <h3>Register Now</h3>
        <div className='become-register-step'>
          <ul>
            <p>Simple 5 Step Process</p>
            <li> 1. A copy of your resume </li>
            <li> 2. Enter your ABN</li>
            <li> 3. Take a selfie of you and your licence</li>
            <li> 4. Describe your vehicle, attach a photo</li>
            <li> 5. Please email these to: hr@dcglobalsolutions.com.au</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// const Test = ({ num, add, minus }) => (
//   <div>
//     测试的页面
//     {num}
//     <Button
//       className='foo'
//       onClick={() => {
//         add()
//       }}
//     >
//       加
//     </Button>
//     <Button
//       className='foo'
//       onClick={() => {
//         minus()
//       }}
//     >
//       jian-
//     </Button>
//   </div>
// )

const mapStateToProps = ({ counter }) => ({
  num: counter.num,
})

export default connect(mapStateToProps, CounterActionCreator)(Become)

function replaceStr(str) {
  return str.split('//').map((item, index) => {
    return <p key={index}>{item}</p>
  })
}
