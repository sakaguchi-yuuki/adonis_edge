/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import fs from 'node:fs/promises'
import UserService from '#services/user_service'
const EmployeesController = () => import('#controllers/employees_controller')
const UsersController = () => import('#controllers/users_controller')

router
  .get('/', async (ctx) => {
    const url = app.makeURL('resources/users')
    const slugs = await fs.readdir(url)
    return ctx.view.render('pages/home', { slugs })
  })
  .as('home')

router.get('/employees', [EmployeesController, 'index']).as('employees.index')
router.get('/employees/:id', [EmployeesController, 'show']).as('employees.show')
router.get('/employees/edit/:id', [EmployeesController, 'edit']).as('employees.edit')
