const Movies = require('../models/movieSchema')

//Filter a "Genre" by "year"

const filterGenrebyYear = async(request, response) =>{
    const{genre, releaseYear} = request.query
    try{
    
    const year = Number(releaseYear)
    const movies = await Movies.aggregate([
        {
            //Match searches the database by the genre Passed and the also releaseYear > the year passed in query.
            $match : {
                genre : genre,
                releaseYear:{ $gt : year}
            }
    }])
         response.status(200).json(movies)
}
    catch(error){
        response.status(400).json({error:"Something Went Wrong"})
    }
}

//Return Top K Highest Grossing Movies based on boxoffice

const highestGrossing = async(request, response) =>{
    const {gross} = request.query


    try{
        const grossing = Number(gross)
        const movie = await Movies.aggregate([
           {$sort : {boxoffice: -1}},
           {$limit: grossing}
        ])
        return response.status(200).json({
            message:  `Top ${ grossing } movies are: `,
            movie
    })
    }
    catch(error){
        response.status(500).json({error:"Something Went Wrong"})
    }
}

//Get the top 5 movies with the highest IMDb Rstings

const highestRatings = async(request, response) =>{
    try{
    const movies = await Movies.aggregate([
        {   //Stage 1
            $sort :{"ratings.imdb": -1} //Arrange in Descending order
        },
        {   //Stage 2
            $limit: 5 // Top 5 Highest rated Imdb
        },
        {   //Stage 3
            $project : {  //Return Specific Fields
                "title": 1,
                "releaseYear": 1,
                "genre": 1,
                "ratings.imdb": 1
            }
        }

    ])

    response.status(200).json({
        message: "Top 5 Rated Imdb Movies",
        movies
    })
    }
    catch(error){
        console.log(error)
        response.status(500).json({error: "Something went Wrong"})
    }
}

//Find Specific Movies an actor appeared in.
const moviesforActor = async(request, response) =>{
    const{actor} = request.query
    try{
        const movies = await Movies.aggregate([
            {  //Stage 1: Unwind all arrays of cast 
                $unwind : "$cast"
            },
            {  //Stage 2 : display all movies that contain this actor
                $match: {cast: actor}
            },
            {
                $project: {
                    "title": 1,
                    "releaseYear": 1,
                    "genre":1,
                    "cast":1 
                }
            }
            //Example: http://localhost:3001/api/movies/actor?actor=Keanu%20Reeves
    ])
    if(movies.length === 0) return response.status(404).json({error:`Movies with ${ actor } Can't be Found, Search For Another Actor!`})
   
        return response.status(200).json({
            message: `movies that ${ actor } acted in are:`,
            movies
        })
    }
    catch(error){
        console.log(error)
        response.status(500).json({error: "Something went Wrong"})
    }
}

module.exports ={
    filterGenrebyYear,
    highestGrossing,
    highestRatings,
    moviesforActor
}
