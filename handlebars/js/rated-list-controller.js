  function addOrRemoveFromRatedList (domItem, index){
    var masterItem = itemsInSet[Number(index)]
    if ($(domItem).is(":checked")){
      ratedList.push(masterItem);
      masterItem.selected = true;
    }else{
      var itemRated = ratedList.find(function(e){return e.name === masterItem.name});
      var index = ratedList.indexOf(itemRated);
      ratedList.splice(index, 1);
      masterItem.selected = false;
    }
    redrawRatedList();
  }

  function removeFromRatedItems(itemIndex){
    var masterItem = itemsInSet.find(function(e){return e.name === ratedList[Number(itemIndex)].name});
    masterItem.selected = false;
    ratedList.splice(itemIndex, 1);
    redrawRatedList();
    redrawMasterList();
  };

  function moveUpRatedItems (itemIndex){
    var removed = ratedList.splice(itemIndex, 1);
    ratedList.splice(itemIndex-1, 0, removed.pop());
    console.log(removed);
    redrawRatedList();
  };

  function moveDownRatedItems (itemIndex){
    var removed = ratedList.splice(itemIndex, 1);
    console.log(removed);
    ratedList.splice(itemIndex+1, 0, removed.pop());
    redrawRatedList();
  };