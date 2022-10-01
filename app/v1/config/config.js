require('dotenv').config();

const config = {
    cacheMicroService: {
        host: process.env.CACHE_MICROSERVICE_HOST || 'localhost',
        port: process.env.CACHE_MICROSERVICE_PORT || 3003,
        redis: {
            dbUrl: process.env.REDIS_URL,
        },
    },
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    mysql: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
    mysqlMicroService: {
        host: process.env.MYSQL_MICROSERVICE_HOST || 'localhost',
        port: process.env.MYSQL_MICROSERVICE_PORT || 3001,
    },
    port: process.env.PORT || 3000,
    postMicroservice: {
        port: process.env.POST_MICROSERVICE_PORT || 3002,
    },
};

module.exports = config;
