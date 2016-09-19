angular
	.module('agg.core')
	.service('aggLocalStorage', AggLocalStorage);

function AggLocalStorage($window) {
	this._localStorage = $window.localStorage;
	this._prefix = 'agg-';
}

AggLocalStorage.prototype.set = function (key, value) {
	if ('object' === typeof value) value = JSON.stringify(value);
	this._localStorage.setItem(this._prefix + key, value);
};

AggLocalStorage.prototype.get = function (key) {
	return JSON.parse(this._localStorage.getItem(this._prefix + key));
};

AggLocalStorage.prototype.del = function (key) {
	return this._localStorage.removeItem(this._prefix + key);
};