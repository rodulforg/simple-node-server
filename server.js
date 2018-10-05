const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 80;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public '));
app.use( (req, res, next) => {
    var now = new Date().toString();
    // console.log(`${now}: ${req.method} ${req.url}`);
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n', (err) => {
        if(err){
            console.log("Error:", err);
        }
    });
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
      return new Date().getFullYear() +1;
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my beautiful page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitetle: 'Projects' 
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfil request'
    });
});

app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});