import BaseLayout from '@/Layout'
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
]

export default routesConfig
