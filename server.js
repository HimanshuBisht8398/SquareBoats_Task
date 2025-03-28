const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./Connection/DB_Connection'); 
const candidate_routes=require('./Routes/Candidate_routes')
const PORT = process.env.PORT || 3001;
;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send({ code: 200, message: "Backend running on PORT " + PORT });
});


require('./Routes/Candidate_routes')(app)
require('./Routes/Recruiter_routes')(app)
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
