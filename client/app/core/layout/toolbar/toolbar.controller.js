angular
	.module('agg.core.toolbar')
	.controller('ToolbarController', ToolbarController);

function ToolbarController(APP_CONSTS, $mdSidenav, $mdMedia, $scope, aggSettings) {
	var vm = this;

	vm.APP_CONSTS = APP_CONSTS;
	vm.$mdSidenav = $mdSidenav;

	$scope.$watch(function () {
		return !$mdMedia('gt-sm') ? false : aggSettings.sidenavLocked
	}, function (show) {
		vm.sidenavLocked = show;
	});

}