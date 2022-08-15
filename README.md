
# [IEV](https://iev-client.netlify.app/chargers)
iEV is a community driven charging station sharing application designed to bring Electric Vehicle owners together with the intention to form a cohesive network of privately owned charging stations and accelerate the adoption of sustainable vehicles. 

- Users can currently both **Host** and **book** charging stations depending on their requirements.
- Built to be scalable and include a review and profile feature in the future to encourage networking between iEV users.


### Create the .env File for Development Testing
- `REACT_APP_BACKEND_URL`
  - For a backend API connection
  - Link to API repo

A Google API key is required in order to correctly render the Google Map component, for this follow the [`JavaScript Map API`](https://developers.google.com/maps/documentation/javascript/cloud-setup) documentation.
- `REACT_APP_GOOGLE_API_KEY`
  - [Javascript Map API Setup](https://developers.google.com/maps/documentation/javascript/cloud-setup)
    - For generating the JavaScript Google Map component
  - [Geocoding API Setup](https://developers.google.com/maps/documentation/geocoding/cloud-setup)
    - For geocoding user search input into latitude/longitude coordinates (centers the Googlemap position based on fetched chargers)

Your `.env` file should look like something this:
```env
REACT_APP_BACKEND_URL=<your_local_ip>
REACT_APP_GOOGLE_API_KEY=<your_unique_google_api_key>
BROWSER=none // not necessary
```

You can find the file [here](./sample.env)]

### Installation
1. Begin by cloning the repository via the `Git CLI` to your local environment or downloading the `ZIP` file and placing it in a locally accessible location.
2. Once you've done this, navigate to the directory location and run the `npm install` command through your CLI which will install all of the associated dependencies in the `package.json` file.
3. Execute `npm run dev` which will spin up the local server on your machine, by default on port 3001 `(http://localhost:3001)`.
4. Ensure the [backend server](https://github.com/FluroAsh/AshleyThompson_KimStocker_T3A2-API) is running and follow the setup documentation if you have not yet configured it. 


### Libraries 
- [React](https://github.com/facebook/react)
  - React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.
  - This is the backbone of our application and front-end stack.
- [Jest](https://jestjs.io/)
  - Jest is a JavaScript testing framework built on top of Jasmine and maintained by Meta. It was designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications. It works with projects using Babel, TypeScript, Node.js,
- [Material UI](material.io/)
  - Material-UI is an open-source project that features React components that implement Google's Material Design. It kick-started in 2014, not long after React came out to the public, and has grown in popularity ever since.
  - Used heavily to create minimal and easy to user interfaces throughout the applicaiton.