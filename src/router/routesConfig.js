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
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/cooperation',
    name: 'Cooperation',
    component: Cooperation,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
  },
  {
    path: '/becom',
    name: 'Becom',
    component: Becom,
  },
]

export default routesConfig
