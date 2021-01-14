import BaseLayout from '@/Layout'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Cooperation from '@/pages/Cooperation'
import Contact from '@/pages/Contact'
import Question from '@/pages/Question'
import Becom from '@/pages/Become'

const routesConfig = [
  // {
  //   path: '/',
  //   component: BaseLayout,
  //   routes: [
  //     { path: '/home', component: Home },
  //     { path: '/services', component: Services },
  //   ],
  // },
  {
    path: '/base/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/base/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/base/cooperation',
    name: 'Cooperation',
    component: Cooperation,
  },
  {
    path: '/base/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/base/question',
    name: 'Question',
    component: Question,
  },
  {
    path: '/base/becom',
    name: 'Becom',
    component: Becom,
  },
]

export default routesConfig
