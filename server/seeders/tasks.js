module.exports = function(db) {

  db.Task.bulkCreate([{
    title: 'put away camping things',
    estimatedTime: 0.5,
    estimateConfidence: 90
  },
  {
    title: 'clean house',
    estimatedTime: 4.0,
    estimateConfidence: 70
  },
  {
    title: 'apply to five jobs',
    estimatedTime: 3,
    estimateConfidence: 70
  },
  {
    title: 'bike ride',
    estimatedTime: 1.5,
    estimateConfidence: 95
  },
  {
    title: 'set up nize seeders',
    estimatedTime: 2,
    estimateConfidence: 65
  },
  {
    title: 'plan wedding travel',
    estimatedTime: 2,
    estimateConfidence: 70
  },
  ]).then(function(tasks) {
    console.log('tasks added: ');
    console.log(tasks);
  });
};
