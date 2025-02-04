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
    const qs = request.qs()
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)
    const search = qs.search
    let employees
    employees = await User.query()
      .if(qs.page !== 'all', (query) => query.where('status', true))
      .if(qs.search, (query) =>
        query
          .join('user_profiles', 'users.id', 'user_profiles.user_id')
          .whereILike('user_profiles.last_name', `%${qs.search}%`)
          .orWhereILike('user_profiles.first_name', `%${qs.search}%`)
          .orWhereILike('user_profiles.alias_name', `%${qs.search}%`)
      )
      .preload('profile', (query) => {
        query.preload('nomination_unit').preload('payment_unit').preload('bottle_back_unit')
      })
      .paginate(page, limit)
    return view.render('pages/employees/index', { employees, search })
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
  async update({ params, request, response }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('profile').first()

    if (!user) {
      throw new Exception(`User not found`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }

    const userData = {
      id: request.input('id'),
      status: request.input('status'),
      shop_id: request.input('shop'),
      role_id: request.input('role'),
      position_id: request.input('position'),
      email: request.input('email'),
    }
    const userProfileData = {
      first_name: request.input('firstName'),
      last_name: request.input('lastName'),
      alias_name: request.input('aliasName'),
      phone_number: request.input('phoneNumber'),
      postal_code: request.input('postalCode'),
      prefecture: request.input('prefecture'),
      city: request.input('city'),
      street: request.input('street'),
      building_name: request.input('buildingName'),
      agreement_url: request.input('agreementUrl'),
      avatar_url: request.input('avatarUrl'),
      account: request.input('account'),
      payment: request.input('payment'),
      payment_unit: request.input('paymentUnit'),
      nomination: request.input('payment'),
      nomination_unit: request.input('nominationUnit'),
      bottle_back: request.input('payment'),
      bottle_back_unit: request.input('bottleBackUnit'),
      start_date: request.input('startDate'),
      end_date: request.input('endDate'),
      remarks: request.input('remarks'),
    }

    user.merge({
      ...userData,
    })

    if (user.profile) {
      user.profile.merge({
        ...userProfileData,
      })
      await user.profile.save()
    }
    await user.save()

    return response.redirect().toRoute('employees.edit', { id: params.id })
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
