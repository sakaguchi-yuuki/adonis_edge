import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#enums/roles'
import Position from '#models/position'
import Positions from '#enums/positions'
import { ShopFactory } from '#database/factories/shop_factory'
import PaymentUnits from '#enums/payment_units'
import PaymentUnit from '#models/payment_unit'
import NominationUnit from '#models/nomination_unit'
import NominationUnits from '#enums/nomination_units'
import BottleBackUnit from '#models/bottle_back_unit'
import BottleBackUnits from '#enums/bottle_back_units'

export default class extends BaseSeeder {
  async run() {
    await ShopFactory.createMany(4)

    await Role.createMany([
      {
        id: Roles.USER,
        name: 'Employee',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])

    await Position.createMany([
      {
        id: Positions.CAST,
        name: 'キャスト',
      },
      {
        id: Positions.DISPATCH_CAST,
        name: '派遣キャスト',
      },
      {
        id: Positions.SUPER_VISER,
        name: '店長',
      },
      {
        id: Positions.MANEGER,
        name: 'マネージャー',
      },
      {
        id: Positions.BLACK_CLOTHES,
        name: '黒服',
      },
      {
        id: Positions.PART_TIMERS,
        name: '他バイト',
      },
    ])

    await PaymentUnit.createMany([
      {
        id: PaymentUnits.YEN,
        name: '円',
      },
      {
        id: PaymentUnits.PERCENT,
        name: '％',
      },
    ])

    await NominationUnit.createMany([
      {
        id: NominationUnits.YEN,
        name: '円',
      },
      {
        id: NominationUnits.PERCENT,
        name: '％',
      },
    ])

    await BottleBackUnit.createMany([
      {
        id: BottleBackUnits.YEN,
        name: '円',
      },
      {
        id: BottleBackUnits.PERCENT,
        name: '％',
      },
    ])
  }
}
