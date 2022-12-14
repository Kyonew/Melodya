const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    savesongs: {
        "type": Array,
        "default": []
    }
});

module.exports = mongoose.model("User", userSchema);