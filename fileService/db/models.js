const { Model, DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

class Document extends Model {}

class File extends Model {}

Document.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'Document'
})

File.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  name: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.BLOB('long')
  },
  document: {
    type: DataTypes.INTEGER,
    references: {
      model: Document,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'File'
})

Document.hasMany(File, { as: 'files', foreignKey: 'document' })
File.belongsTo(Document)

module.exports = sequelize
