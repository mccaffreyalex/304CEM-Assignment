'use strict'
const flickr = require('./flickr-request')
const flickrInfo = require('./flickr-info')
const weather = require('./weather-request')

///takes user location and puts into flickr api
///waits for response, uses photo_id to search flickrInfo api
///waits for response, takes date from flickrInfo and puts into weather api alongside location from step 1



//returns all results in one page
