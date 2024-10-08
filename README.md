# Movie Database API

This is a simple Movie Database API built with Node.js, Express, and MongoDB. It allows users to perform CRUD operations on movie data and includes additional features like fetching the top K highest-grossing movies.

## Features

- Add, fetch, delete movies from the database.
- Filter movies by genre and release year.
- Retrieve the top K highest-grossing movies.

## API ENDPOINTS

1. Create a New Movie
This endpoint allows you to create a new movie in the database.

#### Endpoint:

```bash
   POST /api/movies/create 
```

#### Request Body: 

```bash
 {
    "title": "The Godfather",
    "releaseYear": 1972,
    "genre": "Crime",
    "ratings": [
        {"source": "imdb", "value": 9.2 },
        {"source": "rottenTomatoes", "value": 97}
    ],
    "cast": ["Marlon Brando", "Al Pacino", "James Caan"],
    "boxoffice": 246120986
 } 
```

### Response:
- Status: `201 Created`
- The saved movie will be returned

## Aggregate Operations

1. ### Get Top K Highest Grossing Movies
This endpoint returns the top K highest-grossing movies based on their box office performance.

#### Endpoint:

```bash
 GET /api/movies/top/
```
#### Query Parameters:
- `gross`(Number): The number of top-grossing movies to return.

#### Example Request

```bash
GET http://localhost:3001/api/movies/top?gross=5
```
#### Sample Response: 

```bash
{
    "message": "Top 5 movies are:",
    "movies": [
        {
            "_id": "64fcb5d3fa7818abc1e5f4e5",
            "title": "Avatar",
            "releaseYear": 2009,
            "genre": "Sci-Fi",
            "boxoffice": 2847246203
        },
        {
            "_id": "64fcb5d3fa7818abc1e5f4e5",
            "title": "Avengers: Endgame",
            "releaseYear": 2019,
            "genre": "Action",
            "boxoffice": 2797800564
        },
        // other movies...
    ]
}

```

2. ### Filter Movies by Genre and Release Year
This endpoint filters movies by their genre and release year, fetching only those released after the given year

#### Endpoint:

```bash
GET /api/movies/filter
```
#### Query Parameters:
- `genre`(String): The genre of the movie (e.g., Action, Crime, Romance).
- `releaseYear` (Number): The release year to filter movies after.

#### Example Request:
```bash
GET http://localhost:3001/api/movies/filter?genre=Crime&releaseYear=1971
```

#### Sample Response: 
```bash
[
    {
        "_id": "64fcb5d3fa7818abc1e5f4e5",
        "title": "The Godfather",
        "releaseYear": 1972,
        "genre": "Crime",
        "ratings": [
            {"source": "imdb", "value": 9.2},
            {"source": "rottenTomatoes", "value": 97}
        ],
        "cast": ["Marlon Brando", "Al Pacino", "James Caan"],
        "boxoffice": 246120986
    }
]
```

3. ### Find Specific Movies an Actor Appeared In
This endpoint allows users to search for movies in which a particular actor has appeared. The request takes the actor's name as a query parameter and returns a list of movies that feature the specified actor.

#### Endpoint

```bash
GET /api/movies/actor
```

#### Query Parameter
- `actor`:(string) Name of the Actor you want to find.

#### Example Request

``` bash
GET http://localhost:3001/api/movies/actor?actor=Keanu%20Reeves
```

#### Example Response: 
if movies featuring the actor are found:
```bash
{
  "message": "movies that Keanu Reeves acted in are:",
  "movies": [
    {
      "title": "The Matrix",
      "releaseYear": 1999,
      "genre": "Action",
      "cast": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
    },
    {
      "title": "John Wick",
      "releaseYear": 2014,
      "genre": "Action",
      "cast": ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"]
    }
  ]
}
```

if no movies are found for the specified actor:

```bash
{
  "error": "Movies with Keanu Reeves Can't be Found, Search For Another Actor!"
}
```

### Error Handling
In case of errors, the API will return an appropriate error message. For example:

- `404 Not Found` if the movie is not found in the database.
- `500 Internal Server` Error for general server issues.
