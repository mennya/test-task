angular
	.module('agg.core')
	.config(config)
	.run(run);

function config($locationProvider, $compileProvider) {

	$locationProvider.html5Mode(true);
	$compileProvider.debugInfoEnabled(false);

}

function run($rootScope, $mdSidenav, APP_CONSTS, $state) {

	// for swipe
	$rootScope.$mdSidenav = $mdSidenav;

	$rootScope.APP_CONSTS = APP_CONSTS;

	// app title
	$rootScope.$on("$stateChangeSuccess", function () {
		_.forEach($state.$current.views, function (key, val) {
			if ($state.$current.locals[val].title) $rootScope.title = $state.$current.locals[val].title;
		});
	});

	// close sidenav after state change
	$rootScope.$on('$stateChangeStart',
		function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {

			if (fromParams.skipSomeAsync) return;

			event.preventDefault();

			if ($mdSidenav('left').isOpen()) {
				$mdSidenav('left').close().then(continueNavigation);
			} else {
				continueNavigation();
			}

			function continueNavigation() {
				fromParams.skipSomeAsync = true;
				$state.go(toState.name, toParams);
			}
		}
	);

}