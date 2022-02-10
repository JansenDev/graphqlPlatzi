const connectDB = require("../db/db");
const { ObjectId } = require("mongodb");

const resolvers = {
  Query: {
    getCourses: async () => {
      try {
        const db = await connectDB();
        const coursesList = await db.collection("course").find({}).toArray();
        return coursesList;
      } catch (error) {
        console.log(error);
      }
    },

    getCourse: async (_, { id }) => {
      try {
        const db = await connectDB();
        const course = await db.collection("course").findOne({
          _id: ObjectId(id),
        });
        return course;
      } catch (error) {
        console.log(error);
      }
    },
    getStudents: async () => {
      const db = await connectDB();
      const studentList = await db.collection("student").find({}).toArray();
      return studentList;
    },
    getStudentById: async (_, { id }) => {
      const db = await connectDB();
      const student = await db.collection("student").findOne({
        _id: ObjectId(id),
      });

      return student;
    },
    hello: () => "hello world",
    gretting: () => "Hola",
  },
  Mutation: {
    addCourse: async (_, { input }) => {
      const db = await connectDB();
      const course = await db.collection("course").insertOne({ ...input });
      input._id = course.insertedId;

      return input;
    },
    addStudent: async (_, { input }) => {
      try {
        const db = await connectDB();
        const queryResult = await db.collection("student").insertOne(input);
        input._id = queryResult.insertedId;

        return input;
      } catch (err) {
        console.log(err);
      }
    },
    deleteStudentById: async (_, { id }) => {
      const db = await connectDB();
      const deleteResult = await db.collection("student").deleteOne({
        _id: ObjectId(id),
      });

      return deleteResult.deletedCount === 1;
    },
    editStudent: async (_, { id, input }) => {
      const db = await connectDB();
      const filter = { _id: ObjectId(id) };
      const data = { $set: input };
      const options = { upsert: true };

      const editResult = await db
        .collection("student")
        .updateOne(filter, data, options);

      editSuccess = editResult.modifiedCount === 1;
      return editSuccess ? input : null;
    },
  },
};

module.exports = resolvers;
