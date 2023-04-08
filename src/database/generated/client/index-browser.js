
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.11.0
 * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
 */
Prisma.prismaVersion = {
  client: "4.11.0",
  engine: "8fde8fef4033376662cad983758335009d522acb"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.ClauTestScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid'
});

exports.Prisma.ImagesScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  key: 'key',
  url: 'url',
  clipped_key: 'clipped_key',
  clipped_url: 'clipped_url',
  item_ids: 'item_ids'
});

exports.Prisma.InventoriesScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  name: 'name',
  description: 'description',
  item_iventory_ids: 'item_iventory_ids',
  store_ids: 'store_ids'
});

exports.Prisma.Item_inventoriesScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  item_id: 'item_id',
  type: 'type',
  value: 'value',
  iventory_ids: 'iventory_ids'
});

exports.Prisma.Item_ordersScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  item_id: 'item_id',
  type: 'type',
  value: 'value',
  order_ids: 'order_ids'
});

exports.Prisma.ItemsScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  name: 'name',
  description: 'description',
  tags: 'tags',
  image_ids: 'image_ids'
});

exports.Prisma.LocationsScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  name: 'name',
  latitude: 'latitude',
  longitude: 'longitude',
  user_ids: 'user_ids',
  organizations_ids: 'organizations_ids',
  store_ids: 'store_ids'
});

exports.Prisma.OdersScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  total: 'total',
  item_order_ids: 'item_order_ids'
});

exports.Prisma.OrganizationsScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  username: 'username',
  name: 'name',
  image_id: 'image_id',
  platform_ids: 'platform_ids',
  user_ids: 'user_ids',
  location_ids: 'location_ids'
});

exports.Prisma.PaymentAccountScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid'
});

exports.Prisma.PaymentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  title: 'title',
  description: 'description',
  payment_type_id: 'payment_type_id',
  user_creator_id: 'user_creator_id',
  user_confirm_id: 'user_confirm_id',
  receiver_account_id: 'receiver_account_id',
  sender_account_id: 'sender_account_id'
});

exports.Prisma.PaymentTypeScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  title: 'title',
  description: 'description'
});

exports.Prisma.PlatformsScalarFieldEnum = makeEnum({
  id: 'id',
  uuid: 'uuid',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  key: 'key',
  username: 'username',
  name: 'name',
  image_id: 'image_id',
  provider_ids: 'provider_ids',
  provider_key_ids: 'provider_key_ids',
  user_ids: 'user_ids',
  organization_ids: 'organization_ids'
});

exports.Prisma.Provider_keysScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  public_key: 'public_key',
  private_key: 'private_key',
  secret: 'secret',
  description: 'description',
  provider_id: 'provider_id',
  platform_ids: 'platform_ids'
});

exports.Prisma.ProvidersScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  key: 'key',
  name: 'name',
  image_id: 'image_id',
  platform_ids: 'platform_ids',
  provider_key_ids: 'provider_key_ids'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SessionsScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  jwt: 'jwt',
  user_uuid: 'user_uuid',
  user_id: 'user_id'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.StoresScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  username: 'username',
  name: 'name',
  image_id: 'image_id',
  user_ids: 'user_ids',
  location_ids: 'location_ids',
  inventory_ids: 'inventory_ids'
});

exports.Prisma.UsersScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  username: 'username',
  email: 'email',
  phone: 'phone',
  name: 'name',
  birthDate: 'birthDate',
  gender: 'gender',
  image_id: 'image_id',
  prefered_location_id: 'prefered_location_id',
  location_ids: 'location_ids',
  platform_ids: 'platform_ids',
  organization_ids: 'organization_ids',
  store_ids: 'store_ids'
});
exports.CurrencyType = makeEnum({
  MXN: 'MXN',
  USD: 'USD',
  CLAU_CREDIT: 'CLAU_CREDIT'
});

exports.GenderType = makeEnum({
  MALE: 'MALE',
  FEMALE: 'FEMALE'
});

exports.ItemQualitativeType = makeEnum({
  UNITY: 'UNITY',
  GRAM: 'GRAM'
});

exports.Prisma.ModelName = makeEnum({
  platforms: 'platforms',
  providers: 'providers',
  provider_keys: 'provider_keys',
  users: 'users',
  organizations: 'organizations',
  stores: 'stores',
  inventories: 'inventories',
  item_inventories: 'item_inventories',
  oders: 'oders',
  item_orders: 'item_orders',
  PaymentType: 'PaymentType',
  payment: 'payment',
  PaymentAccount: 'PaymentAccount',
  items: 'items',
  locations: 'locations',
  sessions: 'sessions',
  images: 'images',
  ClauTest: 'ClauTest'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
