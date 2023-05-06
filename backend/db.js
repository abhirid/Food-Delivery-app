const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://abhineed8:Abhineed8@cluster0.izgnytg.mongodb.net/eater?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected Successfully');

    const fetchedData = await mongoose.connection.db.collection('food-item').find({}).toArray();
    global.foodItem = fetchedData;
    console.log(global.foodItem)

    const foodCategory = await mongoose.connection.db.collection('food-category').find({}).toArray();
    global.foodCat = foodCategory;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoDB;
