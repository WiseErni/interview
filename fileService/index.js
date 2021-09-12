const http = require('http')
const formidable = require('formidable')
const sequelize = require('./db/models.js')

const hostname = '127.0.0.1'
const port = 3420

const _loadModel = async function (id) {
  return await sequelize.models.Document.findOne({
    where: { id },
    include: {
      model: sequelize.models.File,
      as: 'files'
    }
  })
}

const _saveModel = async function ({ id, files = [] }) {
  const _fArray = []
  for (let name of Object.keys(files)) {
    _fArray.push({
      name: files[name].name,
      content: files[name],
      document: id
    })
  }

  return await sequelize.models.File.bulkCreate(_fArray)
}

const server = http.createServer(async (req, res) => {
  const { url, method } = req
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  const _checkId = url.match(/(?<=\/document\/)(\d*)/i) || []
  const docId = _checkId[0]
  if (docId) {
    if (method === 'GET') {
      const record = await _loadModel(docId)

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

        await _saveModel({ id: docId, files })
        res.statusCode = 200
        res.end()
      })
      // const _filesChunks = []
      // console.debug(req.body)
      // req.on('data', function (chunk) {
      //   _filesChunks.push(chunk)
      // })
      // req.on('end', async function () {
      //   console.debug(Buffer.concat(_filesChunks))
      //
      //
      //
      //
      //
      // })
    } else {
      res.statusCode = 405
      res.end()
    }
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
