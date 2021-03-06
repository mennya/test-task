angular
	.module('agg.core.sidenav')
	.controller('SidenavController', SidenavController);

function SidenavController($scope, $mdMedia, APP_CONSTS, aggSettings, aggMenu) {
	var vm = this;

	vm.APP_CONSTS = APP_CONSTS;
	vm.sidenavLocked = aggSettings.sidenavLocked;
	vm.lock = lock;
	vm.nav = aggMenu.navRoutes;

	$scope.$watch(function() {
		return !$mdMedia('gt-sm');
	}, function(xs) {
		vm.mobile = (xs === true);
		xs === true ? vm.sidenavLocked = false : true;
	});

	function lock() {
		// or after unlocking sidenav closes and opens simultaneously
		vm.opened = !vm.sidenavLocked;

		aggSettings.sidenavLocked = vm.sidenavLocked = !vm.sidenavLocked;
	}

}