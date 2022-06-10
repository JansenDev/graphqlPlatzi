const { ObjectId } = require("mongodb");
const connectDB = require("../db/db");
// Query
async function getCourses() {
  try {
    const db = await connectDB();
    const coursesList = await db.collection("course").find({}).toArray();
    return coursesList;
  } catch (error) {
    console.log(error);
  }
}

async function getCourse(id) {
  try {
    const db = await connectDB();
    const course = await db.collection("course").findOne({
      _id: ObjectId(id),
    });
    return course;
  } catch (error) {
    console.log(error);
  }
}

async function getStudents() {
  const db = await connectDB();
  const studentList = await db.collection("student").find({}).toArray();
  return studentList;
}

async function getStudentById(id) {
  const db = await connectDB();
  const student = await db.collection("student").findOne({
    _id: ObjectId(id),
  });

  return student;
}
// Mutation

async function addCourse(input) {
  const db = await connectDB();
  const course = await db.collection("course").insertOne({ ...input });
  input._id = course.insertedId;

  return input;
}

async function addStudent(input) {
  try {
    const db = await connectDB();
    const queryResult = await db.collection("student").insertOne(input);
    input._id = queryResult.insertedId;

    return input;
  } catch (err) {
    console.log(err);
  }
}
async function deleteStudentById(id) {
  const db = await connectDB();
  const deleteResult = await db.collection("student").deleteOne({
    _id: ObjectId(id),
  });

  return deleteResult.deletedCount === 1;
}

async function editStudent(id, input) {
  const db = await connectDB();
  const filter = { _id: ObjectId(id) };
  const data = { $set: input };
  const options = { upsert: true };

  const editResult = await db
    .collection("student")
    .updateOne(filter, data, options);

  isEditSuccess = editResult.modifiedCount === 1;
  return isEditSuccess ? input : null;
}

//

async function addStudentInACourse(idCourse, idStudent) {
  let courseFound = await getCourse(idCourse);

  const studentFound = await getStudentById(idStudent);

  if (!courseFound || !studentFound) {
    const error = new Error("Course or Student not exist");
    error.code = 404;
    throw error;
  }

  const db = await connectDB();

  const filter = { _id: ObjectId(idCourse) };
  const dataUpdate = {
    $addToSet: {
      student: { _id: studentFound._id },
    },
  };

  const updateResult = await db
    .collection("course")
    .updateOne(filter, dataUpdate);

  const isUpdateSuccess = !updateResult.modifiedCount === 0;
  console.log();

  if (!courseFound["student"]) {
    courseFound["student"] = [{ _id: studentFound._id }];
  } else if (isUpdateSuccess) {
    courseFound["student"] = [
      ...courseFound["student"],
      { _id: studentFound._id },
    ];
    console.log(courseFound["student"]);
  }

  return courseFound;
}

module.exports = {
  getCourses,
  getCourse,
  getStudents,
  getStudentById,
  addCourse,
  addStudent,
  deleteStudentById,
  editStudent,
  addStudentInACourse,
};
