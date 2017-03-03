angular  
  .module('demo-directive-app')
  .factory('listRankingService', listRankingService);

  function listRankingService(){
    return {
        removeItem: function(selectedItem, ratedList, masterList){
          var index = ratedList.indexOf(selectedItem);
          var item = masterList.find(function(e){return e.name === selectedItem.name});
            item.selected = false;
          ratedList.splice(index, 1);
          return ratedList;
        },

         moveUp: function(selectedItem, ratedList){
          var index = ratedList.indexOf(selectedItem);
          ratedList.splice(index, 1);
          ratedList.splice(index-1, 0, selectedItem);
          return ratedList;
        },

        moveDown: function  (selectedItem, ratedList){
          var index = ratedList.indexOf(selectedItem);
          ratedList.splice(index, 1);
          ratedList.splice(index+1, 0, selectedItem);
          return ratedList;
        }
      }
  };