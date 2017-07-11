
// var baseurl = 'http://10.4.102.31:8091';
var baseurl = 'http://10.3.1.145:8080';
var downPayment = "";
var loanPayMoney = "";
var payCount ="";
var downPayCent = "";
var subArea = "";
var schemeDList = "";
var hEntitys = "";
var interestRate = "";
var bailPercent = "";
var bailCount = "";
var prmName = "";
var rentWay = "";
var markArea = "";
var componeyChoice = "";
var carBrand = "";
var carSeries = "";
var carType = "";
var madeWhere = "";
// var carColor = "";
var reservePrice = "";
var managerPrice = "";
var visitPrice = "";
var otherPrice = "";
var insurancePrice = "";
var cpsPrice = "";
var agencyPrice = "";
var caseSource = "";
var sec_hand_car = "";
var yearOnCard = "";
var checkName = "";
var carDependency = "";
var mailAge = "";
var plateNumber = "";
var carVin = "";
// OCR信息
var busyOverlay;
var upbody_img_code;
var id_img_code;
var scrollTopNum;
var flag = false;
var $photoContainer;
var mateidimg_code;
// var caseName_a = "";
summerready = function () {
    // alert('进入new_main主页面');
    checkName = $("#select1_dummy").val() || "";
    // alert(checkName);
    if ($("#payCount").val() == "") {
        payCount = $("#payCount1").val()
    }else{
        payCount = $("#payCount").val();
    }
    var pk_scheme_cfg_plan = localStorage.getItem("pk_scheme_cfg_plan")
    var caseName_a = localStorage.getItem("caseName");
    var componeyName = localStorage.getItem("componeyName");
    $("#caseSource").val(caseName_a);
    $("#componeyChoice").val(componeyName);

    // 首付金额的显示
    // downPayment = downPay(payCount,downPayCent);
    // 进入页面 调用选择方案的接口
    $ajaxPost._post({
        url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
        handler:"handler",
        data:{
            "transtype":"urlparamrequest",
            "requrl":baseurl + "/fin-ifbp-base/fin/quote/toApply",
            "reqmethod":"GET",
            "chamc_mobiletoken":"",
            "reqparam":'pk_scheme_cfg=' + pk_scheme_cfg_plan
        },
        success:"planbacks()",
        error:"planerror()"
    })

    // 选择页面
    $("#plan_name").on("click", function () {
        window.location.href="./plan_choice.html";
    })

    // ocr识别接口
    $(".photoContainer").on("click", function () {
        //判断容器里面是否已经存在图片，有则先删除
        $photoContainer = $(".photoContainer");
        $(".takePhotosTypeWraper").show();
    })
    $(".selectTakePhotosTypeCancelBtn").on("click", function () {
        $(".takePhotosTypeWraper").hide();
    })
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





    //打开相机的逻辑，回复body的样式，关闭弹出层
    $("#openCamaraDiv").on("click", function () {
        summer.openCamera({
            callback: function (args) {
                openCamaraOrAlbum(args);
            }
        });
        $(".takePhotosTypeWraper").hide();
    })
    //点击打开相册的逻辑，回复body的样式，关闭弹出层
    $("#openAlbumDiv").on("click", function () {
        bodyOverfloawAuto();
        summer.openPhotoAlbum({
            callback: function (args) {
                openCamaraOrAlbum(args);
            }
        });
    })

    // 最后测算 步骤
    $("#calculate,#calculateBtn").on("click", function () {
        // 首付比例
        downPayCent = $("#downPayCent").val();
        // 保证金百分比
        bailPercent = $("#Deposit_money").val();
        // 案件来源
        caseSource = $("#caseSource").val();
        // 首付金额
        downPayment = downPay(payCount,downPayCent);
        $("#downPayMoney").val(parseInt(downPayment));
        // 利率
        interestRate = ($("#interest_rate").val())/100;

        // 租赁方式
        rentWay = $("#select1_dummy").val();
        // 所属区域
        subArea = $("#subArea").val();
        // 是否是二手车
        sec_hand_car = sec_hand_car.toString();
        if($("#second-car-btn").is(':checked') ==true){
            $("#second-car-btn").val('是');
            sec_hand_car = $("#second-car-btn").val();
        }else{
            $("#second-car-btn").val('否');
            sec_hand_car = $("#second-car-btn").val();
        }
        // alert(sec_hand_car);
        // 上牌地
        markArea = $("#markArea").val();
        // 上牌年份
        yearOnCard = $("#yearOnCard").val();
        // 车辆属地
        carDependency = $("#carDependency").val();
        // 行程里程
        mailAge = $("#mailAge").val();
        // 车牌号
        plateNumber = $("#plateNumber").val();
        // 车辆识别代号
        carVin = $("#carVin").val();
        // 经销商
        componeyChoice = $("#componeyChoice").val();
        // 品牌
        carBrand = $("#car-brand").val();
        //车系
        carSeries = $("#car-series").val();
        //车型
        carType = $("#car-type").val();
        // 国产、进口
        if($("#madeWhere").is(':checked') ==true){
            $("#madeWhere").val('进口');
            madeWhere = $("#madeWhere").val();
        }else{
            $("#madeWhere").val('国产');
            madeWhere = $("#madeWhere").val();
        }
        // 车身颜色
        // carColor = $("#carColor").val();
        // 留购价
        reservePrice = $("#reservePrice").val();
        // 管理费收入
        managerPrice = $("#managerPrice").val();
        // 家访费收入
        visitPrice = $("#visitPrice").val();
        // 其他费用收入
        otherPrice = $("#otherPrice").val();
        // 保险费押金代收款
        insurancePrice = $("#insurancePrice").val();
        // cps费
        cpsPrice = $("#cpsPrice").val();
        // 中介费
        agencyPrice = $("#agencyPrice").val();

        // 计算保证金额
        bailCount = bailPay(payCount,bailPercent);
        //贷款总额的计算
        loanPayMoney = loanPay(payCount,downPayCent);
        // 租赁期数
        prmName = $("#positionPoint2").find(".active").text();

        localStorage.setItem("loanPay",loanPayMoney);
        localStorage.setItem("sec_hand_car",sec_hand_car);
        localStorage.setItem("caseSource",caseSource);
        localStorage.setItem("downPayment",downPayment);
        localStorage.setItem("payCount",payCount);
        localStorage.setItem("rentWay",rentWay);
        localStorage.setItem("downPayCent",downPayCent);
        localStorage.setItem("subArea",subArea);
        localStorage.setItem("markArea",markArea);
        localStorage.setItem("interestRate",interestRate);
        localStorage.setItem("bailCount",bailCount);
        localStorage.setItem("prmName",prmName);
        localStorage.setItem("componeyChoice",componeyChoice);
        localStorage.setItem("carBrand",carBrand);
        localStorage.setItem("carSeries",carSeries);
        localStorage.setItem("carType",carType);
        localStorage.setItem("madeWhere",madeWhere);
        // localStorage.setItem("carColor",carColor);
        localStorage.setItem("reservePrice",reservePrice);
        localStorage.setItem("managerPrice",managerPrice);
        localStorage.setItem("visitPrice",visitPrice);
        localStorage.setItem("otherPrice",otherPrice);
        localStorage.setItem("insurancePrice",insurancePrice);
        localStorage.setItem("cpsPrice",cpsPrice);
        localStorage.setItem("agencyPrice",agencyPrice);
        localStorage.setItem("yearOnCard",yearOnCard);
        localStorage.setItem("carDependency",carDependency);
        localStorage.setItem("mailAge",mailAge);
        localStorage.setItem("plateNumber",plateNumber);
        localStorage.setItem("carVin",carVin);

        window.location.href="./count_result.html";
    })
    // 租赁方式
    $("#select1_dummy").on("click", function () {
        // alert('点击了租赁方式')
        // 调用了接口
        $ajaxPost._post({
            url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
            handler:"handler",
            data:{
                "transtype":"urlparamrequest",
                "requrl":baseurl + "/fin-ifbp-base/fin/quote/toApply",
                "reqmethod":"GET",
                "chamc_mobiletoken":"",
                "reqparam":""
            },
            success:"planWaybacks()",
            error:"planWayerror()"
        })
    })

    // 选择经销商
    $("#componeyChoice").on("click", function () {
        // alert('选择经销商')
        window.location.href="./componey_choice.html";
    })
    // 选择车型 品牌 系列
    $("#car-brand").on("click", function () {
        // alert('选择品牌')
        window.location.href="./car_choice1.html";
    })

    // 选择案件来源
    $("#caseSource").on("click", function () {
        window.location.href="./case_source.html";
    })
    // 首付比例和首付金额同步
    $("#downPayCent").bind("input propertychange",function () {
        var payCentVal = $("#downPayCent").val();
        if ($("#payCount").val() == "") {
            payCount = $("#payCount1").val()
        }else{
            payCount = $("#payCount").val();
        }
        var downPayment1 = downPay(payCount,payCentVal);
        $("#downPayMoney").val(parseInt(downPayment1));
    })
    // 保证金比例和保证金额同步
    $("#Deposit_money").bind("input propertychange",function () {
        var Deposit_money = $("#Deposit_money").val();
        if ($("#payCount").val() == "") {
            payCount = $("#payCount1").val()
        }else{
            payCount = $("#payCount").val();
        }
        var Deposit_money_num = bailPay(payCount,Deposit_money);
        $("#Deposit_money_num").val(parseInt(Deposit_money_num));
    })
    // 返回函数
    function functionback() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            navigator.app.exitApp();
        }
        if (isIOS) {
            var pamn = {
                "params" : {
                    "transtype" : "exit_back"
                }
            };
            summer.callService("SummerService.gotoNative", pamn, false);
        }
    }
    $("#goBack").on("click", function () {
        functionback();
    })
}

 // 方案的接口
