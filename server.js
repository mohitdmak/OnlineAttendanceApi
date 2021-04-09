//Importing express app.
const app = require('./app')

//Importing mongoose and connection URI
const mongoose = require('mongoose');
//const Blog = require('./models/Blog.js');
const DBURI = require('./Config/mongoatlas');


//* mongoose settings for depraciation errors
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//* Configuring port
let port = process.env.PORT || 3000; 

//* Connecting to db and opening port for express app.
mongoose.connect(DBURI)
    .then((result) => {
        console.log('Database Connected');
        app.listen(port, () => console.log('App Listening on port.'));
    })
    .catch(err => console.log(err));

