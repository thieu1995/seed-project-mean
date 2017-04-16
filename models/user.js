var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongooseUniqueValid = require("mongoose-unique-validator");

var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type:String, required: true },
    email: { type: String, required: true, unique: true },
    messages: [ { type: Schema.Types.ObjectId, ref: "Message" } ]
});

userSchema.plugin(mongooseUniqueValid);

module.exports = mongoose.model("User", userSchema);


/*
     type: ObjectId # type: Schema.Types.ObjectId
     + Id of this schema
     + Id of all schema (can be id of userSchema)

     ref: Tell mongoose reference to schema

     plugin: using plugin to validator email

 */