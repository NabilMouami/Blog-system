const express = require("express");
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');
const config = require('./config');
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');
const cors = require('cors');
const morgan = require("morgan")
const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .catch((error) => console.log(error.reason));

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);


app.listen(  PORT = process.env.PORT || 5000, () => {
  console.log('Server started at http://localhost:5000');
});

