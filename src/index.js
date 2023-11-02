const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGODB_URI, { dbName: 'social-media' })
    .then(() => {
        console.log('connect database successfully!');
        app.listen(PORT, () => {
            console.log(
                `Server run successfully at http://localhost:${PORT}`,
            );
        });
    })
    .catch((error) => {
        console.error('connect database failure with error:' + error);
    });