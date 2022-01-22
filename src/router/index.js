import BaseLayout from '@/Layout'
import Page404 from '@/pages/404/404'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import Become from '@/pages/Become'
import Privacy from '@/pages/Privacy&CookiePolicy'
import BusinessCooperation from '@/pages/BusinessCooperation'
import Cooperate from '@/pages/Cooperate'
import Forget from '@/pages/Forget'
import Personal from '@/pages/Personal'
import Help from '@/pages/Help'
import Contact from '@/pages/Contact'
import ContactUs from '@/pages/ContactUs'
import MyAccount from '@/pages/MyAccount'
import MyOrders from '@/pages/MyOrders'
import MyAddress from '@/pages/MyAddress'
import ChangePassword from '@/pages/ChangePassword'
import LogOut from '@/pages/LogOut'
import FileStep from '@/pages/FileStep'
import DetailsView from '@/pages/DetailsView'
import ContractTerms from '@/pages/ContractTerms'
import WebsiteTerms from '@/pages/WebsiteTerms'

export const routesConfig = [
  {
    path: '/',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/signup',
        component: SignUp
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/services/:id',
        component: Services
      },
      {
        path: '/become',
        component: Become
      },
      {
        path: '/business',
        component: BusinessCooperation
      },
      {
        path: '/cooperate',
        component: Cooperate
      },
      {
        path: '/personal',
        component: Personal
      },
      {
        path: '/forget',
        component: Forget
      },
      {
        path: '/help',
        component: Help
      },
      {
        path: '/contact',
        component: Contact
      },
      {
        path: '/contactus',
        component: ContactUs
      },
      {
        path: '/account',
        component: MyAccount
      },
      {
        path: '/orders',
        component: MyOrders
      },
      {
        path: '/detailsview/:id',
        component: DetailsView
      },
      {
        path: '/address',
        component: MyAddress
      },
      {
        path: '/changepassword',
        component: ChangePassword
      },
      {
        path: '/logOut',
        component: LogOut
      },
      {
        path: '/filestep',
        component: FileStep
      },
      {
        path: '/privacypolicy',
        component: Privacy
      },
      {
        path: '/website',
        component: WebsiteTerms
      },
      {
        path: '/contract',
        component: ContractTerms
      },
      {
        path: '/notFound',
        exact: true,
        component: Page404
      }
    ]
  },

]
