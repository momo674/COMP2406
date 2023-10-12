var Set = require('./set.js')
var SetF = require('./setFunction.js')
var set = new Set()
var setf = new SetF()
var set2 = new Set()

set.add('Lou')
set.add('Sue')
set.add('John')
set2.add('John')

set.remove('Frank')
set.remove('Sue')