angular
	.module('agg.core')
	.service('aggSettings', AggSettings);

function AggSettings(aggLocalStorage) {
	var that = this;

	this._aggLocalStorage = aggLocalStorage;

	/**
	 * is sidenav locked
	 */
	this.sidenavLocked = null;

	_.forEach(this, function (val, prop) {

		if (null === val) {
			Object.defineProperty(that, prop, {
				get: function () {
					if (that['_' + prop]) return that['_' + prop];
					that['_' + prop] = that._aggLocalStorage.get(prop);
					return that['_' + prop];
				},
				set: function (value) {
					if (!value) {
						that._aggLocalStorage.del(prop);
						delete that['_' + prop];
					} else {
						that._aggLocalStorage.set(prop, value);
						that['_' + prop] = value;
					}
				}
			});
		}

	});

}