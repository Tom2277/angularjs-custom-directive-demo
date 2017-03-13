angular
    .module('demo-directive-app')
    .controller('RatingListController', RatingListController);

    RatingListController.$inject = ['$scope', '$localStorage','listRankingService'];

    // NOTE - this is a hardwired, very simple controller made only to show the sortable table
    // directive in action. I made two quick controllers that could both be accessed by same directive
    // To see a way a controllers can be structured for multiple uses within a controller
    // see my handlebars-sortable-table-helper repo at github. 
    // The local storage currently works only once per web site but multi-use in that other repository

    function RatingListController($scope, $localStorage, listRankingService){
      var vm = this;

      vm.message = "test message from RatingListController";
      vm.itemsInSet = starTrekChars;
      vm.$storage = $localStorage.$default({
        ratedItems: []
      });
      vm.ratedItems = vm.$storage.ratedItems;

      vm.addOrRemoveFromRatedItems = addOrRemoveFromRatedItems;
      vm.removeFromRatedItems = removeFromRatedItems;
      vm.moveUpRatedItems = moveUpRatedItems;
      vm.moveDownRatedItems = moveDownRatedItems;
      setItemsSelected();

      function setItemsSelected(){
        vm.itemsInSet.forEach(function(item){
          vm.ratedItems.forEach(function(ratedItem){
            if  (ratedItem.name === item.name){item.selected = true;}
          })
        })
      };

      function addOrRemoveFromRatedItems(selectedItem){
        console.log("got to controller");
        var matchItem = vm.ratedItems.find(function(e){return e.name === selectedItem.name});
        var index = vm.ratedItems.indexOf(matchItem);
        if (selectedItem.selected && (!matchItem)){
          vm.ratedItems.push(selectedItem);
        }else{
          vm.ratedItems.splice(index, 1);
        }
      };

      function removeFromRatedItems(selectedItem){
        // itemsInSet also gets altered by this factory service
        listRankingService.removeItem(selectedItem, vm.ratedItems, vm.itemsInSet);
      };

      function moveUpRatedItems (selectedItem){
        // consider sending shallow copies instead
        vm.ratedItems = listRankingService.moveUp(selectedItem, vm.ratedItems);
      };

      function moveDownRatedItems (selectedItem){
        vm.ratedItems = listRankingService.moveDown(selectedItem, vm.ratedItems);
      };

    }