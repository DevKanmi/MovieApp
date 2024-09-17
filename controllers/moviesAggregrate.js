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
            message:   `Top ${ grossing } movies are: `,
            movie
    })
    }
    catch(error){
        response.status(500).json({error:"Something Went Wrong"})
    }
}

module.exports ={
    filterGenrebyYear,
    highestGrossing
}
