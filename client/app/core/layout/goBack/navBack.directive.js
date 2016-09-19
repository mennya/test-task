angular
	.module('agg.core')
	.directive('navBack', navBack);

function navBack($rootScope, $state) {
	return {
		templateUrl: 'nav-back.html',
		link: function (scope, element, attrs) {

			scope.go = go;

			$rootScope.$on("$stateChangeSuccess", getBackState);
			getBackState();

			function getBackState() {
				_.forEach($state.$current.views, function (key, val) {
					scope.backState = $state.$current.locals[val].backState;
				});
			}

			function go() {
				$state.go(scope.backState);
			}

		}
	}
}

