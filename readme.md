# Nize

## Summary
Application to both organize and complete tasks in a format designed to encourage single-tasking.

### Wireframes
[https://app.moqups.com/nzey/e0lj15dk7s...](https://app.moqups.com/nzey/e0lj15dk7s/view/page/ac5446025)

### Seed Project Directory

[express-react-redux-starter](https://github.com/DimitriMikadze/express-react-redux-starter)

## Run Locally

Clone Repo

````
git clone https://github.com/nzey/nize
````

Install external dependencies
- Node and NPM
- PostgreSQL

Install local dependencies
````
cd nize

npm install
````

[Start postgres server](https://www.postgresql.org/docs/9.6/static/server-start.html) if not started:  
`postgres -D /usr/local/pgsql/data >logfile 2>&1 &`


Start development server with hot reloading:
`npm run dev`

2) Navigate to http://localhost:3000

### Testing

Run test once

````
npm run test
````

Test watch

````
npm run test:watch
````

### Linting

Eslint with Airbnb Eslint configuration

````
npm run lint
````

### Production

Build for production

````
npm run build
````

```
npm install pm2 -g
```

Start production server

````
npm run start
````

### Contributing


### License

