let config = {};

config.server_port = process.env.PORT || 3001;

config.db = {};

config.db.user_name = process.env.MONGODB_USER || "username";
config.db.password = process.env.MONGODB_PASSWORD || "password";
config.db.mongodb_uri = `mongodb+srv://${config.db.user_name}:${config.db.password}@${process.env.MONGODB_URI}`;


module.exports = config;