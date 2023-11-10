sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel", "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter) {
        "use strict";
        var oJSONModel;
        return Controller.extend("exam.exprogram02.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel,'main');

                var oModel2 = new JSONModel();
                this.getView().setModel(oModel2,'product');
                // oJSONModel = oModel2;

                var oModel3 = new JSONModel();
                this.getView().setModel(oModel3,'frame');


            },
            onSearch(){
                
                var oData = this.getView().getModel("main").getData();
                var aFilter = []; // 사용자 입력값이 없으면 빈배열이 들어감.
                if (oData.CategoryID && oData.CategoryName == null) {
                    // new Filter({})
                    var oFilter = new Filter({
                        path: 'CategoryID', // 필터 대상 필드 이름
                        operator: 'GE', //조건 (eq,ne,gt등)
                        value1: oData.CategoryID, // from값
                        value2: '' // to 값
                    }); 
                    aFilter.push(oFilter); // Odata.customerid가 있을때만 push하라고.
                }

                if (oData.CategoryName && oData.CategoryID == null  ) {

                    // new Filter({})
                    var oFilter = new Filter({
                        path: 'CategoryName', // 필터 대상 필드 이름
                        operator: 'EQ', //조건 (eq,ne,gt등)
                        value1: oData.CategoryName, // from값
                        value2: "" // to 값
                    }); 
                    aFilter.push(oFilter); // Odata.customerid가 있을때만 push하라고.
                }

                if (oData.CategoryID && oData.CategoryName ) {
                    // new Filter({})
                    var oFilter = new Filter({
                        path: 'CategoryID', // 필터 대상 필드 이름
                        operator: 'EQ', //조건 (eq,ne,gt등)
                        value1: oData.CategoryID, // from값
                        value2: oData.CategoryName // to 값
                    }); 
                    aFilter.push(oFilter); // Odata.customerid가 있을때만 push하라고.
                }

                this.byId("idTable").getBinding("items").filter(aFilter); 

            },onSelectDetail(oEvent){
                // debugger;
                // //경로얻기

                var oJSONModel = this.getView().getModel('product');

                let sPath = oEvent.getParameters().listItem.getBindingContextPath();
                let oData = this.getView().getModel().getProperty(sPath).CategoryID;
// 3번 문제 필터
                let afilter = [];
                if (oData) {
                    var oFilter = new Filter('CategoryID', 'EQ', oData);
                    afilter.push(oFilter);
                }
                
                this.getView().getModel().read(`/Products`, {
                    filters : afilter,
                    success : function(oReturn){
                        // oJSONModel.setProperty("/", oReturn);
                        // oJSONModel.setData(oReturn); 
                        oJSONModel.setProperty("/",oReturn);
                        debugger;
                    }
                });

                var oJSONModel2 = this.getView().getModel('frame');
                let afilter1 = [];
                
                let oData1 = this.getView().getModel().getProperty(sPath).CategoryID;

                if (oData1) {
                    var oFilter2 = new Filter('CategoryID', 'EQ', oData1);
                    afilter1.push(oFilter2);
                }
                
                this.getView().getModel().read(`/Sales_by_Categories`, {
                    filters : afilter1,
                    success : function(oReturn){
                        // oJSONModel.setProperty("/", oReturn);
                        // oJSONModel.setData(oReturn); 
                        oJSONModel2.setProperty("/",oReturn);
                    }
                });

                


            },
            onSelect(oEvent){
                // debugger;
                var ProductName = oEvent.getParameters().data[0].data.ProductName; //view에서 만든name이랑 이름이 똑같아야함.
                
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail",{  // navTo로 이동하기 전에 라우터 객체가 필요함. 
                    ProductName: ProductName  // 필수 파라미터 -// view에서 만든name이랑 이름이 똑같아야함.
                      // 선택 파라미터
                    })
            }
        });
    });
