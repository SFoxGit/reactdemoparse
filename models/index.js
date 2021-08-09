const User = require("./User");
const Collection = require('./Collection')
const Match = require('./Match')

User.hasMany(Collection, {
  foreignKey: "owner"
})
Collection.belongsTo(User, {
  foreignKey: "owner"
})
Collection.hasMany(Match, {
  foreignKey: "collection_id"
})
Match.belongsTo(Collection, {
  foreignKey: "collection_id"
})

module.exports = {User, Collection, Match};