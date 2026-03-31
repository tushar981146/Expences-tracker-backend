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
        origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }

}

export default config;