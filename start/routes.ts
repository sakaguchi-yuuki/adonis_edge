/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const LogoutController = () => import('#controllers/auth/logout_controller')
const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const EmployeesController = () => import('#controllers/employees_controller')

router.get('/', [HomeController, 'index']).as('home')

router.get('/employees', [EmployeesController, 'index']).as('employees.index')
router.get('/employees/:id', [EmployeesController, 'show']).as('employees.show')
router.get('/employees/edit/:id', [EmployeesController, 'edit']).as('employees.edit')

router
  .group(() => {
    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post('/register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())
    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

    router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())
  })
  .prefix('/auth')
  .as('auth')

router
  .group(() => {
    router
      .get('/', async (ctx) => {
        return `You are here, ${ctx.auth.user?.id} as ${ctx.auth.user?.roleId} role`
      })
      .as('index')
  })
  .prefix('/admin')
  .as('admin')
  .use(middleware.admin())