function planbacks(data) {
    // 拿到相应的数组了
    hEntitys = data.detailMsg.data.hEntity;
    // alert(hEntitys.pk_scheme_cfg);
    localStorage.setItem("hEntitys",JSON.stringify(hEntitys));
    schemeDList = data.detailMsg.data.schemeDList;
    // 首付比例
    var schemeDList_n = eachPlan(schemeDList,"首付比例");
    reservePriceDiv(schemeDList_n, "downPayCentDiv");
    // 保证金比例
    var schemeDList_s = eachPlan(schemeDList,"保证金比例");
    reservePriceDiv(schemeDList_s, "Deposit_moneyDiv");
    // 租赁利率
    var schemeDList_a = eachPlan(schemeDList,"租赁年率");
    reservePriceDiv(schemeDList_a, "interest_rateDiv");
    // 循环遍历是否存在
    var schemeDList_b = eachPlan(schemeDList,"留购价");
    // 如果相应的数组存在 则让它show  不存在则hide
    reservePriceDiv(schemeDList_b, "reservePriceDiv");
    var schemeDList_c = eachPlan(schemeDList,"管理费收入");
    reservePriceDiv(schemeDList_c, "managerPriceDiv");
    var schemeDList_d = eachPlan(schemeDList,"家访费收入");
    reservePriceDiv(schemeDList_d, "visitPriceDiv");
    var schemeDList_e = eachPlan(schemeDList,"其他费用收入");
    reservePriceDiv(schemeDList_e, "otherPriceDiv");
    var schemeDList_f = eachPlan(schemeDList,"保险费押金代收款");
    reservePriceDiv(schemeDList_f, "insurancePriceDiv");
    var schemeDList_g = eachPlan(schemeDList,"GPS费");
    reservePriceDiv(schemeDList_g, "cpsPriceDiv");
    var schemeDList_h = eachPlan(schemeDList,"中介费");
    reservePriceDiv(schemeDList_h, "agencyPriceDiv");

    // 首付金额
    var downPayment1 = downPay(payCount,schemeDList_n.val_str);
    $("#downPayMoney").val(parseInt(downPayment1));
    // 计算保证金额
    if(schemeDList_s.val_str == null){
        schemeDList_s.val_str = 0;
    }
    // 保证金比例
    // alert(schemeDList_s.val_str)
    var bailCount1 = bailPay(payCount,schemeDList_s.val_str);
    $("#Deposit_money_num").val(parseInt(bailCount1));



    // alert('详细信息');
    // 首付比例
    $("#downPayCent").val(schemeDList_n.val_str);
    $("#downPayCent").attr("max",schemeDList_n.val_up);
    $("#downPayCent").attr("min",schemeDList_n.val_down);
    $("#downPayCent_output").text(schemeDList_n.val_str);
    // 利率
    $("#interest_rate").val(schemeDList_a.val_str);
    // 保证金比例
    $("#Deposit_money").val(schemeDList_s.val_str);
    $("#Deposit_money").attr("max",schemeDList_s.val_up);
    $("#Deposit_money").attr("min",schemeDList_s.val_down);
    $("#Deposit_money_output").text(schemeDList_s.val_str);
    // 留购价
    $("#reservePrice").val(schemeDList_b.val_str);
    // 管理费收入
    $("#managerPrice").val(schemeDList_c.val_str);
    // 家访费收入
    $("#visitPrice").val(schemeDList_d.val_str);
    // 其他费用收入
    $("#otherPrice").val(schemeDList_e.val_str);
    // 保险费押金
    $("#insurancePrice").val(schemeDList_f.val_str);
    // cps费用
    $("#cpsPrice").val(schemeDList_g.val_str);
    // 中介费
    $("#agencyPrice").val(schemeDList_h.val_str);


}
function planerror(err) {
    alert('进入--方案数据失败');
    // alert("errpr: "+JSON.stringify(err))
}


