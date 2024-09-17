const movieRouter = require('express').Router()   

//Import Controllers
const {createMovie, getAllMovies, deleteMovie} = require('../controllers/routeController')
const {filterGenrebyYear,highestGrossing} = require('../controllers/moviesAggregrate')



//Routes
movieRouter.post('/create', createMovie)
movieRouter.get('/',getAllMovies)
movieRouter.delete('/:id',deleteMovie)

//Routes from Aggregrate
movieRouter.get('/filter',filterGenrebyYear)
movieRouter.get('/top',highestGrossing)

module.exports = movieRouter
