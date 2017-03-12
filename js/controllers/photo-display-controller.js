angular
  .module('demo-directive-app')
  .controller('PhotoDisplayController', PhotoDisplayController);

  PhotoDisplayController.$inject = ['$scope', '$localStorage'];

  function PhotoDisplayController($scope, $localStorage){
    var vm = this;

    vm.message = "test message PHOTO PhotoDisplayController";
    vm.itemsInSet = tomsPhotos;
    vm.$storage = $localStorage.$default({
      chosenPhoto: vm.itemsInSet[0]
    });
    vm.chosenPhoto = vm.$storage.chosenPhoto;

    vm.pickPhoto = pickPhoto;
    setItemsSelected();

    function setItemsSelected(){
      vm.itemsInSet.forEach(function(item){
        if (vm.chosenPhoto.title === item.title){
          item.selected = true;
        }else{
          item.selected = false;
        }       
      });
    }

    function pickPhoto(selectedItem){
      vm.chosenPhoto = selectedItem;
      vm.$storage.chosenPhoto=selectedItem;
      setItemsSelected();
    }
  }
