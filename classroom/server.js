const express = require('express');
const app= express();
const session= require('express-session');
const sessionOptions={secret:"mysupersecretstring", resave: false, saveUninitialized: true };
const flash=require('connect-flash');
const path= require('path');

app.use(session(sessionOptions));
app.use(flash());
app.set("view engine","ejs");
app.set(("views",path.join(__dirname,"views")));

//middleware for flash message
app.use((req,res,next)=>{
    res.locals.successMessage = req.flash("success");
    res.locals.errorMessage = req.flash("failure");
    next();
});


app.get("/register",(req,res)=>{
    let { name="annonymous" } = req.query;
    req.session.name=name;
    console.log(req.session);
    if(name==='annonymous'){
        req.flash("failure","user not registered");
    }
    else{
        req.flash("success","user registered successfully");
    }
    
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    
   res.render("page.ejs",{name:req.session.name});
});


// app.get("/reqcount",(req,res)=>{
//   if(req.session.count)
//   {
//     req.session.count++;
//   }
//   else{
//     req.session.count=1;
//   }
//   res.send(`you have started the seesion ${req.session.count} times`);
// });



app.listen(3000,()=>{
    console.log("server is listening to 3000");
})