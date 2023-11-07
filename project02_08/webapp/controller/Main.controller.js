sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project0208.controller.Main", {
            onInit: function () {
                var oData = {
                    list : [
                        {name:'aaa', rate:35, cost:10},
                        {name:'bbb', rate:10, cost:12},
                        {name:'ccc', rate:15, cost:13},
                        {name:'ddd', rate:3, cost:14},
                        {name:'eee', rate:25, cost:15},
                        {name:'fff', rate:5, cost:17}
                    ]
                }
                //var oModel = new JSONModel(oData); or var oModel = sap.ui.model.json.JSONModel(oData) 
                this.getView().setModel(new JSONModel(oData),'view');

            }
        });
    });
