sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/f/LayoutType",
      "sap/ui/model/json/JSONModel",
      "sap/ui/model/Filter"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, LayoutType, JSONModel,Filter) {
      "use strict";
  
      return Controller.extend("z03sepp01.controller.Main", {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oView = this.getView();
  
          this.oView.setModel(
            new JSONModel({}),"main");


        },
  
        /**
         * 아이템 클릭 시 미드컬럼 페이지 확장
         */
        onListItemPress: function (oEvent) {
          var sPath = oEvent.getSource().getBindingContextPath();
          var oData = this.getView().getModel().getObject(sPath);
          var oNextUIState = this.getOwnerComponent()
            .getHelper()
            .getNextUIState(1);
  
          
          this.oView
            .getParent()
            .getParent()
            .setLayout(LayoutType.TwoColumnsMidExpanded);

          this.oRouter.navTo("Detail", {
            layout: oNextUIState.layout,
            MT_COD: oData.MT_COD,
          
          });

        },
  
        onGoNewPage: function () {
          this.oView.getParent().getParent().setLayout("MidColumnFullScreen");
          this.oRouter.navTo("NewPage", {
            layout: "MidColumnFullScreen",
            product: this._product
          });
        },
        onSearch(){
 
          var oData = this.getView().getModel('main').getData();
          var aFilter1 = [];

          if(oData.OrdNum ){
            var oFilter1 = new Filter({
              path : 'ORD_NUM',
              operator : 'EQ',
              value1 : oData.OrdNum,
              value2 : ''
            });
            aFilter1.push(oFilter1);
          }
debugger;
          if(oData.MtCod ){
            var oFilter1 = new Filter({
              path : 'MT_COD',
              operator : 'EQ',
              value1 : oData.MtCod,
              value2 : ''
            });
            aFilter1.push(oFilter1);
          }

          if(oData.OrdNum && oData.MtCod){
            var oFilter1 = new Filter({
              path : 'ORD_NUM',
              operator : 'EQ',
              value1 : oData.OrdNum,
              value2 : oData.MtCod
            });
            aFilter1.push(oFilter1);
          }
          

          this.byId("productTable").getBinding("items").filter(aFilter1);
        },
        onValueHelp(){
          debugger;
         

        }
  
      });
    }
  );
  