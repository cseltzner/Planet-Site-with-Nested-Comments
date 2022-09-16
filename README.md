# PlanetFacts

## Site

View the site here: [PlanetFacts](http://143.110.236.194:3000)

## Description

PlanetFacts is a site for sharing your favorite facts about your favorite planets! The site shares a small overview of the planet, but what is most exciting is that users can register and post their own planet facts, like other user's facts, and comment on their posts, similar to a site like Reddit.

## Purpose

I am making this site to practice the MERN stack, as well as Typescript. Most of the technology stack I have never used before, or have limited experience with, so this project is excellent practice for working through the entire process on my own.

## Technology stack

This project uses the MERN stack along with Typescript, TailwindCSS, React Router, Redux, and the database is hosted on MongoDB Atlas.

## Figma link

To see the early design concepts for the site, see the figma link below:

[Figma link](https://www.figma.com/file/oH5kV5pykG13deY0Ptv0r3/PlanetFacts?node-id=0%3A1)

## Start application with Docker containers

1. Build and run Docker containers

```bash
docker-compose up --build
```

## Start application on local dev environment

1. Create a .env file in the `server` folder with 3 keys

- `MONGO_URI` - URI to the MongoDB Atlas database
- `PORT` - Port for the server to run on by default
- `JWT_SECRET` - JSON web token secret string used for hashing and verifying JWT

2. Change proxy in client's package.json to `http://localhost:3001`

3. Install client packages

```bash
cd client && npm install && cd ..
```

4. Install server packages

```bash
cd server && npm install && cd ..
```

5. Run development environment

```bash
cd server && npm run dev
```
