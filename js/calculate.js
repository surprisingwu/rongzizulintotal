/**
 * Created by Administrator on 2017/6/26.
 */
// 计算首付比例
var result = "";
function downPay(num, per){
    per = per / 100;
    result = num * per;
    return result;
}

// 计算贷款总额
var loanResult = "";
function loanPay(num, per){
    per = 1 - (per / 100);
    loanResult = num * per;
    return loanResult;
}

// 计算保证金额
var Bailresult = "";
function bailPay(num, per){
    per = per / 100;
    Bailresult = num * per;
    return Bailresult;
}

//
function eachPlan (schemeDList,name) {
    var schemeDList_n = "";
    for(var i=0; i<schemeDList.length; i++) {
        if(schemeDList[i].prm_name == name) {
            schemeDList_n =schemeDList[i];
        }
    }
    return schemeDList_n;
}
// 相当于v-if
function reservePriceDiv(flag, id) {
    if (flag == ""){
        $("#"+id).hide();
    }else{
        $("#"+id).show();
    }
}
