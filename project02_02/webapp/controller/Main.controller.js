sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Button) {
        "use strict";

        return Controller.extend("project0202.controller.Main", {
            TEXT:{
                'FirstName' : 'A',
                'LastName': 'hihi'
            },

            onInit: function () {
               var sText =  this.TEXT.FirstName;
               console.log(sText);
            },

            onClick:function(oEvent){
                alert(oEvent);
            },

            onChange:function(){
                //input 가져오기.
                var oInput = this.getView().byId("idInput");
                console.log(oInput.getValue());

                // var oText = this.getView().byId("oText"); 
                // oText.setText(oInput.getValue());
                //input에 값이 변경되었을때 onChange메소드 타니까 여기서 변경.
                this.getView().byId("oText").setText(oInput.getValue()); //한줄로 써도됨
                
            }
            
        });
    });

    