angular
  .module('demo-directive-app')
  .directive('sortableTableTwoCol', sortableTableTwoCol);

  function sortableTableTwoCol(){

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