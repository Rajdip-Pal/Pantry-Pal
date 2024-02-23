const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./db/conn");

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

app.get("/register", (req, res) => {
    res.render("register")
});

app.get("/thanksContributing", (req, res) => {
    res.render("thanksContributing")
});

app.get("/thanksJoining", (req, res) => {
    res.render("thanksJoining")
});

app.get("/register", (req, res) => {
    res.render("register")
});

app.post("/contribute", async (req, res) => {
    try {
        const Contributors = require("./models/contributors");
        const register1 = new Contributors({
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

        const registered1 = await register1.save();
        console.log("Done!");
        res.render("/thanksContributing")
    } catch (error) {
        res.send("An Error Occureed. Please Try Again!");
    }
})

app.post("/register", async (req, res) => {
    try {
        const Registers = require("./models/registers");
        const register2 = new Registers({
            name : req.body.name,
            email : req.body.email,
            username : req.body.username,
            phone : req.body.phone,
            address : req.body.address,
            city : req.body.city,
            district : req.body.district,
            state : req.body.state,
            pincode : req.body.pincode,
            country : req.body.country,
        });

        const registered2 = await register2.save();
        console.log("Done!");
        res.render("/thanksJoining");
    } catch (error) {
        res.send("An Error Occureed. Please Try Again!");
    }
})

app.listen(port, () => {
    console.log(`server is running at ${port}`)
});