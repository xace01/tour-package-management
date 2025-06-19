const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgresql://postgres.tkqljjgfzeuzhysvuvgz:tourpackage1231@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true');

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require('./models/user.model.js')(sequelize, DataTypes)
db.package = require('./models/package.model.js')(sequelize, DataTypes)
db.review = require('./models/review.model.js')(sequelize, DataTypes)
db.booking = require('./models/booking.model.js')(sequelize, DataTypes)

// code for migration 
sequelize.sync({ alter: false }).then(() => {
  console.log('Payment Method Changed in Database')
  console.log('All models were synchronized successfully.');
});
module.exports = db