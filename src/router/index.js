import BaseLayout from '@/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
// import Cooperation from '@/pages/Cooperation'
// import Contact from '@/pages/Contact'
// import Question from '@/pages/Question'
// import Becom from '@/pages/Become'

const routesConfig = [
  {
    path: '/',
    component: BaseLayout,
    exact: false,
    routes: [
      { path: '/home', exact: false, component: Home },
      { path: '/services', exact: false, component: Services },
    ],
  },
  {
    path: '/login',
    component: Login,
    exact: true
  }
]

export default routesConfig
