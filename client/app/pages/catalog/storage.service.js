angular
	.module('agg.catalog')
	.service('aggStorage', AggStorage);

function AggStorage(APP_CONSTS) {

	this._APP_CONSTS = APP_CONSTS;

}

AggStorage.prototype.getLink = function (id) {
	if ('default' === id) id = this._APP_CONSTS.DEFAULT_COVER_ID;

	return this._APP_CONSTS.STORAGE_HOST + id + '/shared/data';
};