const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./db/conn");
const Register = require("./models/registers");

const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/index", (req, res) => {
    res.render("index")
});

app.get("/contribute", (req, res) => {
    res.render("contribute")
});

app.get("/contactus", (req, res) => {
    res.render("contactus")
});

app.get("/aboutus", (req, res) => {
    res.render("aboutus")
});

app.post("/contribute", async (req, res) => {
    try {
        const time = req.body.timeOfDay;
        const registerProfile = new Register({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            username : req.body.username,
            phone : req.body.phone,
            address : req.body.address,
            city : req.body.city,
            district : req.body.district,
            state : req.body.state,
            pincode : req.body.pincode,
            country : req.body.country,
            dateOfDonation : req.body.dateOfDonation,
            timeOfDay : req.body.timeOfDay,
            whatToDonate : req.body.whatToDonate
        });

        const registered = await registerProfile.save();
        console.log("Done!");
        res.send('Thank you for contributing.');
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at ${port}`)
});