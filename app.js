const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());
const packageRoutes = require('./database/routes/package.route');
const bookingRoutes = require('./database/routes/booking.route');
const reviewRoutes = require('./database/routes/review.route');
const userRoutes = require('./database/routes/user.route');
const authRoutes = require('./database/routes/auth.route');

app.use('/uploads', express.static('uploads'));
app.use('/package', packageRoutes);
app.use('/booking', bookingRoutes);
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
app.use('/', authRoutes); // OR use '/auth' if you want '/auth/login'


app.get('/', (req, res) => {
  res.send('Tour Package management System');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
