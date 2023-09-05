import { Sequelize } from 'sequelize-typescript'
import { config } from 'dotenv'
import { User } from './../database/user.model';
config()

// setup Sequelize to interact with PostgreSQL database
const sequelize = new Sequelize({
    database: process.env.DB_DATABASE as string,
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    dialectOptions: {
        ssl: {
            require: true
        }
    },
    define: {
        timestamps: false
    },
    models: [User]
})

// function to establish a connection to the database, sends error if connection could not be established
export async function connectToDatabase(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log('Connected to database successfully!');
      } catch (error) {
        console.error('Failed to connect to database:', error);
      }
}
