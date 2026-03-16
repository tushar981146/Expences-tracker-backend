import dotenv from 'dotenv';



dotenv.config();


const config = {
    port: process.env.PORT || 5001,

    mongoDb: {
        uri: process.env.MONGODB_URL
    },

    api: {
        prefix: '/api',
        version: 'v1',
        route: {
                auth: '/auth',
                expenses: '/expenses'
        }
    },

     cors: {
        origin: "http://localhost:5173" || process.env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }

}

export default config;