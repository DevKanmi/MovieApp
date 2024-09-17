//The event handlers of routes are commonly referred to as controllers

//Import Models
const Movies = require('../models/movieSchema') 

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

        return response.status(201).json(savedMovie)
    }
    catch(error){
        response.status(500).json({error: "Something Went wrong"})
    }
}

const getAllMovies = async (req,res) => {
    try {
        const movie  = await Movies.find({})
        if(!movie) return res.status(404).send("No movie available")
        console.log(movie)
        return res.status(200).json(movie)
        
    }   
    catch (error) {
        console.error('Error fetching data:', error)
        res.status(500).send('Internal Server Error')
    }
}

const deleteMovie = async(request, response) =>{
    const id = request.params.id
    try{
        const movie = await Movies.findByIdAndDelete(id)
        if(!movie) return response.status(404).json({error:"No Movie was found"})
        
        return response.status(204).end()
    }
    catch(error){
        response.status(500).json({error: "Something Went Wrong."})
    }

}


module.exports = {
    createMovie,
    getAllMovies,
    deleteMovie
}