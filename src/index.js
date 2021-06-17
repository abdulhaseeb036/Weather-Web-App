const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
const hbs = require("hbs");


const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../src/templates/views");
const partials_path = path.join(__dirname, "../src/templates/partials");

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);
app.use(express.static(staticPath));

app.get("/", (req,res) => {
    res.render("index");
})
app.get("/about", (req,res) => {
    res.render("about");
})
app.get("/weather", (req,res) => {
    res.render("weather");
})

app.get("*", (req,res) => {
    res.render("404page", {
        errorMsg: "Oop's! Page does not found" 
    });
})

app.listen(port, () => {
    console.log(`listen from ${port} port`);
});
    