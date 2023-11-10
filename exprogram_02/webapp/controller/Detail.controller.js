sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel", "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter) {
        "use strict";
        var oJSONModel;
        return Controller.extend("exam.exprogram02.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter(); // 라우터 객체 가져오기

                var oModel = new JSONModel({});
                this.getView().setModel(oModel,'main1');
    
                // detail라우터에 패턴 매치드 이벤트 붙이기
                //현재 컨트롤러에 있는 매소드중 라우터 패턴이 일치할때마다 실행 하겠다는 의미
                oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);   // routedetail은 manifest.json에서 만듬
    
    
            },
            _patternMatched(oEvent){
                       //메인에서 넘긴 productID, OrderID 즉 url파라미터 정보를 가져오기.
            var oArgu = oEvent.getParameters().arguments;
            
            // 위에서 생성한 모델 가져오기
            var oJSONModel = this.getView().getModel('main1');
            // debugger;
            // 받아올때부터 detail.view.xml페이지의 타이틀을 설정해줌.
            this.getView().byId("idTitle").setText(oArgu.ProductName + "상품의 주문조회");
          

            let afilter = [];
            if (oArgu.ProductName) {
                var oFilter = new Filter('ProductName', 'EQ', oArgu.ProductName);
                afilter.push(oFilter);
            }
            
            this.getView().getModel().read(`/Order_Details_Extendeds`, {
                filters : afilter,
                success : function(oReturn){
                    // oJSONModel.setProperty("/", oReturn);
                    // oJSONModel.setData(oReturn); 
                    oJSONModel.setProperty("/",oReturn);
                }
            });
            }
        });
    });
