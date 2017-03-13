angular
  .module('demo-directive-app')
  .controller('PhotoDisplayController', PhotoDisplayController);

  PhotoDisplayController.$inject = ['$scope', '$localStorage'];

  function PhotoDisplayController($scope, $localStorage){
    var vm = this;

    // NOTE - this is a hardwired very simple controller made only to show the sortable table
    // directive in action. I made two quick controllers that could both be accessed by same directive
    // To see a way a controllers can be structured for multiple uses within a controller
    // see my handlebars-sortable-table-helper repo at github. 
    // The local storage currently works only once per web site but multi-use in that other repository
    vm.itemsInSet = tomsPhotos;
    vm.$storage = $localStorage.$default({
      chosenPhoto: vm.itemsInSet[0]
    });
    vm.chosenPhoto = vm.$storage.chosenPhoto;

    vm.pickPhoto = pickPhoto;
    setItemsSelected();                             // should pass a list

    function setItemsSelected(){                    // avoid this
      vm.itemsInSet.forEach(function(item){
        if (vm.chosenPhoto.title === item.title){   // avoid this hardwired reference
          item.selected = true;
        }else{
          item.selected = false;
        }       
      });
    }

    function pickPhoto(selectedItem){
      vm.chosenPhoto = selectedItem;                // again.. just for the demo
      vm.$storage.chosenPhoto=selectedItem;
      setItemsSelected();
    }
  }
