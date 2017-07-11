/**
 * Created by Administrator on 2017/6/26.
 */
// var baseurl = 'http://10.4.102.31:8091';
var baseurl = 'http://10.3.1.145:8080';
var payTable = "";
var munberCount ="";
var resultCS = "";
var percentb = "";
var percentc = "";
var percentd = 0;
var arr1 = [];

// 首付金额
var downPayment = localStorage.getItem("downPayment");
downPayment = parseFloat(downPayment).toFixed(2);
// 贷款金额
var loanPay = localStorage.getItem("loanPay");
loanPay = parseFloat(loanPay).toFixed(2);
// 总金额
var payCount = localStorage.getItem("payCount");
// 首付所占比例
var downPayCent = localStorage.getItem("downPayCent");
// 年利率
var interestRate = localStorage.getItem("interestRate");
// 保证金额
var bailCount = localStorage.getItem("bailCount");
// 租赁期数
var prmName = localStorage.getItem("prmName");
// 租赁方式
var rentWay = localStorage.getItem("rentWay");

// 案件来源
var caseSource = localStorage.getItem("caseSource");

// 是否是二手车
var sec_hand_car = localStorage.getItem("sec_hand_car");


// 所属区域
var subArea = localStorage.getItem("subArea");
// 上牌地
var markArea = localStorage.getItem("markArea");
// 上牌年份
var yearOnCard = localStorage.getItem("yearOnCard");
// 车辆属地
var carDependency = localStorage.getItem("carDependency");
// 行程里程
var mailAge = localStorage.getItem("mailAge");
// 车牌号
var plateNumber = localStorage.getItem("plateNumber");
// 车辆识别代号
var carVin = localStorage.getItem("carVin");



// 经销商
var componeyChoice = localStorage.getItem("componeyChoice");
// 品牌
var carBrand = localStorage.getItem("carBrand");
// 车系
var carSeries = localStorage.getItem("carSeries");
// 车型
var carType = localStorage.getItem("carType");
// 国产 进口
var madeWhere = localStorage.getItem("madeWhere");
// 车身颜色
// var carColor = localStorage.getItem("carColor");
//留购价
var reservePrice = localStorage.getItem("reservePrice");
// 管理费收入
var managerPrice = localStorage.getItem("managerPrice");
// 家访费收入
var visitPrice = localStorage.getItem("visitPrice");
// 其他费用
var otherPrice = localStorage.getItem("otherPrice");
// 保险费
var insurancePrice = localStorage.getItem("insurancePrice");
// cps费
var cpsPrice = localStorage.getItem("cpsPrice");
// 中介费
var agencyPrice = localStorage.getItem("agencyPrice");

var hEntitys = JSON.parse(localStorage.getItem("hEntitys"));
// var resultCS = localStorage.getItem("resultCS");

