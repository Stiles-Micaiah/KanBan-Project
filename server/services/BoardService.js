import mongoose from "mongoose"
import ListService from './ListService'
import TaskService from './TaskService'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _listRepo = new ListService().repository
let _taskRepo = new TaskService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true, default: "https://www.bing.com/th?id=OIP.Vo2AM6P-OB8DUypR4KTSFQHaFj&pid=Api&rs=1&p=0" },
  authorId: { type: ObjectId, ref: 'User', required: true },
  upVotes: { type: Number, required: true, default: [] },
  downVotes: { type: Number, required: true, default: [] }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    _taskRepo.deleteMany({ boardId: this._id }),
    _listRepo.deleteMany({ boardId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class BoardService {
  get repository() {
    return mongoose.model('Board', _schema)
  }
}