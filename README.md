# Video Project Server



## Running Locally
```
npm install
 npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

You can use ngrok application to expose your local server to the public internet.

## Code lies in index.js
I have exposed a single API endpoint that calls opentok's api synchronously.

1) Creates a session and grabs the session Id.
2) Creates a token using session Id. (role: moderator, expireTime: 1hr)
3) Monitoring incoming events. (/events)


For convenience sake, I have uploaded the backend to heroku. No more ngrok. 
You can just read this code for your reference.
