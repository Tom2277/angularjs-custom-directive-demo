angular
  .module('demo-directive-app')
  .directive('sortableTable', sortableTable);

  function sortableTable(){

    return {
      scope: {
        listData : "=listData",
        colsDisplayed : "=colOne",
        colsLabels : "=colOne",
        checkAction : "=checkAction"
      },
      templateUrl: 'templates/sortable-table.html'
    };
  };