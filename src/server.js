const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { PORT } = require('./config/serverConfig.js');
const apiRoutes = require('./routes/index.js');
const db = require('./models/index.js');

const setUpAndStartServer = async function(){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));
    
    app.use('/api', apiRoutes);

    app.listen(PORT , function(){
        console.log(`Server started on port ${PORT}`);

        if(process.env.DB_SYNC == true){
            db.sequelize.sync({ alter : true });
        }
    });
}

setUpAndStartServer();