// this file handles a sample action to display a photo in a DOM element while using the
// handlebars sortable table helper
var ratedList = [];

function redrawRatedList(domID){
  //call handlebars 
  console.log("redrawRatedList domID: ", domID );
  var ratedListBuilder = document.getElementById("rated-list-builder").innerHTML;
  var templateRatedList = Handlebars.compile(ratedListBuilder);
  var currentRated = templateRatedList( {ratedItems: ratedList, domID: domID});

  document.getElementById(domID + "rating").innerHTML = currentRated;
}

function addOrRemoveFromRatedList (domID, index){
  var masterItem = ourHBdataStore[domID].items[index];
  var itemRated = ratedList.find(function(e){return e.name === masterItem.name;});
  if (!masterItem.selected){
    if (!itemRated){ratedList.push(masterItem);}//
    masterItem.selected = true;
  }else{
    var ratedIndex = ratedList.indexOf(itemRated);
    ratedList.splice(ratedIndex, 1);
    masterItem.selected = false;
  }
  redrawRatedList(domID);
  redrawTable(domID);
}

function removeFromRatedItems(itemIndex, domID){
  var masterItem = ourHBdataStore[domID].items.find(function(e){return e.name === ratedList[itemIndex].name});
  masterItem.selected = false;
  ratedList.splice(itemIndex, 1);
  redrawRatedList(domID);
  redrawTable(domID);// from main helper js file
};

function moveUpRatedItems (itemIndex, domID){
  var removed = ratedList.splice(itemIndex, 1);
  ratedList.splice(itemIndex-1, 0, removed.pop());
  redrawRatedList(domID);
};

function moveDownRatedItems (itemIndex, domID){
  var removed = ratedList.splice(itemIndex, 1);
  ratedList.splice(itemIndex+1, 0, removed.pop());
  redrawRatedList(domID);
};