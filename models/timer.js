
/**
 * Module dependencies
 */
var UserSchema  = undefined;
var mongoose    = require('mongoose');
var moment      = require('moment');


/**
 * Timer schema
 */
TimerSchema = new mongoose.Schema({
    user:       { type: String },
    project:    { type: String },
    start:      { type: Date, default: Date.now },
    stop:       { type: Date },
    total:      { type: Number }
});


/**
 * Model helpers
 */
TimerSchema.pre('save', function(next){
    // Calculate duration for the completed timer
    if (this.stop && !this.total) {
        var duration = moment.duration(moment(this.start).diff(moment(this.stop)));
        this.total = duration.asHours().toFixed(2);
    }
    return next();
});


/**
 * Return mongoose model
 */
module.exports = mongoose.model("Timer", TimerSchema);
