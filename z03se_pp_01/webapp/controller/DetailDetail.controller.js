sap.ui.define(
    ["sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel",
     "sap/ui/model/Filter"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter) {
      "use strict";
  
      return Controller.extend("z03sepp01.controller.DetailDetail", {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter
            .getRoute("DetailDetail")
            .attachPatternMatched(this._onPatternMatched, this);
            
            var oData = new JSONModel({
              list : []
            })
            this.getView().setModel(oData,"DetailDetail");
        },
  
        /**
         * Route Pattern이 URI와 일치할 경우 실행
         */
        _onPatternMatched: function (oEvent) {
           debugger;
            var proNum = oEvent.getParameters().arguments.PRO_NUM;

            var aFilter = [];

            if(proNum){
              var oFilter = new Filter('PRO_NUM','EQ',proNum);
              aFilter.push(oFilter);
            }
            
            var oModel = this.getView().getModel("DetailDetail");

            this.getView().getModel().read(`/Z03SE_PPT_QUALSet`,{
              
              filters : aFilter,
              success: function(oReturn){
                debugger;
                oModel.setProperty("/list",oReturn.results[0]);

              }
            })
        },

      /**
       * 뒤로가기 버튼 클릭 시 이전 화면으로 이동
       */
        onNavButtonPress: function() {
          var oNextUIState = this.getOwnerComponent()
            .getHelper()
            .getNextUIState(1);
  
          this.oView
            .getParent()
            .getParent()
            .setLayout("TwoColumnsMidExpanded");
          this.oRouter.navTo("Detail", {
            layout: oNextUIState.layout,
            product: this._product
          });
        }
      });
    }
  );
  