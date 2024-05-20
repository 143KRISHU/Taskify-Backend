import mongoose ,{Schema} from 'mongoose'

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['In-Complete', 'In-Progress', 'Completed'],
        default: 'In-Complete',
    },
    dueDate: {
        type: Date,
        required: false,
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
    },
},{timestamps:true});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
