angular  
  .module('demo-directive-app')
  .factory('listRankingTools', listRankingTools);

  function listRankingTools(){
    return {
        function removeFromRatedItems(selectedItem, ratedList, masterList){
          var index = ratedList.indexOf(selectedItem);
          var item = masterList.find(function(e){return e.name === selectedItem.name});
            item.selected = false;
          ratedList.splice(index, 1);
          return ratedList;
        };

        function moveUpRatedItems (selectedItem, ratedList){
          var index = ratedList.indexOf(selectedItem);
          ratedList.splice(index, 1);
          ratedList.splice(index-1, 0, selectedItem);
          return ratedList;
        };

        function moveDownRatedItems (selectedItem, ratedList){
          var index = ratedList.indexOf(selectedItem);
          ratedList.splice(index, 1);
          ratedList.splice(index+1, 0, selectedItem);
          return ratedList;
        };
      }
    };
  };