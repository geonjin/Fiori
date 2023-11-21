sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/f/LayoutType",
      "sap/ui/model/json/JSONModel",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, LayoutType, JSONModel) {
      "use strict";
  
      return Controller.extend("z03sepp01.controller.Main", {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oView = this.getView();
  
          this.oView.setModel(
            new JSONModel({
              data: [
                { name: "hihi", age: "123" },
                { name: "hihi", age: "123" },
                { name: "hihi", age: "123" },
              ],
              fullName: "My Name",
            }),
            "main"
          );


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
        }
  
      });
    }
  );
  