module.exports = {
  friendlyName: "Delete a Student",

  description: "Marks a Student as deleted.",

  inputs: {
    studentId: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Student was successfully deleted.",
    },
    notFound: {
      responseType: "notFound",
      description: "No Student was found by that id.",
    },
  },

  fn: async function ({ studentId }) {
    
    const deletedStudent = await Student.updateOne({ id: studentId, deleted: false }).set({
      deleted: true
    });

    if (!deletedStudent) {
      throw "notFound";
    }

    return deletedStudent;
  },
};
