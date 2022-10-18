module.exports = {
  friendlyName: "Create one",

  description: "Create a new campus and assign it's administrator",

  inputs: {
    name: {
      required: true,
      type: "string",
    },
    adminId: {
      required: true,
      type: "number",
    },
  },

  exits: {
    success: {
      description: "New campus was created successfully.",
    },

    invalid: {
      responseType: "badRequest",
      description: "The campus name is invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent.",
    },

    nameAlreadyInUse: {
      statusCode: 409,
      description: "The provided campus name is already in use.",
    },

    notFound: {
      statusCode: 404,
      description:
        "No administrator was found by that id. Please check that the User id is correct and that this User is an Administrator.",
    },

  },

  fn: async function ({ name, adminId }) {

    const admin = await User.findOne({ id: adminId });
    if (!admin || admin.role !== "ADMIN") {
      throw "notFound";
    }

    const newCampusRecord = await Campus.create({ name: name, admin: admin.id })
    .intercept("E_UNIQUE", "nameAlreadyInUse")
    .fetch();

    return newCampusRecord;
  },
};
