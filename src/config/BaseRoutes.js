import Test from '@/pages/test'
import Test1 from '@/pages/test1'
import Home from '@/pages/home'

const routes = [
  {
    path: '/base/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/base/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/base/test1',
    name: 'Test1',
    component: Test1,
  },
]

export default routes
