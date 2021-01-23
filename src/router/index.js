import BaseLayout from '@/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Cooperation from '@/pages/Cooperation'
import Contact from '@/pages/Contact'
import Question from '@/pages/Question'
import Becom from '@/pages/Become'

export const routesConfig = [
  {
    path: '/login',
    auth: false,
    exact: true,
    component: Login,
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
    path: '/becom',
    auth: false,
    exact: false,
    component: Becom,
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
