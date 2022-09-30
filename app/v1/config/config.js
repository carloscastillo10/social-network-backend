require('dotenv').config();

const config = {
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
        port: process.env.MYSQL_MICROSERVICE_PORT || 3001
    },
    port: process.env.PORT || 3000,
};

module.exports = config;
