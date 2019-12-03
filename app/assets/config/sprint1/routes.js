// External dependencies
const express = require('express')
const router = express.Router()
const config = require('../../../config')

let sprintName = 'sprint1'

function checkSprint(res) {
  res.locals['isCurrentSprint'] = true
  res.locals['viewingSprint'] = sprintName
  res.locals['currentSprint'] = config.currentSprint
  if (sprintName !== config.currentSprint) {
    res.locals['isCurrentSprint'] = false
  }
}

router.get('/current/*', function(req, res, next) {
  var r = req.url.replace('/current/', '/' + config.currentSprint + '/')
  res.redirect(r)
})

router.get('/admin/pages', function(req, res) {
  checkSprint(res)
  var list = getFileList('./app/views/' + sprintName, null, true)
  res.render(sprintName + '/_admin/index', {
    pages: list,
  })
})

// GENERIC NEXT PAGE ELEMENT
router.post('*', function (req, res, next) {
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

module.exports = router;
