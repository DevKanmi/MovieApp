const mongoose = require('mongoose')
const {Schema ,model} =mongoose

const movieDbSchema = new Schema({
    title:{
        type: String,
        required:[true, 'Name of Movie is required']
    },

    releaseYear : {
        type: Number,
        required: [true, 'a release Year is required']
    },
    genre: {
        type: String,
        required: [true , 'The genre is Required']
    },
    
    ratings: {
        imdb: {
            type: Number,
            required: [true, 'IMDb rating is required']
        },
        rottenTomatoes: {
            type: Number,
            required: [true, 'Rotten Tomatoes rating is required']
        }
    },
    cast: [{
        type: String,
    }],
    boxoffice:{
        type: Number
    }
    
})

movieDbSchema.set('toJSON',{
    transform: (document, requestedObject)=>{
        requestedObject.id = requestedObject._id.toString()
        delete requestedObject._id
        delete requestedObject.__v
    }
})
const Movies = model('Movies', movieDbSchema)

module.exports = Movies