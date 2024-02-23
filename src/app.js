const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./db/conn");
const Contributors = require("./models/contributors");
const Registers = require("./models/registers");

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "palpantry7@gmail.com",
        pass: "tvvv xism cozl egfg",
    },
});

const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get("/thanksContributing", (req, res) => {
    res.render("thanksContributing");
});

app.get("/thanksJoining", (req, res) => {
    res.render("thanksJoining");
});

app.get("/notAvailable", (req, res) => {
    res.render("notAvailable");
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

app.get("/register", (req, res) => {
    res.render("register")
});

app.post("/contribute", async (req, res) => {
    try {
        const pincode = req.body.pincode;
        const district = req.body.district;
        const findPIN = await Registers.find({ pincode: pincode });
        const findDIST = await Registers.find({ district: district });

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const country = req.body.country;
        const dateOfDonation = req.body.dateOfDonation;
        const timeOfDay = req.body.timeOfDay;
        const whatToDonate = req.body.whatToDonate;
        
        let htmlText = `<ol>
            <li>Name: ${firstName} ${lastName}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
            <li>Address: ${address}</li>
            <li>City: ${city}</li>
            <li>Pincode: ${pincode}</li>
            <li>District: ${district}</li>
            <li>State: ${state}</li>
            <li>Country: ${country}</li>
            <li>Date: ${dateOfDonation}</li>
            <li>Time: ${timeOfDay}</li>
            <li>Meal: ${whatToDonate}</li>
        </ol>`;

        if (findPIN.length != 0) {

            for (let index = 0; index < findPIN.length; index++) {
                console.log(findPIN[index].email);

                async function main() {
                    const info = await transporter.sendMail({
                        from: '"Pantry Pals" <palpantry7@gmail.com>',
                        to: findPIN[index].email,
                        subject: "New contributor registered.",
                        html: htmlText,
                    });
                    
                    console.log("Message sent: %s", info.messageId);
                }
                main().catch(console.error);
                console.log(findPIN);

                const register1 = new Contributors({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    district: req.body.district,
                    state: req.body.state,
                    pincode: req.body.pincode,
                    country: req.body.country,
                    dateOfDonation: req.body.dateOfDonation,
                    timeOfDay: req.body.timeOfDay,
                    whatToDonate: req.body.whatToDonate
                });
        
                const registered1 = await register1.save();
                console.log("Done!");
                res.render("thanksContributing");
            }
        }
        else if (findDIST.length != 0) {
            for (let index = 0; index < findDIST.length; index++) {
                console.log(findDIST[index].email);

                async function main() {
                    const info = await transporter.sendMail({
                        from: '"Pantry Pals" <palpantry7@gmail.com>',
                        to: findDIST[index].email,
                        subject: "New contributor registered.",
                        html: htmlText,
                    });
                    
                    console.log("Message sent: %s", info.messageId);
                }
                main().catch(console.error);
            }
            console.log(findDIST);

            const register1 = new Contributors({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                district: req.body.district,
                state: req.body.state,
                pincode: req.body.pincode,
                country: req.body.country,
                dateOfDonation: req.body.dateOfDonation,
                timeOfDay: req.body.timeOfDay,
                whatToDonate: req.body.whatToDonate
            });
    
            const registered1 = await register1.save();
            console.log("Done!");
            res.render("thanksContributing");
        }
        else {
            res.render("notAvailable");
        }
                
    } catch (error) {
        console.log(error);
        res.send("An Error Occureed. Please Try Again!");
    }
})

app.post("/register", async (req, res) => {
    try {
        const register2 = new Registers({
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            district: req.body.district,
            state: req.body.state,
            pincode: req.body.pincode,
            country: req.body.country,
        });

        const registered2 = await register2.save();
        console.log("Done!");
        res.render("thanksJoining");
    } catch (error) {
        console.log(error);
        res.send("An Error Occureed. Please Try Again!");
    }
})

app.listen(port, () => {
    console.log(`server is running at ${port}`)
});