/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"z03se_pp_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
