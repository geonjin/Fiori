sap.ui.define([
    "sap/ui/core/mvc/Controller" , "sap/ui/model/Filter", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,JSONModel) {
        "use strict";
        var oModel22;

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {

                var typeList = new sap.ui.model.json.JSONModel({
                    combo : [
                        {type  : 'bar', text : 'bar'},
                        {type  : 'column', text : 'column'},
                        {type  : 'line', text : 'line'},
                        {type  : 'donut', text : 'donut'}
                    ]
                });
                this.getView().setModel(typeList,"main");

            },
            onSearch(){
                //getView().getValue가 아닌 model을 사용해서 하기 전자로 하면 2개의 값을 한번에 받기 때문에 어려움
                var oData = this.getView().byId("idCombo"); // 사용자 입력값 받기 위함 -> { CustomerID: ''} 으로 들어가있을겨
                var oType = this.getView().byId("idType");

                var aFilter = []; // 사용자 입력값이 없으면 빈배열이 들어감.               

                var oVizFrame = this.getView().byId("idVizFrame");

                if(!oType.getValue()){


                    //조회 할때 빈칸이면 안됨.
                    oType.setValueState('Error');
                }else{

                    oType.setValueState();
                    //차트 타입 바꾸기.로직 -------------------------------
                    oVizFrame.setVizType(oType.getValue());
                }
               

                if (oData.getValue()) {

                    // new Filter({})
                    var oFilter = new Filter({
                        path: 'OrderID', // 필터 대상 필드 이름
                        operator: 'EQ', //조건 (eq,ne,gt등)
                        value1: oData.getValue(), // from값
                        value2: '' // to 값
                    }); 
                    aFilter.push(oFilter); 
                }
                //getBinding 중요 --------
                this.byId("idFlattend").getBinding("data").filter(aFilter); // table에 필터를 걸기 위해서 테이블 id가져오고 거기서 items에 바인딩 걸어놨으니까
                // items 넣어줌
            },
            onSelect(oEvent){
                // debugger;
                //oEvent getParameters했는데 값이 안들어 오면 개발자도구에서 타고 들어가기.
                //차트를 클릭했을때 그 클릭한 정보를 getParameters로 가지고 오는데 개발자도구에서 oevent.getparameters.까지 치고 데이터 찾아 들어가서 경로로 가져오기.
                var value = oEvent.getParameters().data[0].data.value; //view에서 만든name이랑 이름이 똑같아야함.
                var value1 = oEvent.getParameters().data[0].data.value1;

                //다른 화면으로 넘기기 로직.
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail",{  // navTo로 이동하기 전에 라우터 객체가 필요함. 
                     OrderID: value , // 필수 파라미터 -// view에서 만든name이랑 이름이 똑같아야함.
                     ProductID: value1  // 선택 파라미터
                    })
            }
        });
    });
