sap.ui.define([
    "sap/ui/core/mvc/Controller" ,"sap/ui/core/routing/History" ,"sap/ui/model/Filter"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller,History,Filter) {
    "use strict";

    var path ;

    return Controller.extend("odata.project0207.controller.Detail", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter(); // 라우터 객체 가져오기

            // detail라우터에 패턴 매치드 이벤트 붙이기
            //현재 컨트롤러에 있는 매소드중 라우터 패턴이 일치할때마다 실행 하겠다는 의미
            oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);   // routedetail은 manifest.json에서 만듬

        },
        //detail 페이지 실행 될때마다 실행,라우터 패턴이 "일치할때마다"실행
        _patternMatched(oEvent){
            // debugger
            //이벤트 객체의 파라미터 정보에 arguments에서 넘겨 받은 데이터 확인 
            var oArgu = oEvent.getParameters().arguments;
            //oArgu => {OrderID : "hihi", option :123}

            this.byId("detail").setTitle(oArgu.OrderID + oArgu.option);
            this.byId("oInput").setValue("커스텀아이디:" + oArgu.option);

            //'/Orders(10248)' 데이터 바인딩
            //detail뷰에 text4개 바인딩 정보 넘기기
            //orderid기준으로 /orders에 정보 그 json객체 안에 정보를 가져오는 것.
            this.getView().bindElement(`/Orders(${oArgu.OrderID})`);

            path = oArgu.OrderID;
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
            //모델 생성
            var oDataModel = this.getView().getModel();

            //필터 객체 생성인데 축소 한 코드로 함.
            var oFilter = new Filter('CustomerID','EQ','VINET')

            // oDataModel.read("경로(path)",{파라미터}), segw url :  odataservice_srv/CarrierSet?$=CustomerID eq 'VINET'
            oDataModel.read("/Orders",{
                filters: [oFilter],            // 필터 적용 배열 안에다가 넣어야함.
                success: function(oReturn){
                    debugger;
                    oReturn.results; // [{},{},{},{}...] 이런식으로 oResult.results안에 담겨 있음 json 객체 같이
                }
            })
            
            //단건 조회
            // oDataModel.read(`/Orders(${path})`,{
            //     success: function(oReturn){
            //         debugger;
            //         // oReturn;
            //     }
            // })

        }

    });
});
