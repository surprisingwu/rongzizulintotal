/**
 * Created by Administrator on 2017/6/26.
 */
// var baseurl = 'http://10.4.102.31:8091';
var baseurl = 'http://10.3.1.145:8080';
// var baseurl = 'http://115.236.160.13:8082';
var caseName = "";
summerready = function () {
    $ajaxPost._post({
        url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
        handler:"handler",
        data:{
            "transtype":"urlparamrequest",
            "requrl":baseurl + "/fin-ifbp-base/fin/introducer/queryList",
            "reqmethod":"GET",
            "chamc_mobiletoken":"",
            "reqparam":""
        },
        success:"callback()",
        error:"error()"
    })

}
function callback(data) {
    // alert('拿到案件来源数据');
    // alert(JSON.stringify(data));
    var caseInfo = data.detailMsg.data.content;
    // alert(alert(caseInfo));

    var obj = "";
    caseInfo.forEach(function (item,i) {
        obj += '<div  class="caseItem tc fl"   style="width: 25%" >';
        obj += '<div class="car_brand_item">';
        obj += '<img src="./img/52.png" class="w um-img-responsive um-circle" alt="">';
        console.log(item,i);
        obj += '<span  class="car_name">' +item.abbreviation+ '</span>';
        obj += '</div>';
        obj += '</div>';
    });
    $("#caseContent").append(obj);
    $(".caseItem").on("click", function () {
        caseName = $(this).find(".car_name")[0].innerHTML;
        localStorage.setItem("caseName",caseName);
        window.history.back();
    })

    //
}

function error(err) {
    alert('获取案件来源失败');
    alert("errpr: "+JSON.stringify(err))
}