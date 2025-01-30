import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import UserProfile from './user_profile.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class NominationUnit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => UserProfile)
  declare nominationUnit: HasMany<typeof UserProfile>
}
