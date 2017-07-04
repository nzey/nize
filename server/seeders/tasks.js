module.exports = function(db) {

  db.Task.bulkCreate([{
    title: 'put away camping things',
    estimatedTime: '00:30',
    estimateConfidence: 90
  },
  {
    title: 'clean house',
    estimatedTime: '04:00',
    estimateConfidence: 70
  },
  {
    title: 'apply to five jobs',
    estimatedTime: '03:00',
    estimateConfidence: 70
  },
  {
    title: 'bike ride',
    estimatedTime: '01:30',
    estimateConfidence: 95
  },
  {
    title: 'set up nize seeders',
    estimatedTime: '02:00',
    estimateConfidence: 65
  },
  {
    title: 'plan wedding travel',
    estimatedTime: '02:00',
    estimateConfidence: 70
  },
  ]).then(function(tasks) {
  }).catch(err => console.log('ERROR SEEDING: ', err));
};
