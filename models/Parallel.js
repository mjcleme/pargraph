var mongoose = require('mongoose');
var ParallelSchema = new mongoose.Schema({
  name: String,
  data: [Number]
});
mongoose.model('Parallel', ParallelSchema);

