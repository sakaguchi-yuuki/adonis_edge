import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import UserProfile from './user_profile.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import Shop from './shop.js'
import Position from './position.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: boolean

  @column()
  declare shopId: number

  @column()
  declare roleId: number

  @column()
  declare positionId: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasOne(() => UserProfile, {
    foreignKey: 'userId',
  })
  declare profile: HasOne<typeof UserProfile>

  @belongsTo(() => Shop, {
    foreignKey: 'shopId',
  })
  declare shop: BelongsTo<typeof Shop>

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Position, {
    foreignKey: 'positionId',
  })
  declare position: BelongsTo<typeof Position>
}
