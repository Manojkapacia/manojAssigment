const mongoose =  require("mongoose");
const config = require ("config");

 const{auth, name, host, username,password,port }=config.get("db");

 const databaseUrl = auth
 ? `mongodb+srv://${username}:${password}@${host}/${name}?retryWrites=true&w=majority`
 : `mongodb://${host}/${name}`;

 //console.log(databaseUrl);

 mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  module.exports.mongoConnection = () => {
    mongoose.connection.on("connected", function () {
      console.log("database connected! ");
    });
  };

