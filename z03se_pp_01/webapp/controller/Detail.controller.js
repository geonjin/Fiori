sap.ui.define(
    ["sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    , "sap/ui/model/Filter"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel , Filter) {
      "use strict";
  
      return Controller.extend("z03sepp01.controller.Detail", {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
  
          this.oRouter
            .getRoute("Detail")
            .attachPatternMatched(this._onPatternMatched, this);

          var oData = new JSONModel({
            list :[]
          })
          this.getView().setModel(oData,'Detail');

          // var aData = new JSONModel({
          //   arr : []
          // })
          // this.getView().setModel(aData,'Exdt');
        },
  
        /**
         * Route Pattern이 URI와 일치할 경우 실행
         * Title text 세팅
         */
        _onPatternMatched: function (oEvent) {
          var MT_COD = oEvent.getParameters().arguments;
          
          //main에서 nav로 넘겨준 테이블 정보 가져오기.
          var aa = MT_COD.MT_COD;
          
          //빈 필터 객체
          var afilter = [];
          if(aa){
            var oFilter = new Filter('MT_COD', 'EQ', aa);
            afilter.push(oFilter);

            //차트 이름 설정
            var oChart = this.getView().byId("idQual"); //검수 수량 차트 타이틀 설정
            var oChart2 = this.getView().byId("idExdt"); //유통기한 차트 타이틀 설정
            if(aa == "MM00000002"){
              oChart.setVizProperties({title:{text: "딸기 품질"}})
              oChart2.setVizProperties({title:{text: "딸기 유통기간"}})
            }
            else if(aa == "MM00000007"){
              oChart.setVizProperties({title:{text: "오이 품질"}})
              oChart2.setVizProperties({title:{text: "오이 유통기간"}})
            }
            else if(aa == "MM00000012"){
              oChart.setVizProperties({title:{text: "토마토 품질"}})
              oChart2.setVizProperties({title:{text: "토마토 유통기간"}})
            }
          }

          var oModel = this.getView().getModel('Detail');
          //main 테이블에서 선택한 row에 맞는 정보를 가져오기위함. -> 필터를 건다.
          this.getView().getModel().read(`/Z03SE_PPT_QUALSet`, {
            filters : afilter,
            success : function(oReturn){
                // 서버에서 얻은 값을 success 함수의 파라미터 변수 값에서 JSON Data 형태로 얻을 수 있다.
                //위 init 함수에서 만든 모델 사용
                oModel.setProperty("/list", oReturn.results);           // 1. 
             
            }
        })
        },
  
        /**
         * 닫기 버튼 클릭 시 메인화면으로 이동
         */
        handleClose: function () {
          let oNextUIState = this.getOwnerComponent()
            .getHelper()
            .getNextUIState(0);
          this.oRouter.navTo("Main", { layout: oNextUIState.layout });
        },
  
        /**
         * 풀스크린 모드 세팅
         */
        handleFullScreen: function () {
          this.bFocusFullScreenButton = true;
          var sNextLayout = "MidColumnFullScreen"; //sap.f.LayoutType
          this.oRouter.navTo("Detail", {
            layout: sNextLayout,
            product: this._product,
          });
        },
        /**
         * 풀스크린 모드 종료
         */
        handleExitFullScreen: function () {
          this.bFocusFullScreenButton = true;
          var sNextLayout = "TwoColumnsMidExpanded"; //sap.f.LayoutType
  
          this.oRouter.navTo("Detail", {
            layout: sNextLayout,
            product: this._product,
          });
        },
  
        onGoDetailDetail: function() {
          this.oView.getParent().getParent().setLayout("ThreeColumnsMidExpanded");
          this.oRouter.navTo("DetailDetail", {
            layout: "ThreeColumnsMidExpanded",
            product: this._product,
          });
        }
      });
    }
  );
  