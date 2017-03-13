angular
  .module('demo-directive-app')
  .directive('tnSortableTable', sortableTable);

  function sortableTable(){
    console.log("you hit sortableTable", "=colsDisplayed");
    return {
      restrict: 'E',
      scope:{
        listData : "=listData"
      },
      templateUrl: 'templates/directives/sortable-table.html',
      link: function(scope, element, attrs){
        scope.colsDisplayed = attrs.colsDisplayed.split(',');
        scope.colsLabels = attrs.colsLabels.split(',');
        scope.sortCol = attrs.sortCol;
        scope.sortDesc = (attrs.sortDesc == "true");
        scope.itemsInSet = scope.listData.itemsInSet;
        scope.checkAction = function(item){
          scope.listData[attrs.checkAction](item);
        }
      }  
    };
  };