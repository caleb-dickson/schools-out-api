module.exports = {
  friendlyName: "Get Student",

  description: "Get one Student by id",

  inputs: {
    studentId: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Student was found.",
    },
    notFound: {
      responseType: "notFound",
      description: "No Student was found by that id.",
    },
  },

  fn: async function ({ studentId }) {
    const foundStudent = await Student.findOne({
      id: studentId,
      deleted: false,
    });
    if (!foundStudent) {
      throw "notFound";
    }

    return foundStudent;
  },
};
