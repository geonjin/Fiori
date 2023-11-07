sap
    .ui
    .define(
        [
            "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/viz/ui5/data/FlattenedDataset", "sap/viz/ui5/controls/common/feeds/FeedItem"
        ],
        /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
        function (Controller, JSONModel, FlattenedDataset, FeedItem) {
            "use strict";

            return Controller.extend("project0209.controller.Main", {
                onInit: function () {
                    //onInit 함수 탈때마다 밑에 함수로 이동
                    this._setChartInView();
                    // this._setChartInController();
                },
                _setChartInView() {

                    //여기다가 데이터 객체를 따로 만드는 대신 list.json파일 안에 만들기.
                    var oModel = new JSONModel();
                    oModel.loadData('../model/Products.json'); // json 파일 데이터 업로드하기

                    //var oModel = new JSONModel(oData); or var oModel = sap.ui.model.json.JSONModel(oData)
                    this.getView().setModel(oModel, 'main');

                },
                _setChartInController() {}
            });
        }
    );
