angular
  .module('demo-directive-app')
  .directive('sortableTable', sortableTable);

  function sortableTable(){

    return {
      scope: {
        listData : "=listData",
        colOne : "=colOne",
        colTwo : "=colTwo",
        checkAction : "=checkAction"
      },
      templateUrl: 'templates/sortable-table.html'
    };
  };