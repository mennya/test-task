angular
	.module('agg.core')
	.config(config)
	.run(run);

function config($locationProvider, $compileProvider) {

	$locationProvider.html5Mode(true);
	$compileProvider.debugInfoEnabled(false);

}

function run($rootScope, $mdSidenav, APP_CONSTS, $state, $mdMedia) {

	// for swipe
	$rootScope.$mdSidenav = $mdSidenav;

	$rootScope.APP_CONSTS = APP_CONSTS;

	// app title
	$rootScope.$on("$stateChangeSuccess", function () {
		_.forEach($state.$current.views, function (key, val) {
			if ($state.$current.locals[val].title) $rootScope.title = $state.$current.locals[val].title;
		});
		// if title length bigger then 33 then do not fit on mobile
		if (!$mdMedia('gt-sm') && $rootScope.title.length > 33) $rootScope.title = $rootScope.title.substring(0, 34) + '..';
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