# Full functional URL-Shorter

A quick and easy way to send short URLs to friends.

This was just a quick one day build to try something new. It is not optimized for heavy load nor for performance. I did't even register a URL yet. Was just a fun porject.

---

## Status 🔃

### Backend
The backend is fully functional. It uses nodejs and a sql-lite DB. The goal was to create a easy to deploy app. For more complex goals use MongoDB or MySQL.

### FrontEnd 🎁
NON existent. Feel free to create a FrontEnd. API is accessible for everyone. Use PostMan to test API requests

## API

### Create URL
Create a POST request to `[BASEURL] with the following content in body:
```JSON
{
    "name": "myURL",                    #Optional
    "url": "https://www.google.de"      #Requierd
}
```

### Go to URL
The`[BASEURL]/mySHORT` redirects you to the dst URL or shows a Err-Page.

## TODO 🛠
FrontEnd

----

## [DEMO](https://lazy-url.herokuapp.com/)