const Model = require('./model');

async function listUsers() {
  return Model.find()
}

function addUser(user) {
  const myUser = new Model(user)
  return myUser.save()
}

module.exports = {
  add: addUser,
  list: listUsers
};
