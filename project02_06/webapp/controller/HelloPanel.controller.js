sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("project0206.controller.HelloPanel", {
            onInit: function () {

            },
            OnOpenDialog(){
                var oDialog = sap.ui.getCore().byId("idDialog");

                if(!oDialog) {
                    Fragment.load({
                        name: 'project0206.view.fragment.Diolog',
                        type: 'XML' ,
                        controller : this // 소문자로 하고 다이얼로그 박스에 버튼 만들었는데 컨트롤러가 없으니까 여기에 지정하기 위함
                    }).then(function(oDiolog){
                        oDiolog.open();
                    });
                }
                
                else
                    {
                        oDialog.open();
                    }

                
            },
            onClose(){
                var oDialog = sap.ui.getCore().byId("idDialog"); // 다이얼로그 박스에 id를 부여하고 가져오기 위함.    
                oDialog.close();

            }
        });
    });
