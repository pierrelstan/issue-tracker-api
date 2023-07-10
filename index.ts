import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from "./src/routes/index";


import dotenv from 'dotenv';
dotenv.config();

const app = express();

 /** Rules of our API */
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());

 app.options('*', cors());

 app.get('/', (req, res) => {
    res.send('Welcome to the Bug Tracker API!');
  });

 app.use("/api/v1", routes);



 /** Error handling */
 app.use((req, res, next) => {
     const error = new Error('Not found');
     res.status(404).json({
         message: error.message,
     });
 });

mongoose
    .connect(process.env.MONGODB_API_KEY!, { retryWrites: true, w: 'majority' })
    .then(() => {
        app.listen(process.env.PORT!, () => {
            console.log('Successfully connected to MONGODB ATLAS!');
            console.log('Port:',process.env.PORT!.toString());
          })

    })
    .catch((error) => {
        console.log('Unable to connect to MONGODB ATLAS!');
        console.error(error);
    });

