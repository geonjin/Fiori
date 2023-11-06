sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        var oModel22;

        return Controller.extend("project0203.controller.Main", {

            onInit: function () {
                // this.byId("oInput").setValue("10");
                // this.byId("oInput2").setValue("20");

                var oData = {
                    // list:[
                       
                    // ]
                };
            
                 var oModel = new sap.ui.model.json.JSONModel({
                    combo : [
                        {key : 'PLUS', text : '+'},
                        {key : 'MINUS', text : '-'},
                        {key : 'DIVISION', text : '/'},
                        {key : 'MULTIPLE', text : '*'}
                    ],
                    list:[

                    ]
                    
                 });
                   //-> 풀
                //var oModel = new JSONModel(oData);


                this.getView().setModel(oModel,'main');
                    
                oModel22 = oModel;

            },
            onClick: function() {
                var oinput = this.getView().byId("oInput");
                var oselect = this.getView().byId("oSelect");
                var oinput2 = this.getView().byId("oInput2");
                var result; 
                //var result = oinput.getValue() // oselect.getSelectedItem() oinput2.getValue();
                // var o = oselect.getSelectedItem();
                var num1 = parseInt(oinput.getValue());
                var num2 = parseInt(oinput2.getValue());
                debugger;
                var op = oselect.getSelectedItem().getText();
                var skey = oselect.getSelectedKey();
                // console.log(op);

                switch(skey){

                    case "MULTIPLE":
                        result = num1 * num2;
                        //alert(result);
                        break;
                    
                    case "PLUS":
                        result = num1 + num2;
                        //alert(result);
                        break;
                    case "MINUS":
                        result = num1 - num2;
                        //alert(result);
                        break;
                    case "DIVISION":
                        result = num1 / num2;
                        //alert(result);
                        break;
                    
                }              
                // sap.m.MessageToast.show(result);


                // var oData = oModel22.getProperty("/list");
                // // oModel22.list = [];
                // oData.push({num1,op, num2,result});
                // oModel22.setProperty("/list",oData);
               this._addHistory(num1,num2,op,result);
                
            },

            _addHistory:function(num1,num2,op,result){
                
               var oData = oModel22.getProperty("/list");
             
                oData.push({num1,num2,op,result});
                oModel22.setProperty("/list",oData);
                // debugger;
            }

        });
    });
