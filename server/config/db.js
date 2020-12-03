const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI || 'mongodb://localhost:27017',
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }
        )

        console.log(
            `MongoDB connected at ${conn.connection.host}`.cyan.underline
        )
    } catch (error) {
        console.log(`Error: ${error.message}`.red)
        process.exit(1)
    }
}

module.exports = connectDB

//docker run -p 3000:3000 --network=app-net --env MONGO_URI=mongodb://db:27017 app-with-mongo
