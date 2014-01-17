//Ember.computed.mapBy, Ember.Array.mapBy, and Ember.Array.getEach are all Ember equivalents of Lo-Dash/Underscore _.pluck()

App.Person = Ember.Object.extend({
  childAges: Ember.computed.mapBy('children', 'age'),
  maxChildAge: Ember.computed.max('childAges')
});
var lordByron = App.Person.create({children: []});

console.log('Max Age: ' + lordByron.get('maxChildAge')); // -Infinity
lordByron.get('childAges').toArray().forEach(function(child, i) {
  console.log(' Child '+i+': '+child); // null
});

lordByron.get('children').pushObject({
  name: 'Augusta Ada Byron', age: 7
});

console.log('Max Age: ' + lordByron.get('maxChildAge')); // 7
lordByron.get('childAges').toArray().forEach(function(child, i) {
  console.log(' Child '+i+': '+child); // Child 0: 7
});

lordByron.get('children').pushObjects([{
  name: 'Allegra Byron',
  age: 5
}, {
  name: 'Elizabeth Medora Leigh',
  age: 8
}]);

console.log('Max Age: ' + lordByron.get('maxChildAge')); // 8
lordByron.get('childAges').toArray().forEach(function(child, i) {
  console.log(' Child '+i+': '+child); // Child 0: 7, Child 1: 5, Child 2: 8
});