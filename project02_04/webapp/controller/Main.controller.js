sap
    .ui
    .define([
        "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        var oModel22; // 전역으로 쓰기위함

        return Controller.extend("project0204.controller.Main", {
            onInit: function () {

                //json data
                var oData = {

                    name: {
                        firstName: '김',
                        lastName: '건진'
                    },
                    inpValue: {
                        firstName: '박',
                        lastName: '길동'
                    },
                    pageTitle: '페이지 타이틀은 없어', //key는 문자형태로 들어감

                    list: [
                        {
                            name: '안재홍',
                            age: '25',
                            tel: '010-5555-4444'
                        }, {
                            name: '김건진',
                            age: '24',
                            tel: '010-2222-2222'
                        }, {
                            name: '안은솔',
                            age: '24',
                            tel: '010-3333-3333'
                        }
                    ]
                };
                // var oModel = new sap.ui.model.json.JSONModel();  위에다가 생성하지 않고 바로 넣어서 사용가능
                var oModel = new JSONModel(oData); // 객체 생성후 변수 하나에 넣기 , json model
                this
                    .getView()
                    .setModel(oModel, 'main'); // .setModel(모델객체, '모델이름');

                var oModel2 = new JSONModel(oData);
                this
                    .getView()
                    .setModel(oModel2, 'test');

                oModel22 = oModel; // 넣어주고 (전역 변수 위함)
            },
            onClick() {

                // debugger; var oModel = this.getView().getModel('main');   get model 로 불러옴
                // model을 oModel.getData() : 전체 데이터 가져오기 oModel.getProperty(경로) : 특정 데이터 가져오기
                // var oData = oModel22.getData(); console.log(oData.inpValue.firstName
                // ,oData.inpValue.lastName);
                this
                    .byId("oInput")
                    .setValue(oData.inpValue.firstName + oData.inpValue.lastName);

                var oData1 = oModel22.getProperty("/aaaa");
                // console.log(oData1); txtValue는 oData안에 데이터가 원래는 없으나, view에 input값에 넣어서 가져와서
                // set해주는것 ex) <Text  text="{main>/txtValue}"/>
                oModel22.setProperty("/txtValue", oData1); // 경로 설정 해서 넣을때 / 슬래쉬 빼먹지 말기.

            },

            Add(oEvent) {
                // 이벤트 함수에는 항상 import파라미터로 들어오는 event객체가 존재함. oEvent.getSource -> 이벤트를 일으킨 객체 반환
                // debugger; var oModel = this.getView().getModel('main');
                var oData = oModel22.getProperty("/list");

                console.log(oData);
                oData.push({}); // 빈객체 집어 넣기

                oModel22.setProperty("/list", oData);

            },

            Delete() {
                // var oData = oModel22.getData();
                // oData.list.pop(); oModel.setProperty("/main",oData);
                var oData = oModel22.getProperty("/list");
                var oTable = this.byId("table1");
                var aIndices = oTable.getSelectedIndices(); // 선택한 셀 index 배열 가져옴.


                if(aIndices.length == 0){
                    return sap.m.MessageBox.error("데이터를 선택해주쇼");
                }
                else{
                // 인덱스가 작은거 부터 지우면 배열이 말려서 올라가니까 반대로 지우기.
                for(var i = aIndices.length-1; i>=0;i--){
                    oData.splice(aIndices[i],1);
                }
                
                oModel22.setProperty("/list",oData);
            }
             



                // debugger;
                // var b = a.length;

                // for (var i = 0; i<b; i++) {
                //     if(i<1)
                //         oData.splice(a[i], 1);
                //     else
                //         oData.splice(a[i]-i,1);
                    
                // }
                
                oModel22.setProperty("/list", oData);

            },

            onRowActionItem(oEvent) {
                // debugger; 인덱스 정보 가져오기
                var Index = oEvent
                    .getParameter('row')
                    .getIndex();
                // console.log(Index);
                var oData = oModel22.getProperty("/list");

                //선택 로우 인덱스를 사용해서 삭제하기.
                oData.splice(Index, 1);

                //삭제후 적용
                oModel22.setProperty("/list", oData);

            }
        });
    });
