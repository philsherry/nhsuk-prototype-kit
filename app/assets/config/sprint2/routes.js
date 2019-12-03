// External dependencies
const express = require('express')
const router = express.Router()
const config = require('../../../config')

let sprintName = 'sprint2'

function checkSprint(res) {
  res.locals['isCurrentSprint'] = true
  res.locals['viewingSprint'] = sprintName
  res.locals['currentSprint'] = config.currentSprint
  if (sprintName !== config.currentSprint) {
    res.locals['isCurrentSprint'] = false
  }
}

function getMessages(res) {
  var fs = require('fs')
  var data = fs.readFileSync(
    `./app/assets/config/${sprintName}/messages-en`,
    'utf8'
  )
  var lines = data.split('\n')
  lines.forEach(function(line) {
    var thisLine = line.split('=')
    if (thisLine.length > 1) {
      var messageKey = thisLine[0].trim()
      var messageVal = thisLine[1].trim()
      res.locals[messageKey] = messageVal
    }
  })
}

function getFileList(dir, filelist, drillDown) {
  var fs = fs || require('fs'),
    files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(function(file) {
    if (file !== '_admin' && fs.statSync(dir + '/' + file).isDirectory()) {
      if (drillDown) {
        filelist = getFileList(dir + '/' + file, filelist, drillDown)
      }
    } else {
      if (file.indexOf('.htm') > 0) {
        filelist.push(
          (dir + '/' + file).replace('./app/views/' + sprintName + '/', '')
        )
      }
    }
  })

  return filelist
}

router.get('/sprint([0-9]+)/prototyping', (req, res, next) => {
  checkSprint(res)
  getMessages(res)
  let changelogs = getSprintChangelogs('./app/assets/config')
  res.render('prototyping', { changelog: changelogs })
})

router.get('/current/*', function(req, res, next) {
  var r = req.url.replace('/current/', '/' + config.currentSprint + '/')
  res.redirect(r)
})

router.get('/admin/pages', function(req, res) {
  checkSprint(res)
  getMessages(res)
  var list = getFileList('./app/views/' + sprintName, null, true)
  res.render(sprintName + '/_admin/index', {
    pages: list,
  })
})

const playlistPrototyping = require('./playlists/prototyping')
const playlistBranchingAndRouting = require('./playlists/better-branching-and-routing')

router.get('/admin/prototyping', function(req, res) {
  checkSprint(res)
  getMessages(res)
  var list = getFileList(
    './app/views/' + sprintName + '/' + playlistPrototyping.directory,
    null,
    true
  )
  res.render(sprintName + '/_admin/pages', {
    pages: list,
    playlist: playlistPrototyping.playlist,
    playlistDir: playlistPrototyping.directory + '/',
    title: 'Prototyping'
  })
})

router.get('/admin/better-branching-and-routing', function(req, res) {
  checkSprint(res)
  getMessages(res)
  var list = getFileList(
    './app/views/' + sprintName + '/' + playlistBranchingAndRouting.directory,
    null,
    true
  )
  res.render(sprintName + '/_admin/pages', {
    pages: list,
    playlist: playlistBranchingAndRouting.playlist,
    playlistDir: playlistBranchingAndRouting.directory + '/',
    title: 'Better branching and routing'
  })
})

/* catch-all routes */
router.get('*', function(req, res, next) {
  checkSprint(res)
  getMessages(res)
  // handle state views on a page
  var state = req.query.state

  // handles custom errors - these can be set using the session variable customErrors before redirecting back to an input screen
  // uses pathname rather than req.url to avoid issues with querystrings
  if (req.session.data['customErrors']) {
    var errors = req.session.data['customErrors']
    req.session.data['customErrors'] = null
    res.render(sprintName + req._parsedUrl.pathname, {
      errors: errors,
      state: state,
    })
  } else {
    res.render(sprintName + req._parsedUrl.pathname, {
      state: state,
    })
  }
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
