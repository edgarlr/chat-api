const Model = require('./model');
const { populate } = require('./model');

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save()
}

async function getMessage(filterUser) {
  return new Promise((resolve, reject) => {

    let filter = {};
    if (filterUser !== null) {
      filter = { user: filterUser }
    }
    Model.find(filter)
      .populate('user')
      .exec((err, populated) => {
        if (err) {
          reject(err)
          return false
        }
        resolve(populated)
      })
  })
}

async function updateText(id, message) {
  const foundMessage = await Model.findById(id)
  foundMessage.message = message;
  const newMessage = await foundMessage.save()

  return newMessage
}

function removeMessage(id) {
  return Model.findByIdAndDelete(id)
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
  remove: removeMessage
}