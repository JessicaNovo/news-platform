# News Platform

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scripts

In the project directory, you can run:

### `yarn install`

Installs all dependencies in package.json.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Product requirements 

* User registration and login to access platform - used [AuthO](https://auth0.com/) as suggested

* The content of the news can only be changed by its author

* News, in draft, can only be accessed by users with Admin roles and the user who created it

* All logged in Users can submit new news articles - used localStorage as suggested

* News articles are paginated 

* Users can filter by category

* Logged in users can read the news articles

* Logged in users can bookmark news articles to read later - also used localStorage

## Login and user types

### Role User

Sign up and test what this news platform can do

## Additional notes

All the credentials to the api are public instead of stored in the .env file only because this is a code challenge and there is no need to have to share any variables and create an .env file to start running the project.

Since I'm using localStorage to store the created news, I've added default articles so the platform always has some articles to show the design of the pages.
