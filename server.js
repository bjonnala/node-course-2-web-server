const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // partial views (handlebars)
app.set('view-engine','hbs');






app.use((req,res,next)=>{ // filter before any request method executes
  // log requests
  var now = new Date().toString();
  var log = now + ':' + req.method + req.url;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if (err) {
    console.log('Data was appended to file!');
    }
  });
  next();
});


// If next() is not called, express middleware will end. 
/*app.use((req,res)=>{
    res.render('maintainence.hbs');
});*/

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
}); // handlers helpers

hbs.registerHelper('screamIt',(text)=>
{
   return text.toUpperCase();
})

app.get('/',(request,response)=>{
    //response.send('<h1>Hello express !<h2>');
   /* response.send({
        name:'Raghu',
        likes:[
            'biking',
            'eating'
        ]
    });*/
    response.render('home.hbs',{
        pageTitle:'Home page',
        Welcomemessage:'Welcome to node.js'
    })
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageTitle:'About page'
    });
});


app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    });
})


app.listen(3000,()=>{
    console.log("Server is up on port 3000");
});