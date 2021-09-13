const http = require('http')
const formidable = require('formidable')
const sequelize = require('./db/models.js')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3420

async function _loadDocument (id) {
  return await sequelize.models.Document.findOne({
    where: { id },
    include: {
      model: sequelize.models.File,
      as: 'files'
    }
  })
}

async function _loadFile (fileId) {
  return await sequelize.models.File.findOne({
    where: { id: fileId }
  })
}

const _saveFiles = async function ({ id, files = {} }) {
  const _compileFiles = new Promise(async (resolve) => {
    const _fArray = []

    for (let name of Object.keys(files)) {
      let chunks = ''
      const read = fs.createReadStream(files[name].path)
      const _readPromise = new Promise(resolve => {
        read.on('data', (chunk) => {
          chunks += chunk
        })
        read.on('end', () => {
          resolve()
        })
      })
      await _readPromise
      _fArray.push({
        name: files[name].name,
        size: files[name].size,
        content: Buffer.from(chunks),
        type: files[name].type,
        document: id
      })
    }
    resolve(_fArray)
  })
  const _files = await _compileFiles

  await sequelize.models.File.destroy({where: { document: id }})
  return await sequelize.models.File.bulkCreate(_files)
}

async function processDoc (req, res, method, docId) {
  if (method === 'GET') {
    const record = await _loadDocument(docId)
    if (record) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/json')

      res.end(JSON.stringify(record))
    } else {
      res.statusCode = 404
      res.end()
    }
  } else if (method === 'POST') {
    const form = new formidable.IncomingForm()

    form.parse(req, async function (err, fields, files ) {
      if (err) {
        res.statusCode = 500
        res.end()
      }

      await _saveFiles({ id: docId, files })
      res.statusCode = 200
      res.end()
    })
  } else {
    res.statusCode = 405
    res.end()
  }
}

async function processFile (req, res, method, fileId) {
  if (method === 'GET') {
    const file = await _loadFile(fileId)
    if (file) {
      res.body = file.content
      res.setHeader('cache-Control', 'no-cache')
      res.setHeader('content-disposition', `attachment; filename=${encodeURI(file.name)}`)
      res.setHeader('content-type', file.type)
      res.statusCode = 200
      res.end(file.content)
    } else {
      res.statusCode = 404
      res.end()
    }
  } else {
    res.statusCode = 405
    res.end()
  }
}

const server = http.createServer(async (req, res) => {
  const { url, method } = req
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  const _checkId = url.match(/(?<=\/document\/)(\d*)/i) || []
  const _checkFileId = url.match(/(?<=\/file\/)([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i) || []
  const docId = _checkId[0]
  const fileId = _checkFileId[0]
  if (docId) {
    await processDoc(req, res, method, docId)
  } else if (fileId) {
    await processFile(req, res, method, fileId)
  } else {
    res.statusCode = 404
    res.end()
  }
})

sequelize.sync().then(async () => {
  await sequelize.models.Document.create({ id: 1 })
  server.listen(port, hostname, () => {
    console.log(`Data service started at http://${hostname}:${port}/`)
  })
}).catch(e => console.error(e))
