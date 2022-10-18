module.exports = {
  friendlyName: "Create many new Students",

  exits: {
    success: {
      description: "All new Students were created successfully.",
    },
  },

  fn: async function () {
    const students = this.req.body;
    let newPopulatedStudents = [];

    let foundCampus;
    let foundTeacher;
    let foundCar;

    for (const student of students) {

      if (student.campus) {
        foundCampus = await Campus.findOne({ id: student.campus, deleted: false });
        if (!foundCampus) {
          return this.res.badRequest({
            message: "Provided Campus invalid for " + student.firstName + " " + student.lastName,
          });
        }
      }
      if (student.teacher) {
        foundTeacher = await User.findOne({
          id: student.teacher,
          deleted: false,
          role: "TEACHER",
        });
        if (!foundTeacher) {
          return this.res.badRequest({
            message: "Provided Teacher invalid for " + student.firstName + " " + student.lastName,
          });
        }
      }
      if (student.car) {
        foundCar = await Car.findOne({ id: student.car, deleted: false });
        if (!foundCar) {
          return this.res.badRequest({
            message: "Provided Car invalid for " + student.firstName + " " + student.lastName,
          });
        }
      }

      const newStudentRecord = await Student.create({
        firstName: student.firstName,
        lastName: student.lastName,
        grade: student.grade,
        mode: student.mode,
        status: student.status,
        campus: student.campus,
        teacher: student.teacher,
        car: student.car,
        bus: student.bus,
      }).fetch();

      const populatedStudentRecord = await Student.findOne(
        {
          id: newStudentRecord.id,
          deleted: false
        },
        {
          campus: true,
          teacher: true,
          car: true,
        }
      );

      sails.helpers.redactUser(populatedStudentRecord.teacher);

      newPopulatedStudents.push(populatedStudentRecord);

    }

    return newPopulatedStudents;
  }
};
