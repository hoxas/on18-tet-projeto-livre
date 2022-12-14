const mongoose = require("mongoose");
const { Schema } = mongoose;

const experienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  description: { type: String },
});

const educationSchema = new Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  description: { type: String },
});

const skillSchema = new Schema({
  skill: { type: String, required: true },
  level: { type: String, required: true },
});

const workerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (email) {
        const user = await Worker.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "O endereço de email já esta em uso.",
    },
  },
  location: { type: String, required: true },
  birth_date: { type: Date, required: true },
  experience: { type: [experienceSchema] },
  education: { type: [educationSchema] },
  skills: { type: [skillSchema] },
});

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
