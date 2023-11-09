sap.ui.define([
    "sap/ui/core/mvc/Controller" ,"sap/ui/core/routing/History" ,"sap/ui/model/Filter","sap/ui/model/json/JSONModel"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller,History,Filter,JSONModel) {
    "use strict";

    var path ;

    return Controller.extend("sap.btp.ux410solving.controller.Detail", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter(); // 라우터 객체 가져오기

            var oModel = new JSONModel({});
            this.getView().setModel(oModel,'main');

            // detail라우터에 패턴 매치드 이벤트 붙이기
            //현재 컨트롤러에 있는 매소드중 라우터 패턴이 일치할때마다 실행 하겠다는 의미
            oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);   // routedetail은 manifest.json에서 만듬


        },
        //detail 페이지 실행 될때마다 실행,라우터 패턴이 "일치할때마다"실행
        _patternMatched(oEvent){

            //메인에서 넘긴 productID, OrderID 즉 url파라미터 정보를 가져오기.
            var oArgu = oEvent.getParameters().arguments;
            
            // 위에서 생성한 모델 가져오기
            var oJSONModel = this.getView().getModel('main');
            debugger
            // 받아올때부터 detail.view.xml페이지의 타이틀을 설정해줌.
            this.getView().byId("idTitle").setText("OrderID:" + oArgu.OrderID);
          
            // 엘리먼트 바인딩  element-binding
            // 읽어와 뭐를? Oreder_Details 그 json객체에서 (OrderID=${oArgu.OrderID},ProductID=${oArgu.ProductID})에 맞는 정보를
            // oArguOrderID는 메인 뷰에서 차트 눌렀을때 그 정보 보내줌
            this.getView().getModel().read(`/Order_Details(OrderID=${oArgu.OrderID},ProductID=${oArgu.ProductID})`, {
                success : function(oReturn){
                    // 서버에서 얻은 값을 success 함수의 파라미터 변수 값에서 JSON Data 형태로 얻을 수 있다.
                    
                    oJSONModel.setProperty("/", oReturn);           // 1. 
                    

            
                }
            })

        },
        goMain(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMain");
        },
        //뒤로 가기 버튼
        onBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},
        onRead(oEvent){
            // //모델 생성
            // var oDataModel = this.getView().getModel();

            // //필터 객체 생성인데 축소 한 코드로 함.
            // var oFilter = new Filter('CustomerID','EQ','VINET')

            // // oDataModel.read("경로(path)",{파라미터}), segw url :  odataservice_srv/CarrierSet?$=CustomerID eq 'VINET'
            // oDataModel.read("/Orders",{
            //     filters: [oFilter],            // 필터 적용 배열 안에다가 넣어야함.
            //     success: function(oReturn){
            //         debugger;
            //         oReturn.results; // [{},{},{},{}...] 이런식으로 oResult.results안에 담겨 있음 json 객체 같이
            //     }
            // })
            
            // //단건 조회
            // // oDataModel.read(`/Orders(${path})`,{
            // //     success: function(oReturn){
            // //         debugger;
            // //         // oReturn;
            // //     }
            // // })

        }

    });
});
