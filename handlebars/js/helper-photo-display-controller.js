function chooseDisplayItem(domID, index){
    var thisTable = ourHBdataStore[domID];
    var items = thisTable.items;
    var displayCol = thisTable.actionOptions;
    var displayKey = thisTable["colNames"][0];//finds the name of the first col to use as a key
    var displayAlt = items[index][displayKey];//will need to live with the first col data in this simple demo
    var displayInfo = items[index][displayCol];//could be either a URL or block of Markdown(if implemented)
    setAllUnchecked(items);
    // this functions as a select table - you cannot currently uncheck an item
    items[index].selected = true;
    redrawTable(domID);
    drawDisplayItem(domID, displayInfo, displayAlt);
    localStorageSaveDisplayItem(domID, { "content": displayInfo, "alt": displayAlt, "ID":items[index].ID} );
}

function drawDisplayItem(domID, colContent, alt, ID){
    var domIdDisplay = '#' + domID + "_display";
    //only handles photos currently - could do a regex looking for a photo extension else text content
    var displayContent = '<img src="/images/' + colContent + '" alt="' + alt + '">';
    $(domIdDisplay).html(displayContent);
    // $(domIdDisplay).html(displayContent).hide().fadeIn(400);
}

function localStorageSaveDisplayItem(domID, item){
    var existingItems = localStorage.getObj("displayItems");
    if (!existingItems){ existingItems = {}; }
    existingItems[domID] = item;
    localStorage.setObj("displayItems", existingItems);
}

function localStorageRetreiveOnPageLoad(){
    var displayItems = localStorage.getObj('displayItems');
    if (!displayItems){
        //set defaults or {}
        displayItems = { phototable1:{ content: "tom-landrover-moose.png", alt: "Alaska Moose Antlers on an Old Land Rover", "ID": "tp001"}};
        localStorage.setObj("displayItems", displayItems);
    }
    Object.keys(displayItems).forEach(function(domIDkey){
        //wait for dom to load
        setTimeout(function(){
            var drawItem = displayItems[domIDkey]
            drawDisplayItem( domIDkey, drawItem.content, drawItem.alt, drawItem.ID);
            markItemAsSelected(domIDkey, displayItems[domIDkey]);
        }, 700);
    });
}

function markItemAsSelected(domID, storedItem){
    ourHBdataStore[domID].items.forEach(function(item){
        console.log("boo it got away", item, storedItem);

        if (item.ID === storedItem.ID){ item.selected = true;
            console.log("hurrah we found one", item, storedItem);
        }
    });
    redrawTable(domID);
}

localStorageRetreiveOnPageLoad();