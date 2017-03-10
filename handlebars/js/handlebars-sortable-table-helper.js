//globals
  //variable "demoHandlebarsData" contains demo data/ you could get data via Ajax instead   
  var ourHBdataStore = {}; //each table helper will populate this with both data and table state info

//helpers
Handlebars.registerHelper("sortableTableHelper",function(options){
  var colNames = (options.hash.colNames).split(',');
  //fancy colNames.. for display not for retrieval
  var colLabels = (options.hash.colLabels) ? (options.hash.colLabels).split(',') : colNames;
  // actionOptions extra data for actions (like a destination ID) - false if omitted
  var actionOptions = options.hash.actionOptions || false;
  // sort defaults '1,false' would be by col index 1 descending
  var sortColRaw = (options.hash.sortDefaults) ? (options.hash.sortDefaults).split(",") : [0, true];
  sortColRaw[1] = (sortColRaw[1] !== 'false');
  var sortCol = [colNames[sortColRaw[0]], sortColRaw[1]];
  // you could wrap the following in an ajax call to retrieve external items data
  var tableData = { colNames: colNames, colLabels:colLabels ,items : demoHandlebarsData[options.hash.dataKey], dataKey: options.hash.dataKey, checkAction: options.hash.checkAction, domID: options.hash.domContainerID, actionOptions: actionOptions , sortCol: sortCol};
  // 
  addListToStore(tableData);
  // tableData[sortCol] = ourHBdataStore.sortCol;
  // standard handlebars HTML generation: Get HB template, compile to function, feed it data, place in dom
  var makeDataTableTemplate =   document.getElementById("create-sortable-table").innerHTML;
  var makeDataTableBuilder = Handlebars.compile(makeDataTableTemplate);
  var builtMasterList = makeDataTableBuilder(tableData);
  // as this is a helper, the HTML will be returned, not inserted.
  return new Handlebars.SafeString(builtMasterList);
});

// see conversation at https://gist.github.com/pheuter/3515945 - code taken from comments
// adds a tiny bit of logic to test for equality. used to display glyphicons for active sorting column.
Handlebars.registerHelper('ifeq', (a, b, options) => {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});
// end helpers

function addListToStore(data){
  var domID = data.domID;
  ourHBdataStore[domID] = {};
  ourHBdataStore[domID].dataKey= data.dataKey;
  ourHBdataStore[domID].colNames= data.colNames;
  ourHBdataStore[domID].colLabels= data.colLabels;
  ourHBdataStore[domID].items= data.items;
  ourHBdataStore[domID].checkAction= data.checkAction;
  ourHBdataStore[domID].actionOptions= data.actionOptions;
  ourHBdataStore[domID].sortCol = { col: data.sortCol[0], ascend: data.sortCol[1]};

  //adds a selected/ state to each data item imported
  setAllUnchecked(data.items);
  // sort data by helper options or default first column data
  sortTable(domID, ourHBdataStore[domID].sortCol.col, data.sortCol[1]);
}

function redrawTable(domID){
  var makeDataTableTemplate =   document.getElementById("create-sortable-table").innerHTML;
  var thisTable = ourHBdataStore[domID];
  var tableData = { colNames: thisTable.colNames, colLabels: thisTable.colLabels, items : thisTable.items, dataKey: thisTable.dataKey, checkAction: thisTable.checkAction, domID: domID, actionOptions: thisTable.actionOptions, sortCol:[ thisTable.sortCol.col, thisTable.sortCol.ascend] };
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

function setAllUnchecked(items){
  items.forEach( function(e){
    e.selected = false;
  })
}