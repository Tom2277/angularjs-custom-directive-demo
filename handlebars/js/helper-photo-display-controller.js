function chooseDisplayItem(domID, index){
    // console.log("first the domID and then the index", domID, index);
    var thisTable = ourHBdataStore[domID]
    var items = thisTable.items;
    var displayCol = thisTable.actionOptions;
    var displayKey = thisTable["colNames"][0];//finds the name of the first col to use as a key
    var displayAlt = items[index][displayKey];//will need to live with the first col data in this simple demo
    var displayString = items[index][displayCol];
    console.log("displayCol is : ", displayCol);
    setAllUnchecked(items);
    // this functions as a select table - you cannot uncheck an item
    items[index].selected = true;
    redrawTable(domID);
    drawDisplayItem(domID, displayString, displayAlt);
  }

function drawDisplayItem(domID, string, alt){
    var domIdDisplay = '#' + domID + "display";
    console.log("the domIdDisplay", domIdDisplay);
    //only handles photos currently - could do a regex looking for a photo extension
    var displayContent = '<img src="' + string + '" alt="' + alt + '">';
    $(domIdDisplay).html(displayContent);
}