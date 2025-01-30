import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.boolean('status').notNullable().defaultTo(false)
      table.string('name')
      table.string('email', 254).unique()
      table.string('phone_number').nullable()
      table.string('postal_code').nullable()
      table.string('prefecture').nullable()
      table.string('city').nullable()
      table.string('street').nullable()
      table.string('building_name').nullable()
      table.string('shop_url').nullable()
      table.timestamp('start_date').nullable()
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
