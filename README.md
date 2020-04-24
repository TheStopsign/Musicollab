This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Musicollab
Free, open source, real-time collaborative music composition website.

# Requirements
Add a server/config.js file, with the following contents:
		module.exports.MONGO_URI = "YOURDATABASEURI";

Install mongodb

Install a CORS browser plugin and enable it. Otherwise, localhost->localhost requests will fail.

# Running the project for testing
To run the project...

PREREQUISITE: navigate into the project directory, and run 'npm install'. This will install all project dependencies from package.json

FIRST make sure the database is running. Open a new terminal window, navigate to 'musicollab/server' and run 'mongod'

SECOND make sure the server is running. Open a new terminal window, navigate to 'musicollab/server' and run 'nodemon server.js'

THIRD make sure the react client is running. Open a new terminal window, navigate to 'musicollab' and run 'npm start'

#################################################################################################################################################

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

