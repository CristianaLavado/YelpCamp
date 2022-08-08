const mongoose = require("mongoose");
const Review = require("./review");
const opts = { toJSON: {virtuals:true}};

const { Schema } = mongoose;

const ImageSchema = new Schema({
    url: String,
    finelame: String
});

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});


const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry:{
        type: {
            type: String,
            enum: ["Point"],
            required:true
        },
        coordinates: {
            type: [Number],
            required:true
        },
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return `<div><h4 class="mb-2"><a href="/campgrounds/${this._id}">${this.title}</a></h4><p class="mb-1">${this.location}</p><p>$${this.price}</p></div>`
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

const Campground = mongoose.model("Campground", CampgroundSchema);

module.exports = Campground;