import BaseLayout from '@/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
// import SignUp from '@/pages/SignUp'
import Services from '@/pages/Services'
import Cooperation from '@/pages/Cooperation'
import Contact from '@/pages/Contact'
import Question from '@/pages/Question'
import Becom from '@/pages/Become'
import PrivacyPolicy from '@/pages/Privacy&CookiePolicy'

import Page404 from '@/pages/404'

export const routesConfig = [
  {
    path: '/404',
    auth: false,
    exact: true,
    component: Page404,
  },
  {
    path: '/',
    auth: false,
    exact: false,
    component: BaseLayout,
  },
  {
    path: '/home',
    auth: false,
    exact: false,
    component: Home,
  },
  {
    path: '/login',
    auth: false,
    exact: true,
    component: Login,
  },
  // {
  //   path: '/signup',
  //   auth: false,
  //   exact: true,
  //   component: SignUp,
  // },
  {
    path: '/services',
    auth: false,
    exact: false,
    component: Services,
  },
  {
    path: '/cooperation',
    auth: false,
    exact: false,
    component: Cooperation,
  },
  {
    path: '/contact',
    auth: false,
    exact: false,
    component: Contact,
  },
  {
    path: '/question',
    auth: false,
    exact: false,
    component: Question,
  },
  {
    path: '/become',
    auth: false,
    exact: false,
    component: Becom,
  },
  {
    path: '/privacypolicy',
    auth: false,
    exact: false,
    component: PrivacyPolicy,
  },
]

// export const routesConfig2 = [
//   {
//     path: '/home',
//     auth: false,
//     exact: true,
//     component: BaseLayout,
//     routes: [
//       { path: '/home', exact: false, component: Home },
//       { path: '/home/services', exact: false, component: Services },
//     ],
//   },
//   {
//     path: '/login',
//     auth: true,
//     exact: true,
//     component: Login,
//   },
// ]
