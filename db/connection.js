
const db = async (uri) => {
    try {
    await mongoose.connect(uri);
    console.log("Database successfully connected");
    }
    catch(err) {
        console.log("Error: ", err.message);
    }
}

module.exports = db;