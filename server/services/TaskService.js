import mongoose from "mongoose"
import { stringify } from "querystring";
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

// let _taskRepo = new TaskService().repository

var childSchema = new Schema({
  authorId: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
});

let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: 'list', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  comments: [childSchema],
}, { timestamps: true })

export default class TaskService {
  get repository() {
    return mongoose.model('Task', _schema)
  }
}
