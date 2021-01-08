import React from 'react'
import { connect } from 'react-redux'
// import { Switch, Route } from 'react-router-dom'
// import Header from '@/components/Header'
import * as UserActionCreator from '@/store/actions/user'
// import Test from '@/pages/test'
// import Test1 from '@/pages/test1'

// import '@/style/home/home.scss'
import write from '../../asset/write.png'
import triangle from '../../asset/triangle.png'
import './index.css'

const Home = () => {
  // const { isLogin, login, logout } = props

  // const loginClick = isLogin ? logout : login

  return (
    <div className='box'>
      <img className='topWrite' src={write} alt='' />
      <img className='triangle' src={triangle} alt='' />
      <div className='weList'>
        <span className='here'>We’re here to assist you with :</span>
        <ul className='list'>
          <li>
            <span>Property Settlement & Lodgment Services</span>
            <i>{'>'}</i>
          </li>
          <li>
            <span>Property & Body Corporate Searches & Report</span>
            <i>{'>'}</i>
          </li>
          <li>
            <span>Legal Documents Deliveries & Service of Court Documents</span>
            <i>{'>'}</i>
          </li>
        </ul>
      </div>

      <div className='listContent'>
        <div className='content'>
          <h3>About Us</h3>

          <span>
            DC Global Solution is a company provides multiple initiatives of property and other
            legal area related settling, searching, servicing, lodging and delivering service. Our
            professional team helps other legal professionals and clients with buying and selling of
            property and everyday business, no matter how intractable the matter is. We are able and
            ready to assist you. Our search services cover the entire Queensland transactions, and
            our friendly team attend to Gold Coast and Brisbane area.
          </span>

          <div className='newList'>
            <img src={write} alt='' />
            <div>
              <p className='title'>Experienced and Efficient</p>
              <span>
                Experienced company would support you every step of your purchase, client
                communication always is a priority and keep regular updates on the status of
                transaction with advice when settlement is done.
              </span>
            </div>
          </div>

          <div className='newList'>
            <img src={write} alt='' />
            <div>
              <p className='title'>Fully Independent Legal Advice</p>
              <span>
                We have professional team on body corporate and conveyancing services. You can take
                it easy for any residential or commercial conveyancing, and body corporate
                settlement and report. With our vast experiences, it makes every property
                transaction smooth and efficient.
              </span>
            </div>
          </div>

          <div className='newList'>
            <img src={write} alt='' />
            <div>
              <p className='title'>Competitive Rates</p>
              <span>
                Compare our service standard, we have competitive price rates on local market. No
                surprise out-of-pocket fee happened anytime.
              </span>
            </div>
          </div>
        </div>
        <img className='triangle' src={triangle} alt='' />
      </div>

      {/* <Layout>
        <Affix>
          <Header />
        </Affix>

        <Content>
          <Switch>
            <Route path='/test' component={Test} />
            <Route path='/test1' component={Test1} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout> */}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Home)
