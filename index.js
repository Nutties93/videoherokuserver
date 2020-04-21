const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const cors = require('cors');

var app = express();

// app.use(cors);
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
  

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

// This value can be stored in an ecrypted place like Azure Key Vault.
var  apiKey = '46688592';
const apiSecret = 'af3d6b6c800d665f6a56f8e36474a5714f59220c';

var OpenTok = require('opentok'),
    opentok = new OpenTok(apiKey, apiSecret);


// Set up webhook endpoint for front end to call! 
// Creates a new session when called! Front end needs to check if there's an existing sessionId. T
// This can be done through cookies encryption, react context or redux state management
app.get('/session', function(req, res, next) {
    var sessionId = "";
    var token = " "
    // Create a session
    opentok.createSession(function(err, session) {
    if (err) return console.log(err);
        sessionId = session.sessionId;

        //session.generateToken() needs to be inside of opentok! Initializing it as a new obj throws in an error
        token = session.generateToken({
          role :                   'moderator',
          expireTime :             (new Date().getTime() / 1000)+(1 * 60 * 60), // 1 day
          data :                   'name=Johnny',
          initialLayoutClassList : ['focus']
        });

      /* Create token and return all required values to client  */
      if (token) {
          res.json({ currentToken: token, currentSessionId: sessionId, apiKey:  apiKey });
          console.log(token,apiKey,sessionId)
          //res.send({ currentToken: token, currentSessionId: sessionId, apiKey:  apiKey });
      } else {
          console.log(" Error occurred when generating token using session Id")
          res.json({ currentToken: "", currentsessionId: ""  })
          //res.send({ currentToken: "", currentsessionId: ""  })
      }
    });
  });


  /* STEP 4
  Parse incoming events - configure your Session Monitoring url in TKBX dashboard... Inspect the events!
  */
  app.get('/events', function(req, res, next) {
    console.log("EVENT CALLBACK: ",JSON.stringify(req.body));
    res.json({ incomingevents: JSON.stringify(req.body) })
  });
  
  
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

