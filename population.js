function Population() {

  this.selection = function() {
    for (var i = 0; i < popsize; i++) {
      var parentA = random(nextgen);
      var parentB = random(nextgen);
      var child = this.crossover(parentA, parentB);
      child.mutation();
      newgen[i] = child;
    }
    nextgen = [];
  }

  this.crossover = function(parentA, parentB) {
    var newgenes = [];
    var mid = floor(random(parentA.wages.length));
    for (var i = 0; i < parentA.wages.length; i++) {
      if (i > mid) {
        newgenes[i] = parentA.wages[i];
      } else {
        newgenes[i] = parentB.wages[i]
      }
    }
    return new Net(newgenes);
  }
}
