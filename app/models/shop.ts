import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Shop extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: boolean

  @column()
  declare name: string

  @column()
  declare email: string

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
  declare shopUrl: string

  @column.dateTime()
  declare startDate: DateTime | null

  @column.dateTime()
  declare endDate: DateTime | null

  @column()
  declare remarks: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => User, {
    foreignKey: 'shopId',
  })
  declare user: HasMany<typeof User>
}
