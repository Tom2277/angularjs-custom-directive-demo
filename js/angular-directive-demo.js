(function(){
  'use strict'

  angular
    .module('demo-directive-app',['ngStorage'])
    .controller('RatingListController', RatingListController);

    RatingListController.$inject = ['$scope', '$localStorage','listRankingService'];

    function RatingListController($scope, $localStorage, listRankingService){
      var vm = this;

      vm.message = "test message from checklist as js";
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
        var matchItem = vm.ratedItems.find(function(e){return e.name === selectedItem.name});
        var index = vm.ratedItems.indexOf(matchItem);
        if (selectedItem.selected && (!matchItem)){
          vm.ratedItems.push(selectedItem);
        }else{
          vm.ratedItems.splice(index, 1);
        }
      };

      function removeFromRatedItems(selectedItem){
        listRankingService.removeItem(selectedItem, vm.ratedItems, vm.itemsInSet);
        // vm.ratedItems = listRankingService.removeItem(selectedItem, vm.ratedItems, vm.itemsInSet);
      };

      function moveUpRatedItems (selectedItem){
        vm.ratedItems = listRankingService.moveUp(selectedItem, vm.ratedItems);
      };

      function moveDownRatedItems (selectedItem){
        vm.ratedItems = listRankingService.moveDown(selectedItem, vm.ratedItems);
      };


      // function removeFromRatedItems(selectedItem){
      //   var index = vm.ratedItems.indexOf(selectedItem);
      //   var item = vm.itemsInSet.find(function(e){return e.name === selectedItem.name});
      //     item.selected = false;
      //   vm.ratedItems.splice(index, 1);
      // };

      // function moveUpRatedItems (selectedItem){
      //   var index = vm.ratedItems.indexOf(selectedItem);
      //   vm.ratedItems.splice(index, 1);
      //   vm.ratedItems.splice(index-1, 0, selectedItem);
      // };

      // function moveDownRatedItems (selectedItem){
      //   var index = vm.ratedItems.indexOf(selectedItem);
      //   vm.ratedItems.splice(index, 1);
      //   vm.ratedItems.splice(index+1, 0, selectedItem);
      // };
    }

})()