sap.ui.define([
        "sap/ui/core/mvc/Controller", "sap/ui/core/Fragment", "sap/ui/model/Filter"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Filter) {
        "use strict";

        return Controller.extend("odata.project0207.controller.Main", {
            onInit: function () {

                var oModel = new sap.ui.model.json.JSONModel({CustomerID: ''});

                this
                    .getView()
                    .setModel(oModel, "main");
            },

            formatter: {

                fnDateToString(value) {

                    if (value) {
                        // debugger;

                        var oFormat = sap
                            .ui
                            .core
                            .format
                            .DateFormat
                            .getDateInstance({pattern: 'yyyy-MM-dd'});

                        return oFormat.format(value);
                    }
                },
                fnFreightSum(via, freight) {
                    if (via && freight) {

                        return via * Number(freight); // Number(freight) 는 문자열을 int로 변환 한것

                    }
                }
            },
            onValueHelp() {
                // debugger; var oCustomor = sap.ui.getCore().byId("idCustomor"); var oModel =
                // this.getView().getModel();  fragment 파일에서 불러오려면 따로 model을 만들어야함 뷰에 fragment파일
                // 안만들고 바로 붙이면 byid로 부르면 되는데 프레그먼트 만들었으니
                var oCustomor = this
                    .getView()
                    .byId("idCustomor"); // view에다가 입혀서 바로 id로 불러올수 있음

                if (!oCustomor) {
                    Fragment
                        .load({
                            name: 'odata.project0207.view.fragment.Customor', type: 'XML', controller: this // 소문자로 하고 다이얼로그 박스에 버튼 만들었는데 컨트롤러가 없으니까 여기에 지정하기 위함
                        })
                        .then(function (oCustomor) {
                            // oCustomor.setModel(oModel); fragment 파일에서 불러오려면 따로 model을 만들어야함
                            oCustomor.open();
                        });
                } else {
                    oCustomor.open();
                }

            },
            onClose(oEvent) {
                // debugger; var oCustomor = sap.ui.getCore().byId("idCustomor");  다이얼로그 박스에 id를
                // 부여하고 가져오기 위함.
                oEvent.getSource().getParent().close(); //getsource=이벤트가 일어난 위체 getparents는 그 바로 윗단계를 close
                // oCustomor.close();

            },
            //serch 구현
            onSearch() {

                // debugger;
                //getView().getValue가 아닌 model을 사용해서 하기 전자로 하면 2개의 값을 한번에 받기 때문에 어려움
                var oData = this.getView().getModel("main").getData(); // 사용자 입력값 받기 위함 -> { CustomerID: ''} 으로 들어가있을겨

                var aFilter = []; // 사용자 입력값이 없으면 빈배열이 들어감.
                
                if (oData.CustomerID) {

                    // new Filter({})
                    var oFilter = new Filter({
                        path: 'CustomerID', // 필터 대상 필드 이름
                        operator: 'EQ', //조건 (eq,ne,gt등)
                        value1: oData.CustomerID, // from값
                        value2: '' // to 값
                    }); // 객체 만들어서 변수로 빼기
                    //IF문은 사용자 입력값이 있을때만 필터를 걸기 위함.
                    // var oFilter = new Filter('CustomerID','EQ',oData.CustomerID);  -> 위에 구문을 축약한것. 파라미터로도 가능

                    aFilter.push(oFilter); // Odata.customerid가 있을때만 push하라고.
                }
                
                if (oData.OrderDateFrom) {

                    // new Filter({}) , 즉 새로운 필터 객체 만드는것
                    var oFilter = new Filter({
                        path: 'OrderDate', // 필터 대상 필드 이름
                        operator: 'BT', //조건 (eq,ne,gt등)
                        value1: oData.OrderDateFrom, // from값
                        value2: oData.OrderDateTo // to 값
                    }); // 객체 만들어서 변수로 빼기
                    //IF문은 사용자 입력값이 있을때만 필터를 걸기 위함.
                    // var oFilter = new Filter('CustomerID','EQ',oData.CustomerID);  -> 위에 구문을 축약한것. 파라미터로도 가능

                    aFilter.push(oFilter); // Odata.customerid가 있을때만 push하라고.
                }



                this.byId("idTable").getBinding("items").filter(aFilter); // table에 필터를 걸기 위해서 테이블 id가져오고 거기서 items에 바인딩 걸어놨으니까
                // items 넣어줌
                

            },
            //테이블 이벤트 
            onRowSelectionChange(oEvent){
                

                //선택 행 정보 뽑아오기.
                // var spath = oEvent.getParameters().rowContext.getPath();
                // var obj = this.getView().getModel().getProperty(spath);


                //선택한 row값을 한번에 가져오는것.
                var obj2 = oEvent.getParameters().rowContext.getObject();
                var aa = obj2.CustomerID;
                // var aa = obj2
                // alert(obj2.CustomerID);
                
                // 다이얼로그페이지에 close버튼에 press이벤트를 여기서 태우는것 그러면 테이블 행 더블클릭하면 onClose()함수 타서 닫아짐.
                this.getView().byId("idCustClose").fireEvent('press');

                //창을 닫으면서 가져온 customerID값 가져와서 메인에 INPUT에 넣어줌.
                // this.getView().byId("oInput").setValue(aa); 

                this.getView().getModel('main').setProperty("/CustomerID",obj2.CustomerID);
                
            },

            //page 4 - 라우터 실행 버튼 이벤트
            onNavDetail(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail",{  // navTo로 이동하기 전에 라우터 객체가 필요함. 
                     OrderID:"HI", // 필수 파라미터 -> 파라미터 정보
                     option: 123 // 선택 파라미터

                    })
            },
            onSelectDetail(oEvent){
                // debugger;
                //경로얻기
                var spath = oEvent.getParameters().listItem.getBindingContextPath();
                //경로아는 상태에서 필드 하나 잡아서 getProperty해서 가져오기.
                var obj = this.getView().getModel().getProperty(spath).OrderID;
                var obj2 = this.getView().getModel().getProperty(spath).CustomerID;


                //다른 화면으로 넘기기 로직.
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail",{  // navTo로 이동하기 전에 라우터 객체가 필요함. 
                     OrderID: obj, // 필수 파라미터 -> 파라미터 정보
                     option: obj2  // 선택 파라미터
                    })
                

               
              
            }
        });
    });
