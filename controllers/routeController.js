//The event handlers of routes are commonly referred to as controllers

//Import Models
const Movies = require('../models/movieSchema') 
const{StatusCodes} = require('http-status-codes')

const createMovie = async(request, response) =>{
    const {title, releaseYear, genre, ratings, cast, boxoffice} = request.body
    try{
        const movie = new Movies({
            title,
            releaseYear,
            genre,
            ratings,
            cast,
            boxoffice
        })
        const savedMovie = await movie.save()
        console.log(movie)

        return response.status(StatusCodes.CREATED).json(savedMovie)
    }
    catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Something Went wrong"})
    }
}

const getAllMovies = async (req,res) => {
    try {
        const movie  = await Movies.find({})
        if(!movie) return res.status(StatusCodes.BAD_REQUEST).send("No movie available")
        console.log(movie)
        return res.status(StatusCodes.OK).json(movie)
        
    }   
    catch (error) {
        console.error('Error fetching data:', error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error')
    }
}

const deleteMovie = async(request, response) =>{
    const id = request.params.id
    try{
        const movie = await Movies.findByIdAndDelete(id)
        if(!movie) return response.status(StatusCodes.BAD_REQUEST).json({error:"No Movie was found"})
        
        return response.status(204).end()
    }
    catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Something Went Wrong."})
    }

}


const getAMovie = async(request, response) =>{
    const id = request.params.id
    try{
        const movie = await Movies.findOne({_id: id})
        if(!movie) return response.status(StatusCodes.BAD_REQUEST).json({error: "Movies could not be found"})
        
        response.status(StatusCodes.OK).json({
            message: `${movie.title} was found`,
            movie
        })
    }
    catch(error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Something went wrong"})
    }
}


module.exports = {
    createMovie,
    getAllMovies,
    deleteMovie,
    getAMovie
}