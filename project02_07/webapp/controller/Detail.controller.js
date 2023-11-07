sap.ui.define([
    "sap/ui/core/mvc/Controller" ,"sap/ui/core/routing/History"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller,History) {
    "use strict";

    return Controller.extend("odata.project0207.controller.Detail", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter(); // 라우터 객체 가져오기

            // detail라우터에 패턴 매치드 이벤트 붙이기
            //현재 컨트롤러에 있는 매소드중 라우터 패턴이 일치할때마다 실행 하겠다는 의미
            oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);   // routedetail은 manifest.json에서 만듬

        },
        //라우터 패턴이 "일치할때마다"실행
        _patternMatched(oEvent){
            // debugger
            //이벤트 객체의 파라미터 정보에 arguments에서 넘겨 받은 데이터 확인 
            var oArgu = oEvent.getParameters().arguments;
            //oArgu => {OrderID : "hihi", option :123}

            this.byId("detail").setTitle(oArgu.OrderID + oArgu.option);
            this.byId("oInput").setValue("커스텀아이디:" + oArgu.option);
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
		}
    });
});
