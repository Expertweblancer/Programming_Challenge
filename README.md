### Setup the dependencies
## For the whole project
```
npm install
```

## For Server:
```
cd backend
npm install
```

## For Frontend:
```
cd frontend/challenge
npm install
```


### Run the project
To run the project please run the following command in the root of the
project
```
npm run dev
```

### Configuration
By default server will run on ```localhost:5001``` and frontend on 
```localhost:3000```. 
Frontend will automatically change the port if 3000 is taken but to
change the port of the backend please configure ```.env``` file in
backend directory, and change the constant ```SERVER_PORT``` in
frontend/challenge/src/App.js
