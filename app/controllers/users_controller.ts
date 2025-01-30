import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1) // デフォルト値は 1
    const limit = request.input('limit', 25) // デフォルト値は 10
    const users = await User.query().preload('profile').paginate(page, limit)
    return view.render('pages/employees/index', { users })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ view, params }: HttpContext) {
    const user = await User.firstOrFail(params.id)
    const profile = await user.load('profile')
    const shop = await user.load('shop')
    const role = await user.load('role')
    const position = await user.load('position')

    return view.render('pages/employees/show', { user })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
