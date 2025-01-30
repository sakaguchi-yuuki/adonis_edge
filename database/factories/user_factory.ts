import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import Shops from '#enums/shops'
import Roles from '#enums/roles'
import Positions from '#enums/positions'
import { UserProfileFactory } from './user_profile_factory.js'
import { Faker, ja, en } from '@faker-js/faker'
const faker = new Faker({ locale: [ja, en] })

export const UserFactory = factory
  .define(User, async ({}) => {
    return {
      status: faker.datatype.boolean(),
      shopId: Shops.DEFAULT,
      roleId: Roles.USER,
      positionId: Positions.CAST,
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('profile', () => UserProfileFactory)
  .build()
