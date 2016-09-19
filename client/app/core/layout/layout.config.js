angular
	.module('agg.core')
	.config(config);

function config(nyMdIconProvider, $stateProvider) {

	nyMdIconProvider
		.addShapes({
			'chevron_left': 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
			'menu': 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'
		});

	$stateProvider.state('app', {
		abstract: true,
		views: {
			'main@': {
				templateUrl: 'layout.html'
			},
			'toolbar@app'   : {
				templateUrl: 'toolbar.html',
				controller: 'ToolbarController',
				controllerAs: 'vm'
			},
			'sidenav@app'   : {
				templateUrl: 'sidenav.html',
				controller: 'SidenavController',
				controllerAs: 'vm'
			},
		}
	});

}