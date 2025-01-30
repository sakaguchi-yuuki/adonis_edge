import Positions from '#enums/positions'
import Roles from '#enums/roles'
import Shops from '#enums/shops'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.boolean('status').notNullable().defaultTo(false)
      table
        .integer('shop_id')
        .unsigned()
        .notNullable()
        .references('shops.id')
        .defaultTo(Shops.DEFAULT)
      table.integer('role_id').unsigned().notNullable().references('roles.id').defaultTo(Roles.USER)
      table
        .integer('position_id')
        .unsigned()
        .notNullable()
        .references('positions.id')
        .defaultTo(Positions.CAST)
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
