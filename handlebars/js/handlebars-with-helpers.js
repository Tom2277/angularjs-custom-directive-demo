$( document ).ready(function() {
    $.get('templates/bootstrap-navbar.html', function(navBar) {
      $("#navBar").html(navBar);
    });

    initMain();

});
  //globals
  //variable "demoHandlebarsData" contains demo data/ you could get data via Ajax instead   
  var ourHBdataStore = {} //each table helper will populate this with both data and table state info
  var toggleOrder = true; //all lists on the page share one asc/desc operator 

  //create and insert page layout
  function initMain(){
    var forMainTemplate = document.getElementById("for-main").innerHTML;
    var forMainBuilder = Handlebars.compile(forMainTemplate);
    var forMainHTML = forMainBuilder(this);

    document.getElementById("main-content").innerHTML = forMainHTML;
  }
  
  function addListToStore(data){
    console.log("did sortCol get to storage? : ", data.sortCol);
    var domID = data.domID;
    ourHBdataStore[domID] = {};
    ourHBdataStore[domID].listName= data.listName;   
    ourHBdataStore[domID].colNames= data.colNames;   
    ourHBdataStore[domID].items= data.items;   
    ourHBdataStore[domID].checkAction= data.checkAction;
    ourHBdataStore[domID].toDisplay= data.toDisplay;

    //adds a selected state to each item
    setAllUnchecked(data.items);
    //
    setSortCol(domID, data.sortCol[0], data.sortCol[1]);
    // ourHBdataStore[domID].sortCol = [data.sortCol[0], data.sortCol[1]];
    sortTable(domID, ourHBdataStore[domID].sortCol.col, data.sortCol[1]);
    // sortTable(domID, ourHBdataStore[domID].sortCol[0], data.sortCol[1]);
  }

  //helpers
  Handlebars.registerHelper("makeDataTable",function(options){
      var colNames = (options.hash.colNames).split(',');
      // toDisplay extra data for actions (like a destination ID) - false if omitted
      var toDisplay = options.hash.toDisplay || false;
      // sort defaults '1,false' would be by col index 1 desc
      var sortColRaw = (options.hash.sortDefaults) ? (options.hash.sortDefaults).split(",") : [0, true];
      var sortCol = [colNames[sortColRaw[0]], sortColRaw[1]];
      console.log("this is the sortCol", sortCol);
      // you could wrap the following in an ajax call to retrieve external items data
      var tableData = { colNames: colNames, items : demoHandlebarsData[options.hash.listName], listName: options.hash.listName, checkAction: options.hash.checkAction, domID: options.hash.domContainerID, toDisplay: toDisplay , sortCol: sortCol};
      addListToStore(tableData);
      //standard handlebars HTML generation
      var makeDataTableTemplate =   document.getElementById("make-data-table").innerHTML;
      var makeDataTableBuilder = Handlebars.compile(makeDataTableTemplate);
      var builtMasterList = makeDataTableBuilder(tableData);
      // as this is a helper, the HTML will be returned, not inserted.
      return new Handlebars.SafeString(builtMasterList);
  });
  
  Handlebars.registerHelper('ifeq', (a, b, options) => {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  });
  

  function setSortCol(domID, col, ascend){
    ourHBdataStore[domID].sortCol = { col: col, ascend: ascend};
  }


  function redrawTable(domID){
    var makeDataTableTemplate =   document.getElementById("make-data-table").innerHTML;
    var thisTable = ourHBdataStore[domID];
    var tableData = { colNames: thisTable.colNames, items : thisTable.items, listName: thisTable.listName, checkAction: thisTable.checkAction, domID: domID, toDisplay: thisTable.toDisplay, sortCol:[ thisTable.sortCol.col, thisTable.sortCol.ascend] };
    var makeDataTableBuilder = Handlebars.compile(makeDataTableTemplate);
    var builtMasterList = makeDataTableBuilder(tableData);
    var IDdomID = "#" + domID;
    $(IDdomID).html(builtMasterList);
  }  

  function sortTable(domID, colName, ascend){
    var items = ourHBdataStore[domID].items;
    var compareColValsDescend = function(b,a){
      var aCol =  $.isNumeric(a[colName]) ? a[colName] : a[colName].toString().toLowerCase() ;
      var bCol =  $.isNumeric(b[colName]) ? b[colName] : b[colName].toString().toLowerCase() ;
      return ((aCol < bCol) ? -1 : 1);
    };
    var compareColValsAscend = function(a,b){
      var aCol =  $.isNumeric(a[colName]) ? a[colName] : a[colName].toString().toLowerCase() ;
      var bCol =  $.isNumeric(b[colName]) ? b[colName] : b[colName].toString().toLowerCase() ;
      return ((aCol < bCol) ? -1 : 1);
    };
    ourHBdataStore[domID].items = (ascend) ? items.sort(compareColValsAscend): items.sort(compareColValsDescend);
  }

  function sortByCol(domID, colName){
    var tableSortCol = ourHBdataStore[domID].sortCol;
    if (colName === tableSortCol.col){
      tableSortCol.ascend = !tableSortCol.ascend;
    }else{
      tableSortCol.col = colName;
    }
    sortTable(domID, colName, tableSortCol.ascend);
    redrawTable(domID);
  }
    

  function chooseDisplayItem(domID, index){
    // console.log("first the domID and then the index", domID, index);
    var thisTable = ourHBdataStore[domID]
    var items = thisTable.items;
    var displayCol = thisTable.toDisplay;
    var displayTitle = thisTable["colNames"][0];
    var displayAlt = items[index][displayTitle];
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

  function chooseRatingItem(domID, index){
    console.log("first the domID and then the index", domID, index);
  }


  function setAllUnchecked(items){
    items.forEach( function(e){
      e.selected = false;
    })
  }