// 方案的接口
function planWaybacks(data) {
    var leaseTypeList = data.detailMsg.data.leaseTypeList;
    var obj1 = "";
    $("#box1_item").empty();
    leaseTypeList.forEach(function (item,i) {
        obj1 += '<label class="um-check-group-item um-check-group-item1" >';
        obj1 += '<input name="um-radio1"  type="radio" >';
        obj1 += '<span class="um-icon-check um-css3-vc"></span>';
        obj1 += '<span class="um-black">' +item.ifbpFincName+ '</span>';
        obj1 += '</label>';
    });
    $("#box1_item").append(obj1);
    // 再次点入 让其显示
    var arr1 = $(" #box1_item .um-check-group-item input[type='radio']");
    arr1.each(function(i,item){
        if($(item).siblings(".um-black").text() == checkName){
            $(item).attr("checked","checked");
        }else{
            $(item).removeAttr("checked");
        }
    })
    var layerIndex = layer.open({
        type: 1,
        content: $('#box1').html(),
        anim: 'up',
        style: 'position:fixed; bottom:0; left:0; width: 100%; padding:10px 0px 0px 0px; border:none;',
        success: function (elem) {
            // 切换
            $("#box1_item .um-check-group-item").on("click",function () {
                $(this).siblings().find("input[type='radio']").removeAttr("checked");
                $(this).find("input[type='radio']").attr("checked","checked")
                checkName = $(this).find(".um-black").text();
                $("#select1_dummy").val(checkName);
                layer.close(layerIndex);
            })
        },
        end: function () {
            // $("#select1_dummy").val(checkName);
        }
    });
}
function planWayerror(err) {
    alert('进入--方案数据失败');
    // alert("errpr: "+JSON.stringify(err))
}
//展示遮罩层
function showWaiting() {
    bodyOverfloawHidden();
    busyOverlay = getBusyOverlay('viewport', {
        color : 'white',
        opacity : 0.75,
        text : 'viewport: loading...',
        style : 'text-shadow: 0 0 3px black;font-weight:bold;font-size:14px;color:white'
    }, {
        color : '#175499',
        size : 50,
        type : 'o'
    });
    if (busyOverlay) {
        busyOverlay.settext("正在加载......");
    }
}
//关闭遮罩层
function hideWaiting() {
    bodyOverfloawAuto();
    if (busyOverlay) {
        busyOverlay.remove();
        busyOverlay = null;
    }
}
function mycallback(data) {
    $("#plateNumber").val(data.data.car_number);
    $("#carVin").val(data.data.VIN);
    $("#motorNum").val(data.data.engine_number);
    $("#productModel").val(data.data.product_model);
    $("#yearOnCard").val(data.data.record_date);
    hideWaiting();
}
function myerror(error) {
    alert(JSON.stringify(error));
}
//设置body样式为overflow：hiddem
function bodyOverfloawHidden() {
    scrollTopNum = $("body").scrollTop();
    $("body").css({
        position:"fixed",
        overflow:"hidden",
    })
}
// //还原body的样式为overflow：auto
function bodyOverfloawAuto() {
    $("body").css({
        overflow:"auto",
        position:"relative",
    })
    $("body").scrollTop(scrollTopNum)
}
//半身照和ocr识别都走的这个逻辑
function openCamaraOrAlbum(args) {
    var $photoContainer = $(".photoContainer");
    var objContainer = null;
    objContainer = $photoContainer;
    showWaiting();
    if (!!objContainer.find("img")) {
        objContainer.html("");
    }
    var imgPath = args.imgPath;
    var max_width = 1080;
    var max_height = 960;
    var img = new Image();
    img.src = imgPath; //base64字符串
    //这里设置的是撑开图片盒子，也可以自己设置宽和高
    img.onload = function () {
        //对图片进行压缩
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        if (width > height) {
            if (width > max_width) {
                height = Math.round(height *= max_width / width);
                width = max_width;
            }
        } else {
            if (height > max_height) {
                width = Math.round(width *= max_height / height);
                height = max_height;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        //这里的压缩比例是0.85
        var dataURL = canvas.toDataURL('image/jpeg', 0.85);
        var imageDom = new Image();
        imageDom.src = dataURL;
        imageDom.style.width = "100%";
        imageDom.style.height = "100%";
        objContainer.append(imageDom);
        mateidimg_code = dataURL.slice(dataURL.indexOf("base64,") + 7);
        $ajaxPost._post({
            url: "com.yyjr.ifbp.fin.controller.IFBPFINController",
            handler: "handler",
            data: {
                "transtype": "urlparamrequest",
                "requrl": baseurl + "/fin-ifbp-base/fin/mobile/ocr/Docr",
                "reqmethod": "POST",
                "reqparam": "typeId=6&img=" + mateidimg_code,
            },
            success: "mycallback()",
            err: "myerror()"
        })
    }
    $(".takePhotosTypeWraper").hide();
}

