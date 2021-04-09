// Requiring mongoose
const mongoose = require('mongoose');
const schema = mongoose.Schema;


// Creating Classroom schema
const Classroomschema = new schema({
    Subject: {
        type: String,
        required: true
    },
    Teacher: {
        type: schema.Types.ObjectId,
        ref: "teacher" 
    },
    Students: [{
        type: schema.Types.ObjectId,
        ref: "student"
    }]
});


//Exporting Teacher model.
const Classroom = mongoose.model('classroom', Classroomschema);
module.exports = Classroom;