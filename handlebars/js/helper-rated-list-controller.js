// this file handles a sample action to display a photo in a DOM element while using the
// handlebars sortable table helper
var ratedLists = {};

function redrawRatedList(domID){
  //call handlebars 
  var ratedListBuilder = document.getElementById("rated-list-builder").innerHTML;
  var templateRatedList = Handlebars.compile(ratedListBuilder);
  var currentRated = templateRatedList( {ratedItems: ratedLists[domID], domID: domID});

  document.getElementById(domID + "rating").innerHTML = currentRated;
}

function addOrRemoveFromRatedList (domID, index){
  var masterItem = ourHBdataStore[domID]["items"][index];
  if (!ratedLists[domID]){ ratedLists[domID] = [];}
  console.log("should be an empty array", ratedLists[domID]);
  var itemRated = ratedLists[domID].find(function(e){return e.ID === masterItem.ID;});
  if (!masterItem.selected){
    if (!itemRated){ratedLists[domID].push(masterItem);}
    masterItem.selected = true;
  }else{
    var ratedIndex = ratedLists[domID].indexOf(itemRated);
    ratedLists[domID].splice(ratedIndex, 1);
    masterItem.selected = false;
  }
  redrawRatedList(domID);
  localStorageSaveRatedList(domID);
  redrawTable(domID);
}

function removeFromRatedItems(itemIndex, domID){
  var masterItem = ourHBdataStore[domID].items.find(function(e){return e.name === ratedLists[domID][itemIndex].name;});
  masterItem.selected = false;
  ratedLists[domID].splice(itemIndex, 1);
  redrawRatedList(domID);
  localStorageSaveRatedList(domID);
  redrawTable(domID);// from main handlebars-sortable-table.js file
}

function moveUpRatedItems (itemIndex, domID){
  var removed = ratedLists[domID].splice(itemIndex, 1);
  ratedLists[domID].splice(itemIndex-1, 0, removed.pop());
  localStorageSaveRatedList(domID);
  redrawRatedList(domID);
}

function moveDownRatedItems (itemIndex, domID){
  var removed = ratedLists[domID].splice(itemIndex, 1);
  ratedLists[domID].splice(itemIndex+1, 0, removed.pop());
  localStorageSaveRatedList(domID);
  redrawRatedList(domID);
}

function localStorageSaveRatedList(domID){
  var storedRatedLists = localStorage.getObj("storedRatedLists");
  if (!storedRatedLists){storedRatedLists = {};}
  storedRatedLists[domID]= ratedLists[domID];
  localStorage.setObj("storedRatedLists" , storedRatedLists);
}

function localStorageRetrieveOnLoad(){
  var storedRatedLists = localStorage.getObj("storedRatedLists");
  if (!storedRatedLists){
    storedRatedLists = {};
  }
  Object.keys(storedRatedLists).forEach(function(domIDkey){
    // we currently only have one rating list but are preparing for it to be an object
    var thisList = storedRatedLists[domIDkey];
    ratedLists[domIDkey] = thisList;
    setTimeout(function(){
      redrawRatedList(domIDkey);
      markRetrievedItemsSelected(domIDkey, thisList);
    } , 700);
  });
}


function markRetrievedItemsSelected(domID, storedList){
  ourHBdataStore[domID].items.forEach(function(item){
    storedList.forEach(function(storedItem){
      if (item.ID === storedItem.ID){ item.selected = true;}
    });
  });
  redrawTable(domID);
}
localStorageRetrieveOnLoad();