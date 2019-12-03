// External dependencies
const express = require('express')
const router = express.Router()
const config = require('./config')

router.use('/sprint([0-9]+)', (req, res, next) => {
  require(`./assets/config/sprint${req.params[0]}/routes`)(req, res, next)
})

function getSprintChangelogs(dir, filelist) {
  var fs = fs || require('fs')
  var files = fs.readdirSync(dir)
  filelist = filelist || []

  files.forEach(function(file) {
    if (file !== '_admin' && fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = getSprintChangelogs(dir + '/' + file, filelist)
    } else {
      if (
        dir.indexOf('sprint') !== -1 &&
        file.indexOf('changelog.md') !== -1
      ) {
        var data = fs.readFileSync(dir + '/' + file, 'utf8')
        var sprintName = dir.replace('./app/assets/config/', '')
        filelist.push({ sprintName: sprintName, data: data })
      }
    }
  })

  return filelist
}

// Route index page
router.get('/', function(req, res) {
  res.render('index')
})

router.get('/sprintindex', function(req, res) {
  var changelogs = getSprintChangelogs('./app/assets/config')
  res.render('sprintindex', { changelog: changelogs })
})

router.get('/current/*', function(req, res, next) {
  var r = req.url.replace('/current/', '/' + config.currentSprint + '/')
  res.redirect(r)
})

/* catch-all routes */
router.get('*', function(req, res, next) {
  getMessages(res)
})

// GENERIC NEXT PAGE ELEMENT
router.post('*', function(req, res, next) {
  // console.log('main routes')
  if (req.body['next-page']) {
    res.redirect(req.body['next-page'])
  } else if (req.body) {
    for (var propName in req.body) {
      if (req.body.hasOwnProperty(propName)) {
        eval('req.session.' + propName + ' = req.body.' + propName)
      }
    }
    next()
  } else {
    next()
  }
})

module.exports = router
