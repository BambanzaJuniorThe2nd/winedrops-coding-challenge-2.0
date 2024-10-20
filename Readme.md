# Winedrops coding challenge

## Installation

1. Clone the repository:
```
git clone https://github.com/BambanzaJuniorThe2nd/Winesdrop-coding-challenge.git
cd winedrops-coding-assessment
```

2. Install the required packages for the backend:
```
cd backend && yarn install
```

3. Set up environment variables for the backend: Create a `.env` file in the backend directory and add the following variables:
```
BASE_URL=localhost
PORT=5000
API_ROOT=/winedrops/api
DB_PATH=./src/core/db/winedrops.db
```

4. Install the required packages for the frontend:
```
cd ../frontend && yarn install
```

5. Set up environment variables for the frontend: Create a `.env` file in the frontend directory and add the following:
```
VITE_API_URL=http://localhost:5000/winedrops/api
```

## How to run the application locally without Docker
1. cd into the backend repo and run the following command:
```
yarn dev
```

2. Similarly, run the same command in the frontend directory.


## How to run the application locally using Docker

- Launch Docker
- Clone the repo locally
- Inside the frontend folder, create a `.env` file with the following content: `VITE_API_URL=http://localhost:5000/winedrops/api`
- In the root folder, open a bash terminal and run the command `./start.sh`. This will build then run both the frontend and backend containers.


## Endpoints

### GET /winedrops/api/best-selling
This endpoint retrieves a list of best selling wines with the option to specify the page and sorting criteria.
##### Request Parameters
- page (query parameter) - The page number for the results.
- limit (query parameter) - The number of wines to retrieve per page.
- sortBy (query parameter) - The criteria to sort the wines by.

##### Response
Upon a successful request, the server will respond with a status code of 200 and a JSON object containing the following fields:
- wines (array) - An array of wine objects with details such as ID, name, vintage, total revenue, total bottles, total orders, ranking, and flags indicating if it's in the top ten or bottom ten.
- totalCount - The total count of wines.
- page - The current page number.
- limit - The limit of wines per page.

The wines array provides information about each wine, while totalCount, page, and limit offer pagination details.

### GET /winedrops/api/search
This endpoint retrieves a list of wines based on a search query.
##### Request Parameters
- query (query parameter) - The search query.
- page (query parameter) - The page number for the results.
- limit (query parameter) - The number of wines to retrieve per page.
- sortBy (query parameter) - The criteria to sort the wines by.

##### Response
Same response structure as GET /winedrops/api/best-selling




