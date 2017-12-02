Promise.series = (array) => {
  let results = [];
  return array.reduce(function(p, item) {
    return p.then(function() {
      return item.then(function(data) {
        results.push(data);
        return results;
      });
    });
  }, Promise.resolve());
};

// Promise.series = tasks => tasks.reduce((p, task) => p.then(task));