summerready = function () {
        // alert('进入测算页面');
        // alert('开始计算啦');
        // alert(sec_hand_car);
        // alert(madeWhere);
        $("#count_back").on("click", function () {
            localStorage.setItem('currentTabName', '.game');
            window.history.back();
        })
        var Aparams = "";
        Aparams += "pk_quote_h=" + hEntitys.pk_quote_h + "&";
        Aparams += "pk_scheme_cfg=" + hEntitys.pk_scheme_cfg + "&";
        Aparams += "all_price=" + payCount + "&";
        Aparams += "yearRate=" + interestRate + "&";
        Aparams += "DEPOSIT_MONEY=" + bailCount + "&";
        Aparams += "leaseTerm=" + prmName + "&";
        Aparams += "payWay=" + '1' + "&";
        Aparams += "leasePeriod=" + '1' + "&";
        Aparams += "finance_money=" + loanPay;
        // alert(JSON.stringify(Aparams));
        $ajaxPost._post({
            url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
            handler:"handler",
            data:{
                "transtype":"urlparamrequest",
                "requrl":baseurl + "/fin-ifbp-base/fin/quote/doApplyCalculateM",
                "reqmethod":"GET",
                "chamc_mobiletoken":"",
                "reqparam": Aparams
            },
            success:"CScallbacks()",
            error:"CSerror()"
        })

    /*导航更换js*/
    $('ul.um-tabbar-switch  Li').click(function(){
        $(this).addClass('active').siblings('.active').removeClass('active');
        var tar=$(this).attr('data-tar');
        $(tar).addClass('active').siblings('.active').removeClass('active');
        if ($(this)[0].dataset.tar == ".news") {
            // alert('我是第一页');
        } else{
            // alert('我是第二页');
            var Bparams = "";
            Bparams += "pk_quote_h=" + hEntitys.pk_quote_h + "&";
            Bparams += "pk_scheme_cfg=" + hEntitys.pk_scheme_cfg + "&";
            Bparams += "all_price=" + payCount + "&";
            Bparams += "yearRate=" + interestRate + "&";
            Bparams += "DEPOSIT_MONEY=" + bailCount + "&";
            Bparams += "leaseTerm=" + prmName + "&";
            Bparams += "payWay=" + '5' + "&";
            Bparams += "leasePeriod=" + '1' + "&";
            Bparams += "finance_money=" + loanPay;
            $ajaxPost._post({
                url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
                handler:"handler",
                data:{
                    "transtype":"urlparamrequest",
                    "requrl":baseurl + "/fin-ifbp-base/fin/quote/doApplyCalculateM",
                    "reqmethod":"GET",
                    "chamc_mobiletoken":"",
                    "reqparam": Bparams
                },
                success:"CScallbacks1()",
                error:"CSerror1()"
            })
        }
    });


    // 点击保存
    $("#count_result").on("click", function () {
       var params = "pk_quote_h=" + hEntitys.pk_quote_h+ "&";
        params += "pk_scheme_cfg=" + hEntitys.pk_scheme_cfg + "&";
        params += "all_price=" + payCount + "&";
        // // 租赁方式
        params += "lease_type=" + rentWay + "&";
        // // // 案件来源
        params += "project_source=" + caseSource + "&";
        // // 经销商
        params += "supplier_name=" + componeyChoice + "&";
        // 是否是二手车
        params += "sec_hand_car=" + sec_hand_car + "&";
        // 品牌
        params += "brand_name=" + carBrand + "&";
        // 车型
        params += "eq_model=" + carType + "&";
        // 车系
        params += "catena=" + carSeries + "&";
        // 国产 进口
        params += "is_import=" + madeWhere + "&";
        // 车辆颜色
        // params += "product_color=" + carColor + "&";
        // 所属区域
        // params += "product_adress=" + subArea + "&";
        // 上牌地
        params += "card_address=" + markArea + "&";
        // 上牌年份
        params += "last_card_time=" + yearOnCard + "&";
        // 车辆属地
        params += "product_adress=" + carDependency + "&";
        // 车牌号
        params += "car_plate=" + plateNumber + "&";
        // 行程里程
        params += "distance=" + mailAge + "&";
        // 车辆识别号码
        params += "vin=" + carVin + "&";
        // 留购价
        params += "ReservePrice=" + reservePrice + "&";
        // 管理费收入
        params += "ManagementExpense=" + managerPrice + "&";
        // 家访费收入
        params += "HomeVisitFee=" + visitPrice + "&";
        // 其他费用收入
        params += "OtherExpenses=" + otherPrice + "&";
        // 保险费
        params += "PremiumDeposit=" + insurancePrice + "&";
        // cps费用
        params += "GPS_fee=" + cpsPrice + "&";
       // 中介费
        params += "payWay=1" + "&";
        params += "leasePeriod=1" + "&";
        params += "AgencyFee=" + agencyPrice + "&";
        params += "yearRate=" + interestRate + "&";
        params += "DEPOSIT_MONEY=" + bailCount + "&";
        params += "leaseTerm=" + prmName + "&";
        params += "finance_money=" + loanPay;
        // var Bparams = "";
        // Bparams += "pk_quote_h=" + hEntitys.pk_quote_h + "&";
        // Bparams += "pk_scheme_cfg=" + hEntitys.pk_scheme_cfg + "&";
        // Bparams += "all_price=" + payCount + "&";
        // Bparams += "yearRate=" + interestRate + "&";
        // Bparams += "DEPOSIT_MONEY=" + bailCount + "&";
        // Bparams += "leaseTerm=" + prmName + "&";
        // Bparams += "payWay=" + '5' + "&";
        // Bparams += "leasePeriod=" + '1' + "&";
        // Bparams += "finance_money=" + loanPay;
        // alert(params);
        params = params.replace(/=&/g,"=undefined&");
        // alert(params);
        $ajaxPost._post({
            url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
            handler:"handler",
            data:{
                "transtype":"urlparamrequest",
                "requrl":baseurl + "/fin-ifbp-base/fin/quote/doApplySaveM",
                "reqmethod":"GET",
                "chamc_mobiletoken":"",
                "reqparam": params
            },
            success:"mycallbacks()",
            error:"myerror()"
        })

    })

}
// 测算成功的回调函数
function CScallbacks(data) {
    // alert('测算成功');
    payTable = data.detailMsg.data.payTable;
    resultCS = payTable[0].zj
    // alert(JSON.stringify(resultCS));
    var totalLx = 0;
    for(var i=0; i < payTable.length; i++) {
        totalLx += parseFloat(payTable[i].lx);
    }
    resultCS = parseFloat(resultCS)
    downPayment = parseFloat(downPayment);
    loanPay= parseFloat(loanPay);

    munberCount = totalLx + downPayment  + loanPay;
    percentb = ((totalLx / munberCount) * 100).toFixed(1);
    percentc = ((downPayment / munberCount) * 100).toFixed(1);
    percentd = (100 - percentb -percentc).toFixed(1);
    $("#percentb").text(percentb + '%');
    $("#percentc").text(percentc + '%');
    $("#percentd").text(percentd + '%');

    // 月供
    $("#resultCS").text(resultCS.toFixed(2) + '元');
    $("#firstPayment").text(downPayment.toFixed(2) + '元');
    $("#loanPay").text(loanPay.toFixed(2) + '元');
    $("#totalLx").text(totalLx.toFixed(2) + '元');
    arr1 = [
        {value:loanPay, name:'首付'},
        {value:downPayment, name:'贷款总额'},
        {value:totalLx, name:'利息总额'},
    ];
    $(function () {
        //基于准备好的dom,初始化echarts实例
        // alert('进入echarts')
        var myChart=echarts.init(document.getElementById('myChart'));
        var option = {
            title : {
                text: '￥' + resultCS.toFixed(2),
                subtext: '月供' ,
                top: '43%',
                left: 'center',
                textStyle: {
                    color: '#000',
                    fontSize: 20
                },
                subtextStyle: {
                    color: '#8e8e93',
                    fontSize: 12
                }
            },
            color:['#E8704E', '#24BDB6','#7C77B9','#2dbbfa'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'详细信息',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:arr1
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    });
}
// 第二种测算的回调函数
function CScallbacks1(data) {
    // alert('第二种测算成功')
    var arr = [];
    payTable1 = data.detailMsg.data.payTable;
    // alert(JSON.stringify(payTable1));
    resultCS1 = payTable1[0].zj
    var totalLx1 = 0;
    for(var i=0; i < payTable1.length; i++) {
        totalLx1 += parseFloat(payTable1[i].lx);
    }
    var  resultCS1_minus = payTable1[0].zj - payTable1[1].zj;
    resultCS1_minus = parseInt(resultCS1_minus);
    $("#resultCS1_minus").text('(每月递减'+resultCS1_minus+'元)');
    var resultCS1 = parseFloat(resultCS1);
    var totalLx1 = parseFloat(totalLx1);
    munberCount = totalLx1 + downPayment  + loanPay;
    // percenta1 = ((resultCS1 / munberCount) * 100).toFixed(1);
    var percentb1 = ((totalLx1 / munberCount) * 100).toFixed(1);
    var percentc1 = ((downPayment / munberCount) * 100).toFixed(1);
    var percentd1 = (100 - percentb1 -percentc1).toFixed(1);
    // 百分比
    // $("#percenta1").text(percenta1 + '%');
    $("#percentb1").text(percentb1 + '%');
    $("#percentc1").text(percentc1 + '%');
    $("#percentd1").text(percentd1 + '%');
    // val
    $("#totalLx1").text(totalLx1.toFixed(2) + '元');
    $("#resultCS1").text(resultCS1.toFixed(2) + '元');
    $("#loanPay1").text(loanPay.toFixed(2) + '元');
    $("#firstPayment1").text(downPayment.toFixed(2) + '元');

    arr = [
        {value:loanPay, name:'首付'},
        {value:downPayment, name:'贷款总额'},
        {value:totalLx1, name:'利息总额'},
        // {value:resultCS1, name:'月供'}
    ];
    // alert(parseFloat(arr))
    $(function () {
        //基于准备好的dom,初始化echarts实例
        var myChart1=echarts.init(document.getElementById('myChart1'));
        var option = {
            title : {
                text: '￥'+ resultCS1.toFixed(2),
                subtext: '首月月供',
                top: '43%',
                left: 'center',
                textStyle: {
                    color: '#000',
                    fontSize: 20
                },
                subtextStyle: {
                    color: '#8e8e93',
                    fontSize: 12
                }
            },
            color:['#E8704E', '#24BDB6','#7C77B9','#2dbbfa'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'详细信息',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: arr
                }
            ]
        };
        myChart1.setOption(option);
    })

}

function CSerror(err) {
    alert('测算失败');
    // alert("errpr: "+JSON.stringify(err))
}
function CSerror1(err) {
    alert('测算失败');
    // alert("errpr: "+JSON.stringify(err))
}
function mycallbacks(data) {
    // alert('保存成功');
    // alert(JSON.stringify(data));
    window.location.href = "mainindex.html"
}
function myerror(err) {
    alert('保存失败');
    alert("errpr: "+JSON.stringify(err))
}




