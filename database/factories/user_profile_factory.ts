import factory from '@adonisjs/lucid/factories'
import UserProfile from '#models/user_profile'
import { UserFactory } from './user_factory.js'
import { DateTime } from 'luxon'
import { Faker, ja, en } from '@faker-js/faker'
const faker = new Faker({ locale: [ja, en] })

export const UserProfileFactory = factory
  .define(UserProfile, async ({}) => {
    return {
      userId: 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      aliasName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      postalCode: faker.location.zipCode(),
      prefecture: faker.location.state(),
      city: faker.location.city(),
      street: faker.location.street(),
      buildingName: faker.location.buildingNumber(),
      agreementUrl: faker.image.urlPicsumPhotos(),
      avatarUrl: faker.image.avatar(),
      account: faker.lorem.text(),
      remarks: faker.lorem.paragraph(),
      payment: faker.number.bigInt({ min: 100000n, max: 1000000n }),
      paymentUnit: faker.helpers.arrayElement([1, 2]),
      nomination: faker.number.bigInt({ min: 100000n, max: 1000000n }),
      nominationUnit: faker.helpers.arrayElement([1, 2]),
      bottleBack: faker.number.bigInt({ min: 100000n, max: 1000000n }),
      bottleBackUnit: faker.helpers.arrayElement([1, 2]),
      startDate: DateTime.fromJSDate(faker.date.past()),
      endDate: DateTime.fromJSDate(faker.date.future()),
    }
  })
  .relation('user', () => UserFactory)
  .build()
