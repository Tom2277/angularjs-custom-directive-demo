angular
  .module('demo-directive-app')
  .directive('sortableTable', sortableTable);

  function sortableTable(){
    console.log("you hit sortableTable", "=colsDisplayed");
    return {
      restrict: 'E',
      // transclude: true,
      scope:{
        // checkAction : "=checkAction",
        // listData  : "=listData"
      },
      templateUrl: 'templates/directives/sortable-table.html',
      link: function(scope, element, attrs){
        
                // scope.listData = attrs.listData;
                scope.itemsInSet = JSON.parse(attrs.itemsInSet);
                scope.colsDisplayed = attrs.colsDisplayed.split(',');//$eval("=colsDisplayed"),
                scope.colsLabels = attrs.colsLabels.split(',');
                scope.checkAction = attrs.checkAction;
      
      }
      
    };
  };