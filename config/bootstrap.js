/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  //encode password
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  const hash = await sails.bcrypt.hash('123456', saltRounds);

  //username and password
  if (await User.count() > 0) {
    return;
  }
  await User.createEach([
    { username: "admin", password: hash, role: "Admin"},
    { username: "client", password: hash, role: "Client"},
    { username: "client2", password: hash, role: "Client"},
  ]);

  if (await HOUSE.count() > 0) {
    return;
  }

  await HOUSE.createEach([
    {
      "name": "酒带泳池豪宅",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 4,
      "GrossArea": 3,
      "Tenants": 1,
      "Rent": 20000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "沙田第一城环境优美宅",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 2,
      "GrossArea": 5,
      "Tenants": 6,
      "Rent": 13000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "沙田中心精装修洋房",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "Shatin Centre",
      "BedroomsNumber": 4,
      "GrossArea": 3,
      "Tenants": 1,
      "Rent": 15000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "超大客厅",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "Shatin Centre",
      "BedroomsNumber": 6,
      "GrossArea": 4,
      "Tenants": 8,
      "Rent": 20000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "环境优美临水房",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 1,
      "GrossArea": 6,
      "Tenants": 1,
      "Rent": 30000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "高端小区",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 6,
      "GrossArea": 2,
      "Tenants": 6,
      "Rent": 30000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "风景优美",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 4,
      "GrossArea": 3,
      "Tenants": 1,
      "Rent": 10000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "地铁口，学区房",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 4,
      "GrossArea": 3,
      "Tenants": 1,
      "Rent": 50000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "近邻市中心",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 4,
      "GrossArea": 3,
      "Tenants": 1,
      "Rent": 30000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "安静祥和",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 1,
      "GrossArea": 3,
      "Tenants": 1,
      "Rent": 13000,
      "HighLighted": 'TRUE'
    },
    {
      "name": "自带空调家电",
      "ImageURL": "http://hkis.centanet.com/p/C7DkaCfkPllCnn1GLatUwDUICdsJ2wtb.jpg",
      "Estate": "City One Shatin",
      "BedroomsNumber": 1,
      "GrossArea": 3,
      "Tenants": 2,
      "Rent": 14000,
      "HighLighted": 'TRUE'
    },


  ]);
};
