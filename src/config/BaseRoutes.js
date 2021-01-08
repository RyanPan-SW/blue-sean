import Home from '@/pages/Home'
import Services from '@/pages/services'
import Cooperation from '@/pages/cooperation'
import Contact from '@/pages/contact'
import Question from '@/pages/question'
import Becom from '@/pages/become'

const routes = [
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
    path: '/base/question',
    name: 'Becom',
    component: Becom,
  },
]

export default routes
