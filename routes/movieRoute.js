const movieRouter = require('express').Router()   

//Import Controllers
const {createMovie, getAllMovies, deleteMovie, getAMovie} = require('../controllers/routeController')
const {filterGenrebyYear,highestGrossing,highestRatings, moviesforActor} = require('../controllers/moviesAggregrate')



//Routes
movieRouter.post('/create', createMovie)
movieRouter.get('/',getAllMovies)
movieRouter.delete('/:id',deleteMovie)
movieRouter.get('/:id',getAMovie)

//Routes from Aggregrate
movieRouter.get('/filter',filterGenrebyYear)
movieRouter.get('/top',highestGrossing)
movieRouter.get('/top5rated', highestRatings)
movieRouter.get('/actor/',moviesforActor)
module.exports = movieRouter
