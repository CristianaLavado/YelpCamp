const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers")

main().catch(err => {
    console.log(err);
    console.log("MONGO CONNECTION ERROR")
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("MONGO Connected!")
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/crisyelpcamp/image/upload/v1659520548/YelpCamp/vkrg2zzpqg3ujnmbq1is.jpg',
                    filename: 'YelpCamp/vkrg2zzpqg3ujnmbq1is'
                },
                {
                    url: 'https://res.cloudinary.com/crisyelpcamp/image/upload/v1659521699/YelpCamp/m8lmqfktbgxaatb6tckf.jpg',
                    filename: 'YelpCamp/m8lmqfktbgxaatb6tckf'
                }
            ],
            geometry:{
                type:"Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
            ]
            },
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae placeat nisi laboriosam quos cupiditate dolores ducimus? Ea sequi corporis assumenda adipisci nesciunt quibusdam hic rerum illo aspernatur laudantium. Quidem, in.Ab quidem dolor facere. Magni illo alias dolorem necessitatibus pariatur, minima soluta maiores rerum quam? Quidem saepe quia numquam repellat, exercitationem ea doloribus fugiat consequatur. Animi nihil molestias nobis qui?",
            price: price,
            author: "62e7e254c7c8648ed5454d3e"
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})