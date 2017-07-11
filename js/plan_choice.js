// var baseurl = 'http://10.4.102.31:8091';
var baseurl = 'http://10.3.1.145:8080';
// var baseurl = 'http://115.236.160.13:8081';
var hEntity = "";
var pk_scheme_cfg_plan = "";
summerready = function () {
    // alert('进入方案选择页面');
    $ajaxPost._post({
        url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
        handler:"handler",
        data:{
            "transtype":"urlparamrequest",
            "requrl":baseurl + "/fin-ifbp-base/fin/quote/toApply",
            "reqmethod":"GET",
            "chamc_mobiletoken":"",
            // "reqparam":"pk_scheme_cfg=4f53f624-d99c-4c43-9bda-d39216c320a1"
            "reqparam": "",
        },
        success:"mycallbacks()",
        error:"myerror()"
    })
}
function mycallbacks(data) {
    hEntity = data.detailMsg.data.hEntity;
    var datainfo = data.detailMsg.data.sCfgHPrmList;
    var obj1 = "";
    datainfo.forEach(function (item,i) {
        if(item.scheme_desc == null){
            item.scheme_desc = "";
        }
        if(item.start_percent == null){
            item.start_percent = 0;
        }
        if(item.deposit_PERCENT == null){
            item.deposit_PERCENT = 0;
        }
        if(item.yearRate == null){
            item.yearRate = 0;
        }
        obj1 += '<div class="planChoice">';
        obj1 += '<p class="choice_title">';
        obj1 += '<span class="choice_title_name">' + item.scheme_name + '</span>';
        obj1 += '<span class="choice_title_detail" style="font-size: 13px;">' + item.scheme_desc + '</span>';
        obj1 += '<span class="choice_title_btn" >选择</span>';
        obj1 += '</p>';
        obj1 += '<div class="choice_box">' + '<div class="choice_box1">' + '<p class="choice_box1_num">' + '<span>' + item.start_percent + '</span>' +'%' + '</p>' + '<p class="choice_box1_word">' + '<span>' + '首付' + '</span>'+ '</p>' +'</div>';
        obj1 += '<div class="choice_box2">' + '<p class="choice_box1_num">' + '<span>' + item.deposit_PERCENT  + '</span>'  +'%'+  '</p>' + '<p class="choice_box1_word">' + '<span>' + '保证金' + '</span>'+ '</p>' +'</div>';
        obj1 += '<div class="choice_box3">' + '<p class="choice_box1_num">' + '<span>' + item.yearRate  + '</span>'  +'%'+ '</p>' + '<p class="choice_box1_word">' + '<span>' + '利率' + '</span>'+ '</p>' +'</div>' + '</div>';
        obj1 += '</div>'
    })
    $("#plan_choice").append(obj1);
    var choiceVal = "";
    // 点击选择相应的
    $(".planChoice").on("click",function () {
        choiceVal = $(this).find(".choice_title_name")[0].innerHTML;
        // alert(choiceVal);
        // alert(JSON.stringify(datainfo));
        for(var i=0; i<datainfo.length; i++) {
            if(choiceVal == datainfo[i].scheme_name) {
                pk_scheme_cfg_plan = datainfo[i].pk_scheme_cfg;
            }
        }
        // 拿到了相应的字段
        // alert(pk_scheme_cfg_plan);
        localStorage.setItem("pk_scheme_cfg_plan",pk_scheme_cfg_plan);

        localStorage.setItem("choiceVal",choiceVal);

        localStorage.setItem('currentTabName', '.game');
        window.history.go(-1);
    })
    $("#plan_back").on("click",function () {
        localStorage.setItem('currentTabName', '.game');
        window.history.go(-1);
    })
}
function myerror(err) {
    alert('拿到方案数据失败');
    alert("errpr: "+JSON.stringify(err))
}