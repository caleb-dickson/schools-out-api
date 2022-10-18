module.exports = {
  friendlyName: "Update a User",

  inputs: {
    userId: {
      type: "number",
      required: true
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    phoneNumber: {
      type: "string",
    },
    token: {
      type: "string",
    },
    role: {
      type: "string",
    },
    campus: {
      type: "number",
    },
    car: {
      type: "number",
    },
  },

  exits: {
    success: {
      description: "User was found and updated as requested.",
    },
  },

  fn: async function ({
    userId,
    firstName,
    lastName,
    phoneNumber,
    token,
    role,
    campus,
    car,
  }) {
    let foundCampus;
    let foundCar;

    if (campus) {
      foundCampus = await Campus.findOne({ id: campus, deleted: false });
      if (!foundCampus) {
        return this.res.badRequest({
          message:
            "Invalid Campus",
        });
      }
    }
    if (car) {
      foundCar = await Car.findOne({ id: car, deleted: false });
      if (!foundCar) {
        return this.res.badRequest({
          message:
            "Invalid Car",
        });
      }
    }

    const updatedUser = await User.updateOne({ id: userId, deleted: false }).set({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      token: token,
      role: role,
      campus: campus,
      car: car,
    });
    if (!updatedUser) {
      return this.res.badRequest({
        message: "Invalid User"
      });
    }

    const updatedPopulatedUser = await User.findOne(
      { id: userId, deleted: false },
      { campus: true, car: true }
    );

    sails.helpers.redactUser(updatedPopulatedUser);

    return updatedPopulatedUser;
  },
};
