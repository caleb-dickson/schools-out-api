module.exports = {
  friendlyName: "Update Student",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    grade: {
      type: "number",
    },
    mode: {
      type: "string",
    },
    status: {
      type: "string",
    },
    campus: {
      type: "number",
    },
    teacher: {
      type: "number",
    },
    car: {
      type: "number",
    },
    bus: {
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Student was found and updated as requested.",
    },
  },

  fn: async function ({
    id,
    firstName,
    lastName,
    grade,
    mode,
    status,
    campus,
    teacher,
    car,
    bus,
  }) {
    let foundCampus;
    let foundTeacher;
    let foundCar;

    if (campus) {
      foundCampus = await Campus.findOne({ id: campus, deleted: false });
      if (!foundCampus) {
        return this.res.badRequest({
          message: "Invalid Campus",
        });
      }
    }
    if (teacher) {
      foundTeacher = await User.findOne({
        id: teacher,
        role: "TEACHER",
        deleted: false,
      });
      if (!foundTeacher) {
        return this.res.badRequest({
          message: "Invalid Teacher",
        });
      }
    }
    if (car) {
      foundCar = await Car.findOne({ id: car, deleted: false });
      if (!foundCar) {
        return this.res.badRequest({
          message: "Invalid Car",
        });
      }
    }

    const updatedStudent = await Student.updateOne({
      id: id,
      deleted: false,
    }).set({
      firstName: firstName,
      lastName: lastName,
      grade: grade,
      mode: mode,
      status: status,
      campus: campus,
      teacher: teacher,
      car: car,
      bus: bus,
    });
    if (!updatedStudent) {
      return this.res.badRequest({
        message: "Invalid Student",
      });
    }

    const updatedPopulatedStudent = await Student.findOne(
      { id: id, deleted: false },
      { campus: true, teacher: true, car: true }
    );

    sails.helpers.redactUser(updatedPopulatedStudent.teacher);

    return updatedPopulatedStudent;
  },
  
};
