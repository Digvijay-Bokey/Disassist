const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Note: In practice, save a hashed version of the password, not the plain text
    email: { type: String, required: true, unique: true }
});

s
const preferenceSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    theme: { type: String, default: 'light' },

});


const Account = mongoose.model("Account", accountSchema);
const Preference = mongoose.model("Preference", preferenceSchema);


module.exports = { Account, Preference };


/*
// require mongoose and your models
const mongoose = require("mongoose");
const { Account, Preference } = require("./models");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/test");

// Create a new account
const newAccount = new Account({
  username: "user1",
  password: "password1", // In practice, ensure the password is hashed
  email: "user1@example.com"
});

newAccount.save()
  .then(account => {
    console.log("Account has been saved.");

    // Create a Preference for the saved account
    const newPreference = new Preference({
      accountId: account._id,
      font: "on"
    });
     // Create a Preference for the saved account
    const newPreference = new Preference({
      accountId: account._id,
      assist: "on"
    });
     // Create a Preference for the saved account
    const newPreference = new Preference({
      accountId: account._id,
      images: "on"
    });
     // Create a Preference for the saved account
    const newPreference = new Preference({
      accountId: account._id,
      speech: "on"
    });

    newPreference.save()
      .then(preference => {
        console.log("Preference has been saved.");
      })
      .catch(error => console.error("Could not save preference: ", error));
  })
  .catch(error => console.error("Could not save account: ", error));
 */