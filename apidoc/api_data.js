define({ "api": [
  {
    "type": "DELETE",
    "url": "/user",
    "title": "[Deletes user]",
    "name": "DELETE_User",
    "group": "Registered_User",
    "description": "<p>Deletes a registered user</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n \"message\": \"Successfully deleted\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "Error-Response:",
            "description": "<p>Username missing</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "Registered_User"
  },
  {
    "type": "DELETE",
    "url": "/fav",
    "title": "[Deletes photo from collection]",
    "name": "DELETE_favourite",
    "group": "Registered_User",
    "description": "<p>Deleting a photo from the favourites collection</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PhotoID",
            "description": "<p>not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "Registered_User"
  },
  {
    "type": "GET",
    "url": "/user",
    "title": "[Searches for user details]",
    "name": "GET_User",
    "group": "Registered_User",
    "description": "<p>Allows user to retrieve information about them</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n   \"_id\": \"584f416f88a0f83ac8aeb4bc\",\n   \"username\": \"alex\",\n   \"password\": \"football\",\n   \"__v\": 0\n }\n]",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "Registered_User"
  },
  {
    "type": "GET",
    "url": "/fav",
    "title": "[Gets list of favourite photos]",
    "name": "GET_favourites",
    "group": "Registered_User",
    "description": "<p>Retrieving user favourites</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"__v\": 0,\n \"username\": \"simon\",\n \"photoID\": \"30798394723\",\n \"location\": \"Birmingham\",\n \"_id\": \"584fc8c67ea28532a487e249\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Username/photoID/location missing\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "Registered_User"
  },
  {
    "type": "POST",
    "url": "/fav",
    "title": "[Adds favourite to collection]",
    "name": "POST_favourite",
    "group": "Registered_User",
    "description": "<p>Adding photo to favourites collection</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n \"__v\": 0,\n \"username\": \"simon\",\n \"photoID\": \"354548394723\",\n \"location\": \"Paris\",\n \"_id\": \"584fc9b27ea28532a487e24c\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Username/photoID/location missing\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "Registered_User"
  },
  {
    "type": "PUT",
    "url": "/user",
    "title": "[Updates user details]",
    "name": "PUT_user",
    "group": "Registered_User",
    "description": "<p>Updates user details</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"584f416f88a0f83ac8aeb4bc\",\n \"username\": \"simon\",\n \"password\": \"football\", <----- New Password\n \"__v\": 0\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Username/password missing\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "Registered_User"
  },
  {
    "type": "POST",
    "url": "/user",
    "title": "[Creates new user]",
    "name": "POST_User",
    "group": "User",
    "description": "<p>Create a new user</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"__v\": 0,\n \"username\": \"simon\",\n \"password\": \"$2a$10$zpJ.wYFyG8eTY2SbWukPFOrZ5/W.GcUdmxwkKTLihrcTPD8K/JH06\",\n \"_id\": \"584fc664b1ce23325d2b7568\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Missing password\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api",
    "title": "[Searches Flickr/Apixu for photo/weather]",
    "name": "Search_API",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "t",
            "description": "<p>Users tag</p>"
          }
        ]
      }
    },
    "description": "<p>Allows user to search for photos and find weather conditions</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"results\": {\n   \"apiURL\": \"https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=new york&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1\",\n  \"searchTag\": \"new york\",\n  \"numberOfPhotos\": \"1\",\n  \"photo_id\": \"31579020866\",\n  \"owner\": \"66430340@N07\",\n  \"title\": \"Barclays Center Arena - 20161213_0430\",\n  \"url\": \"http://farm1.staticflickr.com/767/31579020866_ef645376bb.jpg\",\n  \"requestStatus\": \"ok\"\n},\n\"data\": {\n\"ownerName\": \"Atlantic Yards Watch Web Cam 4\",\n \"photoTitle\": \"Barclays Center Arena - 20161213_0430\",\n  \"photoID\": \"31579020866\",\n  \"dateTaken\": \"2016-12-13\",\n  \"photoURL\": \"http://farm1.staticflickr.com/767/31579020866_ef645376bb.jpg\",\n  \"requestStatus\": \"ok\"\n},\n\"weather\": {\n   \"location\": \"New York\",\n   \"country\": \"United States of America\",\n   \"date\": \"2016-12-13\",\n   \"weatherCondition\": \"Overcast\",\n   \"weatherURL\": \"//cdn.apixu.com/weather/64x64/day/122.png\",\n   \"sunRise\": \"07:12 AM\",\n   \"sunSet\": \"04:29 PM\"\n }\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\"code\": 1003,\n \"message\": \"Location missing/no matching city/this key is only valid for 30 days only\",\n\"stat\": \"fail\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "index/index.js",
    "groupTitle": "user"
  }
] });
