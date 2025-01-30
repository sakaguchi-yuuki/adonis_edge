import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.string('alias_name', 100).notNullable()
      table.string('phone_number').notNullable()
      table.string('postal_code').nullable()
      table.string('prefecture').nullable()
      table.string('city').nullable()
      table.string('street').nullable()
      table.string('building_name').nullable()
      table.string('agreement_url').notNullable().defaultTo('')
      table.string('avatar_url').notNullable().defaultTo('')
      table.text('account').nullable()
      table.integer('payment').unsigned().notNullable().defaultTo(0)
      table.integer('payment_unit').unsigned().notNullable().defaultTo(0)
      table.integer('nomination').unsigned().notNullable().defaultTo(0)
      table.integer('nomination_unit').unsigned().notNullable().defaultTo(0)
      table.integer('bottle_back').unsigned().notNullable().defaultTo(0)
      table.integer('bottle_back_unit').unsigned().notNullable().defaultTo(0)
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').nullable()
      table.text('remarks').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
