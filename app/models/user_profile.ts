import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PaymentUnit from './payment_unit.js'
import NominationUnit from './nomination_unit.js'
import BottleBackUnit from './bottle_back_unit.js'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare aliasName: string

  @column()
  declare phoneNumber: string

  @column()
  declare postalCode: string

  @column()
  declare prefecture: string

  @column()
  declare city: string

  @column()
  declare street: string

  @column()
  declare buildingName: string

  @column()
  declare agreementUrl: string

  @column()
  declare avatarUrl: string

  @column()
  declare account: string

  @column()
  declare payment: number

  @column()
  declare paymentUnit: number

  @column()
  declare nomination: number

  @column()
  declare nominationUnit: number

  @column()
  declare bottleBack: number

  @column()
  declare bottleBackUnit: number

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare remarks: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => PaymentUnit, {
    foreignKey: 'paymentUnit',
  })
  declare payment_unit: BelongsTo<typeof PaymentUnit>

  @belongsTo(() => NominationUnit, {
    foreignKey: 'nominationUnit',
  })
  declare nomination_unit: BelongsTo<typeof NominationUnit>

  @belongsTo(() => BottleBackUnit, {
    foreignKey: 'bottleBackUnit',
  })
  declare bottle_back_unit: BelongsTo<typeof BottleBackUnit>

  @computed()
  get fullName() {
    return `${this.lastName} ${this.firstName}`
  }
  @computed()
  get fullAddress() {
    return `${this.prefecture}${this.city}${this.street}${this.buildingName}`
  }
}
