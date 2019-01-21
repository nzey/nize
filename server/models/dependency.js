// Foreign Key columns taskId and dependentTaskId defined in hasMany associations on model 'task'
module.exports = (sequelize) => {
  const Dependency = sequelize.define('dependency', {});

  // Class Methods

  // Returns promise of array of found or created dependencies
  Dependency.addPrerequisites = (dependentTaskId, prereqTaskIds) => {
    const newDependencyPromises = prereqTaskIds.map(taskId =>
      Dependency.findOrCreate({ where: { taskId, dependentTaskId } }).spread((instance, created) => instance)
    );
    return Promise.all(newDependencyPromises);
  };

  // Instance Methods (e.g. Dependency.prototype.myMethod = () => {})

  return Dependency;
};
