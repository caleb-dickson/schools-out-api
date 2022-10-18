const bcrypt = require("bcryptjs");

module.exports = {
  friendlyName: "Signup",

  description: "Register a new user account.",

  inputs: {
    firstName: {
      required: true,
      type: "string",
      example: "Steven",
      description: "The user's first name.",
    },
    lastName: {
      required: true,
      type: "string",
      example: "Johnson",
      description: "The user's last name.",
    },
    phoneNumber: {
      required: true,
      type: "string",
      example: "4043481234",
      description: "The user's phone number.",
    },
    email: {
      required: true,
      type: "string",
      isEmail: true,
      description:
        "The email address for the new account, e.g. me@example.com.",
      extendedDescription: "Must be a valid email address.",
    },
    password: {
      required: true,
      type: "string",
      maxLength: 20,
      example: "passwordlol",
      description: "The unencrypted password to use for the new account.",
    },
    role: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "New user account was created successfully.",
    },

    invalid: {
      responseType: "badRequest",
      description:
        "The provided fullName, password and/or email address are invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent.",
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: "The provided email address is already in use.",
    },
  },

  fn: async function ({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    role,
  }) {
    const newEmailAddress = email.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    const newUserRecord = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email: newEmailAddress,
      password: await bcrypt.hash(password, 10),
      role,
    })
      .intercept("E_UNIQUE", "emailAlreadyInUse")
      .intercept({ name: "UsageError" }, "invalid")
      .fetch();

    // Store the user's new id in their session.
    this.req.session.userId = newUserRecord.id;

    let sanitizedUser = _.extend({}, newUserRecord);
    sails.helpers.redactUser(sanitizedUser);

    if (sanitizedUser.password) {
      sails.log.warn(
        "The logged in user record has a `password` property, but it was still there after pruning off all properties that match `protect: true` attributes in the User model.  So, just to be safe, removing the `password` property anyway..."
      );
      delete sanitizedUser.password;
    }

    return sanitizedUser;
  },
};
