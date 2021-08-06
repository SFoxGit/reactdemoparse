const { User } = require("../models");

const userData = [
  {
    username: 'MikeSmith',
    email: 'mikee@gmail.com',
    password: 'mike1234'
  },
  {
    name: 'StephenJones',
    email: 'steveo@gmail.com',
    password: 'steveo1234'
  },
  {
    name: 'MarkHoppus',
    email: 'Blink182@gmail.com',
    password: 'HiImMark182'
  },
  {
    name: 'KylePred',
    email: 'SheriffPred@gmail.com',
    password: 'LowT1234'
  }
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});
module.exports = seedUsers;