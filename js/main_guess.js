summerready = function () {
   //  var carChoice = document.getElementById("carChoice");
// 租赁方式
    $("#select2_dummy").on("click", function () {
        var data = ["直接租赁","售后回租","原车融租"];
        var htmlStr = "";
        htmlStr += '<select id="select2">';
        data.forEach(function(item,index){
            htmlStr += '<option>'+item+'</option>';
        })
        htmlStr += '</select>';
        $(".selectComponey").append(htmlStr);
        $(function () {
            // var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date'
                },
                'select': {
                    preset: 'select'
                }
            };
            $('#select2').scroller('destroy').scroller(
                $.extend(opt['select'], {
                    theme: "ios7",
                    mode: "scroller",
                    display: "bottom",
                    animate: ""
                })
            );
        });
    })
// 经销商
    $("#select1_dummy").on("click", function () {
        var data = ["北京奥申汽车销售有限公司","上海奥申汽车销售有限公司","南京奥申汽车销售有限公司","天津奥申汽车销售有限公司","广州奥申汽车销售有限公司"];
        var htmlstr = "";
        htmlstr += '<select id="select1">';
        data.forEach(function (item,index) {
            htmlstr += '<option>'+ item +'</option>';
        })
        htmlstr += '</select>';
        $(".seller_componey").append(htmlstr);
        $(function () {
            // var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date'
                },
                'select': {
                    preset: 'select'
                }
            };
            $('#select1').scroller('destroy').scroller(
                $.extend(opt['select'], {
                    theme: "ios7",
                    mode: "scroller",
                    display: "bottom",
                    animate: ""
                })
            );
        });
    })
// 选择车型接口
    $("#carChoice").on("click", function () {
        window.location.href="./car_choice.html";
        summer.callAction({
            "viewid" : "com.yyjr.ifbp.fin.controller.IFBPFINController", //后台带包名的Controller名
            "action" : "handler", //方法名
            "params" : {
                "transtype":"urlparamrequest",
                "requrl":"http://10.4.102.31:8082/fin-ifbp-base/fin/productMgt/productHList",
                "reqmethod":"GET",
                "chamc_mobiletoken": "",
                "reqparam":"username=15110123504&password=111111"
            }, //自定义参数
            "callback" : carcallback, //请求回来后执行的ActionID
            "error" : carerror //失败回调的ActionId
        });
    })
    $("#goBackBtn").on("click", function () {
        window.location.href="./main.html";
    })

    $("#perioyPlan").on("click", function () {
        window.location.href="./plan_choice.html";
    })

    $("#goBackMain").on("click", function () {
        window.location.href="./main.html";
    })
summer.writeConfig({
    "host": "10.4.102.31", //主机地址
    "port": "8888" //主机端口
})
// 访问MA服务器，调用MA上指定Controller类的指定方法
summer.callAction({
    "viewid":"com.yyjr.ifbp.fin.controller.IFBPFINController", //后台带包名的Controller名
    "action":"handler", //方法名
    // "params":{
    //     "transtype":"urlparamrequest",
    //     "requrl":"http://10.4.102.31:8082/fin-ifbp-base/fin/mobile/user/auth",
    //     "reqmethod":"POST",
    //     "chamc_mobiletoken":"",
    //     "reqparam":"username=15110123504&password=111111"
    //  }, //自定义参数
    "params":{
        "transtype":"urlparamrequest",
        "requrl":"http://10.4.102.31:8082/fin-ifbp-base/fin/quote/toApply",
        "reqmethod":"GET",
        "chamc_mobiletoken":"",
        "reqparam":"username=15110123504&password=111111"
    }, //自定义参数
    "callback":"mycallback()", //请求回来后执行的js方法
    "error":"myerror()", //失败回调的js方法
    "header":{
        "Content-Type":"application/x-www-form-urlencoded",
        "User-Agent":"imgfornote"
    }
});

}
function mycallback(data) {
    // window.location.href = "../index.html";
    alert('成功了啊');
    alert(JSON.stringify(data));
}
function myerror(err) {
    alert('失败了啊');
    alert("errpr: "+JSON.stringify(err))
}
function carcallback(data) {
    alert('选择车型成功了');
    alert(JSON.stringify(data));
}
function carerror(err) {
    alert('选择车型失败了');
    alert("errpr: "+JSON.stringify(err))
}
