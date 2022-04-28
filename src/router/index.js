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
    exact: true,
    component: Home,
    // children: [
    //   {
    //     path: '/',
    //     exact: false,
    //     component: Home,
    //   },
    // ],
  },
  {
    path: '/login',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
    ],
  },
  {
    path: '/signup',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/signup',
        component: SignUp,
      },
    ],
  },
  {
    path: '/services/:id',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/services/:id',
        component: Services,
      },
    ],
  },
  {
    path: '/become',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/become',
        component: Become,
      },
    ],
  },
  {
    path: '/business',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/business',
        component: BusinessCooperation,
      },
    ],
  },
  {
    path: '/cooperate',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/cooperate',
        component: Cooperate,
      },
    ],
  },
  {
    path: '/personal',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/personal',
        component: Personal,
      },
    ],
  },
  {
    path: '/forget',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/forget',
        component: Forget,
      },
    ],
  },
  {
    path: '/help',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/help',
        component: Help,
      },
    ],
  },
  {
    path: '/contact',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/contact',
        component: Contact,
      },
    ],
  },
  {
    path: '/contactus',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/contactus',
        component: ContactUs,
      },
    ],
  },
  {
    path: '/contactus',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/account',
        component: MyAccount,
      },
    ],
  },
  {
    path: '/contactus',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/orders',
        component: MyOrders,
      },
    ],
  },
  {
    path: '/detailsview/:id',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/detailsview/:id',
        component: DetailsView,
      },
    ],
  },
  {
    path: '/address',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/address',
        component: MyAddress,
      },
    ],
  },
  {
    path: '/changepassword',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/changepassword',
        component: ChangePassword,
      },
    ],
  },
  {
    path: '/logOut',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/logOut',
        component: LogOut,
      },
    ],
  },
  {
    path: '/filestep',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/filestep',
        component: FileStep,
      },
    ],
  },
  {
    path: '/privacypolicy',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/privacypolicy',
        component: Privacy,
      },
    ],
  },
  {
    path: '/website',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/website',
        component: WebsiteTerms,
      },
    ],
  },
  {
    path: '/contract',
    exact: false,
    component: BaseLayout,
    children: [
      {
        path: '/contract',
        component: ContractTerms,
      },
    ],
  },
  // {
  //   path: '/notFound',
  //   exact: false,
  //   component: BaseLayout,
  //   children: [
  //     {
  //       path: '/notFound',
  //       component: Page404,
  //     },
  //   ],
  // },
  {
    path: '*',
    exact: true,
    component: Page404,
  },
]
