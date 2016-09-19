angular
	.module('agg.core.sidenav')
	.filter('humanizeDoc', humanizeDoc)
	.filter('nospace', nospace);

function humanizeDoc() {
	return function (doc) {
		if (!doc) return;

		if ('directive' === doc.type) {
			return doc.title.replace(/([A-Z])/g, function reg($1) {
				return '-' + $1.toLowerCase();
			});
		}

		return doc.label || doc.title;
	};
}

function nospace() {
	return function (value) {
		return (!value) ? '' : value.replace(/ /g, '');
	};
}