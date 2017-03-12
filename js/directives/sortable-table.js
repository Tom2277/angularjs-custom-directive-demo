angular
  .module('demo-directive-app')
  .directive('sortableTable', sortableTable);

  function sortableTable(){

    return {
      scope: {
        listData : "=listData",
        colsDisplayed : "=colsDisplayed",
        colsLabels : "=colsLabels",
        checkAction : "=checkAction"
      },
      templateUrl: 'templates/directives/sortable-table.html'
    };
  };