angular
	.module('agg.core.404')
	.config(config);

function config($urlRouterProvider, $stateProvider) {

	$stateProvider.state('app.404', {
		url: '/404',
		views: {
			'content@app': {
				templateUrl: '404.html',
			}
		},
		title: '404'
	});
	$urlRouterProvider.otherwise('/404');

}