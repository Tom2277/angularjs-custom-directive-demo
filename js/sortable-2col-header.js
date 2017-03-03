angular
  .module('demo-directive-app')
  .directive('sortableTableHeader', sortableTableHeader);

  function sortableTableHeader(){

    return {
      scope: {
        thisCol : "=thisCol",
        innerReverse : "=innerReverse",
        innerType : "=innerType"
      },
      templateUrl: 'templates/sortable-table-header-cell.html'
    };
  };