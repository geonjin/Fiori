sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var oModel22;

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {
                // var oModel = new sap
                //     .ui
                //     .model
                //     .json
                //     .JSONModel({CustomerID: ''});

                // this
                //     .getView()
                //     .setModel(oModel, "main");
                var oModel = new sap.ui.model.json.JSONModel({
                    list:[

                    ]
                });
                this.getView().setModel(oModel,"main");
                oModel22 = oModel;

            },
            onRandomPress(){
                // setValue
                var num = Math.floor(Math.random()*100)+1;
                this.getView().byId("oInput").setValue(num);

                var oData = oModel22.getProperty("/list");
                oData.push({num});
                oModel22.setProperty("/list",oData);
                // debugger;
            },
            onClose(oEvent){
                // debugger; var oProduct = sap.ui.getCore().byId("idCustomor");  다이얼로그 박스에 id를
                // 부여하고 가져오기 위함.
                oEvent
                    .getSource()
                    .getParent()
                    .close(); //getsource=이벤트가 일어난 위체 getparents는 그 바로 윗단계를 close
                // oProduct.close();
            },
            openDiolog(){
                var oProduct = this.getView().byId("idProduct");
                oProduct.open();
                
                

            },
            formatter:{
                transformDiscontinued(value){
                    // if(value == true){
                    //     return 'YES';
                    // }else{
                    //     return 'NO';
                    // }
                    return value ? 'YES' : 'NO';
                }
            },
            onValueChange(){   
                // debugger;
                var aa = this.getView().byId("oInput").getValue();
                var oInput = this.byId("oInput");

                


               if( isNaN(aa) == true ){
                //숫자가 아닐경우
                // alert("숫자를 입력");
                oInput.setValueState(sap.ui.core.ValueState.Error);
                oInput.setValueStateText("숫자를 입력해주세요");
               }else if( aa > 100 || aa < 0){
                 oInput.setValueState(sap.ui.core.ValueState.Error);
                 oInput.setValueStateText("1에서 100 사이 값 입력해주소");
                // alert("1부터 100 사이 수 입력");
               }
               else{
               var num = aa;
                // this.getView().byId("oInput").setValue(num);

                var oData = oModel22.getProperty("/list");
                oData.push({num});
                oModel22.setProperty("/list",oData);

               }
                
                // this.getView().byId("oInput").setValue(num);

                // var oData = oModel22.getProperty("/list");
                // oData.push({num});
                // oModel22.setProperty("/list",oData);

            }
        });
    });
