const mongoose = require('mongoose');
const cities = require('./cities');
const {
    places,
    descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Datebase connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5feffb0880e8d539b4492066',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet excepturi aperiam earum quis exercitationem non beatae totam neque corrupti natus assumenda odit provident officia, laboriosam sit, animi cum dignissimos repudiandae.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url:'https://res.cloudinary.com/sao7/image/upload/v1609809475/YelpCamp/landview.jpg',
                    filename:'YelpCamp/landview'
                },
                {
                    url:'https://res.cloudinary.com/sao7/image/upload/v1609680409/YelpCamp/winter.jpg',
                    filename:'YelpCamp/winter'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})