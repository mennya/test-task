angular
	.module('agg.core')
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('errorHandlerInterceptor');
	});

angular
	.module('agg.core')
	.factory('errorHandlerInterceptor', errorHandlerInterceptor);

function errorHandlerInterceptor($q, notification) {
	var $state;

	function getState() {
		if (!$state) $state = $injector.get('$state');
		return $state;
	}

	return {
		'response': function (response) {
			return response || $q.when(response);
		},
		'responseError': function (rejection) {

			switch (rejection.status) {
				case 400:
					notification.error('Bad request.');
					break;
				case 404:
					notification.error('Sorry, requested resource not found :(');
					break;
				case 500:
					notification.error('Sorry, something went wrong. The server returned a 500 "Internal Server Error" ');
					break;
			}

			if ([400, 404, 500].indexOf(rejection.status) > -1) getState().go('app.404');

			return $q.resolve(rejection);
		}
	};
}
