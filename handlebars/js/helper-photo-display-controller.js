function chooseDisplayItem(domID, index){
    var thisTable = ourHBdataStore[domID]
    var items = thisTable.items;
    var displayCol = thisTable.actionOptions;
    var displayKey = thisTable["colNames"][0];//finds the name of the first col to use as a key
    var displayAlt = items[index][displayKey];//will need to live with the first col data in this simple demo
    var displayString = items[index][displayCol];
    setAllUnchecked(items);
    // this functions as a select table - you cannot uncheck an item
    items[index].selected = true;
    redrawTable(domID);
    drawDisplayItem(domID, displayString, displayAlt);
}

function drawDisplayItem(domID, colContent, alt){
    var domIdDisplay = '#' + domID + "display";
    //only handles photos currently - could do a regex looking for a photo extension
    var displayContent = '<img src="/images/' + colContent + '" alt="' + alt + '">';
    $(domIdDisplay).html(displayContent);
}