import factory from '@adonisjs/lucid/factories'
import Shop from '#models/shop'
import { DateTime } from 'luxon'
import { Faker, ja, en } from '@faker-js/faker'
const faker = new Faker({ locale: [ja, en] })

export const ShopFactory = factory
  .define(Shop, async ({}) => {
    return {
      status: faker.datatype.boolean(),
      name: faker.company.name(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      postalCode: faker.location.zipCode(),
      prefecture: faker.location.state(),
      city: faker.location.city(),
      street: faker.location.street(),
      buildingName: faker.location.buildingNumber(),
      shopUrl: faker.internet.url(),
      startDate: DateTime.fromJSDate(faker.date.past()),
      endDate: DateTime.fromJSDate(faker.date.future()),
      remarks: faker.lorem.text(),
    }
  })
  .build()
