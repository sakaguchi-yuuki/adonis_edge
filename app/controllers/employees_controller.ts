import NominationUnits from '#enums/nomination_units'
import BottleBackUnit from '#models/bottle_back_unit'
import NominationUnit from '#models/nomination_unit'
import PaymentUnit from '#models/payment_unit'
import Position from '#models/position'
import Role from '#models/role'
import Shop from '#models/shop'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class EmployeesController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const all = request.input('page')
    const page = request.input('page', 1) // デフォルト値は 1
    const limit = request.input('limit', 50) // デフォルト値は 10
    let employees
    if (all == 'all') {
      employees = await User.query()
        .preload('profile', (query) => {
          query.preload('nomination_unit').preload('payment_unit').preload('bottle_back_unit')
        })
        .paginate(page, limit)
    } else {
      employees = await User.query()
        .where('status', true)
        .preload('profile', (query) => {
          query.preload('nomination_unit').preload('payment_unit').preload('bottle_back_unit')
        })
        .paginate(page, limit)
    }
    return view.render('pages/employees/index', { employees })
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
    const employee = await User.query()
      .where('id', params.id) // `params.id` で取得
      .preload('profile', (query) => {
        query.preload('payment_unit').preload('nomination_unit').preload('bottle_back_unit')
      })
      .preload('shop')
      .preload('role')
      .preload('position')
      .firstOrFail()

    return view.render('pages/employees/show', { employee })
  }

  /**
   * Edit individual record
   */
  async edit({ view, params }: HttpContext) {
    const employee = await User.query()
      .where('id', params.id) // `params.id` で取得
      .preload('profile', (query) => {
        query.preload('payment_unit').preload('nomination_unit').preload('bottle_back_unit')
      })
      .preload('shop')
      .preload('role')
      .preload('position')
      .firstOrFail()

    const shops = await Shop.query().orderBy('id', 'asc')
    const roles = await Role.query().orderBy('id', 'asc')
    const positions = await Position.query().orderBy('id', 'asc')
    const paymentUnits = await PaymentUnit.query().orderBy('id', 'asc')
    const nominationUnits = await NominationUnit.query().orderBy('id', 'asc')
    const bottleBackUnits = await BottleBackUnit.query().orderBy('id', 'asc')
    return view.render('pages/employees/edit', {
      employee,
      shops,
      roles,
      positions,
      paymentUnits,
      nominationUnits,
      bottleBackUnits,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
