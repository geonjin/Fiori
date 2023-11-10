sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odatacrud.controller.main", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel,'main');

            },
            onReadEntitySet(){
                //ui5 api사이트에서 api 레퍼런스탭에서 odatamadel 검색하고 메소드 찾아보기.
                //oData Model 전체 조회
                //전체조회니까 get요청 - > EntitySEt = MemberSet
                //기본 패키지 생성했을때 oData 가 ""으로 되어있어서 걍 불러오면됨 mainfest에서 사용가능
                this.getView().getModel().read("/MemberSet",{
                    success:function(oReturn){
                        //Response Data가  oReturn으로 들어옴
                        debugger;

                    }
                });
            },
            //단건조회 get
            onReadEntity(){
                var oTable = this.getView().byId("idTable");
                var index = oTable.getSelectedIndex();
                var path = oTable.getContextByIndex(index).getPath();
                var oMainModel = this.getView().getModel('main');
                debugger;
                 //데이터 가져오는 방법1
                // this.getView().getModel().getProperty(path);
                //데이터 가져오는 방법2
                this.getView().getModel().read(path,{
                    success: function(oReturn){
                        //oReturn 값에 데이터가 들어가있다.
                        oMainModel.setData(oReturn);
                        debugger;
                    }.bind(this) // success 함수 내에서 this.를 사용했을경우 bind(this)붙여줘야함
                });
                
            },
            //생성post
            onCreate(){
                var oMainModel = this.getView().getModel('main');
                var oData = oMainModel.getData();
                // debugger;
                /* oData 변수에 들어가있는 json data
                    Memid : '입력값',
                    Memnm : '입력값',
                    Telno : '입력값',
                    Email : '입력값',
                */
                // CREATE
                //    this.getView().getModel().create("path",oData,{객체})
                this.getView().getModel().create("/MemberSet",oData,{
                    success: function(oReturn){
                    //   debugger;  
                      sap.m.MessageToast.show("데이터 생성 완료");
                    },
                    error : function(oError){
                        // debugger;
                    }
                })

            },
            //변경(put)
            onUpdate(){
                // /MemberSet('key') + Body
                var oMainModel = this.getView().getModel('main');
                var oData = oMainModel.getData();
                var oDataModel = this.getView().getModel(); // odata모델 , 프젝 생성시 넣던 odata
                
                var path = oDataModel.createKey("/MemberSet",{
                    Memid : oData.Memid
                }); //ex) "/MemberSet('1')"  -> 내가 선택한 것의 키값을 넘겨주는것.
                oDataModel.update(path,oData,{
                    success : function(){
                        sap.m.MessageToast.show("변경 완료");
                    }
                })
            },
            //삭제 Delete
            onDelete(){
                var oMainModel = this.getView().getModel('main');
                var oData = oMainModel.getData();

                var oDataModel = this.getView().getModel(); // odata모델 , 프젝 생성시 넣던 odata
                
                var path = oDataModel.createKey("/MemberSet",{
                    Memid : oData.Memid
                });
                oDataModel.remove(path,oData,{
                    success : function(){
                        sap.m.MessageToast.show("제거 완료");
                    }
                })
            },
            //테이블 행 누르면 바로 위에 input값 4개를 바로 넣어지게
            onChange(oEvent){
                debugger;
                //1번 방법
                // var oTable = this.getView().byId("idTable");
                // var index = oTable.getSelectedIndex();
                // var path = oTable.getContextByIndex(index).getPath();
                // var oMainModel = this.getView().getModel('main');
                // debugger;
                //  //데이터 가져오는 방법1
                // // this.getView().getModel().getProperty(path);
                // //데이터 가져오는 방법2
                // this.getView().getModel().read(path,{
                //     success: function(oReturn){
                //         //oReturn 값에 데이터가 들어가있다.
                //         oMainModel.setData(oReturn);
                //         debugger;
                //     }.bind(this) // success 함수 내에서 this.를 사용했을경우 bind(this)붙여줘야함
                // });

                //2번 방법
                var path = oEvent.getParameters().rowContext.getPath();
                var oSelectionData = this.getView().getModel().getProperty(path);
                
                this.getView().getModel('main').setData({
                    Memid : oSelectionData.Memid,
                    Memnm : oSelectionData.Memnm,
                    Telno : oSelectionData.Telno,
                    Email : oSelectionData.Email
                })
            }
        
        
        
        
        });
    });
