import BaseLayout from '@/Layout'

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
