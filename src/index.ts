import express, { Application,Request, Response} from "express";
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import routes from './routes';
import dbInit from './db/init'

dotenv.config();
const port = process.env.PORT;
dbInit()
export const get = () => {
  const app: Application = express()

  // Body parsing Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.options('*', cors());
  app.use(morgan('tiny'))
  
  app.get('/', async(req: Request, res: Response): Promise<Response> => {
      return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api` })
  })
  
  app.use('/api', routes)

  return app
}


export const start = () => {
  const app = get()
  try {
      app.listen(port, () => {
          console.log(`Server running on http://localhost:${port}`)
      })
  } catch (error: any) {
      console.log(`Error occurred: ${error.message}`)
  }
}

start()
