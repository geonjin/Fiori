sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,FlattenedDataset,FeedItem) {
        "use strict";

        return Controller.extend("project0208.controller.Main", {
            onInit: function () {

                //onInit 함수 탈때마다 밑에 함수로 이동 
                this._setChartInView();
                this._setChartInController();

            },
            _setChartInView(){
                //여기다가 데이터 객체를 따로 만드는 대신 list.json파일 안에 만들기.
                var oModel = new JSONModel();
                oModel.loadData('../model/List.json'); // json 파일 데이터 업로드하기

                //var oModel = new JSONModel(oData); or var oModel = sap.ui.model.json.JSONModel(oData) 
                this.getView().setModel(oModel,'view');
            },
            _setChartInController(){

                var oModel = new JSONModel();
                oModel.loadData('../model/Sales.json'); // json 파일 데이터 업로드하기
               
                this.getView().setModel(oModel,'cont');

                //chart
                var oChart = this.getView().byId("idChart");
                //dataset
                var  oDataSet = new FlattenedDataset({
                    dimensions: [
                        {name : 'Product', value : '{cont>product}' }
                    ],
                    measures: [
                        {name : 'Amount', value : '{cont>amount}' }
                    ],
                    data: { path : 'cont>/sales' }
                });

                oChart.setDataset(oDataSet);

                //feed
                var feedValueAxis = new FeedItem({
                    uid : "valueAxis",
                    type : "Measure",
                    values : ["Amount"]
                });
                var feedCategoryAxis = new FeedItem({
                    uid : "categoryAxis",
                    type : "Dimension",
                    values : ["Product"]
                });

                oChart.addFeed(feedValueAxis);
                oChart.addFeed(feedCategoryAxis);

                //(optional) proeprty setting
                oChart.setVizProperties({
                    title: {text: 'Sales Data'},
                    plotArea : {colorPalette:['#6799FF','#86E57F']}  
                })

                //타입
                oChart.setVizType("bar")
            }
        });
    });