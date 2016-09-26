angular
	.module('agg.core')
	.config(notifConf);

function notifConf($mdThemingProvider) {
	$mdThemingProvider.theme('primary-toast');
	$mdThemingProvider.theme('error-toast');
	$mdThemingProvider.theme('success-toast');
	$mdThemingProvider.theme('warning-toast');
}