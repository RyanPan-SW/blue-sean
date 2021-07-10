import BaseLayout from '@/Layout'
import Login from '@/pages/Login'
// import Home from '@/pages/Home'
// import SignUp from '@/pages/SignUp'
// import Services from '@/pages/Services'
// import Cooperation from '@/pages/Cooperation'
// import Contact from '@/pages/Contact'
// import Question from '@/pages/Question'
// import Becom from '@/pages/Become'
// import PrivacyPolicy from '@/pages/Privacy&CookiePolicy'

import Page404 from '@/pages/404/404'

export const routesConfig = [
  {
    path: '/',
    exact: false,
    component: BaseLayout,
  },
  {
    path: '/notFound',
    exact: true,
    component: Page404,
  },
]
