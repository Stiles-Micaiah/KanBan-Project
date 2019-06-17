import mongoose from "mongoose"
import TaskService from './TaskService'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _taskRepo = new TaskService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  upVotes: { type: Number, required: true, default: [] },
  downVotes: { type: Number, required: true, default: [] }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    _taskRepo.deleteMany({ listId: this._id }),

  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class ListService {
  get repository() {
    return mongoose.model('List', _schema)
  }
}