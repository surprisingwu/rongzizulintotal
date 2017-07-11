/**
 * Created by Administrator on 2017/6/26.
 */
// var baseurl = 'http://10.4.102.31:8091';
var baseurl = 'http://10.3.1.145:8080';
// var baseurl = 'http://115.236.160.13:8082';
var product_name = "";
var catena_name = "";
var model_name = "";
summerready = function () {
    $ajaxPost._post({
        url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
        handler:"handler",
        data:{
            "transtype":"urlparamrequest",
            "requrl":baseurl + "/fin-ifbp-base/fin/quote/chooseProductH",
            "reqmethod":"GET",
            "chamc_mobiletoken":"",
            "reqparam":"username=15110123504&password=111111"
        },
        success:"mycallbacks()",
        error:"myerror1()"
    })
    $("#car_back").on("click", function () {
        localStorage.setItem('currentTabName2', '.product');
        window.history.go(-1);
    })
}
function mycallbacks(data) {
    var Cardata = data.detailMsg.data.productH;
    var carInfo = "";
    Cardata.forEach(function (item,i) {
        carInfo += '<div class="car_brand_item" style="width: 25%">';
        carInfo += '<img src="./img/49.png" class="w um-img-responsive um-circle" alt="">';
        carInfo += '<span class="car_name">' +item.product_name+ '</span>';
        carInfo += '</div>';
    });
    $("#car_brand").append(carInfo);
    // 给一个数组绑定一个click事件  然后 用$(this)
    $(".car_brand_item").on("click",function () {
        // 给选中的增加一个框  然后将别的框去除
            $(".car_series_item").remove();
            var product = "";
            for(var i=0; i< Cardata.length; i++){
                if($(this).find(".car_name").text() == Cardata[i].product_name) {
                    product = Cardata[i];
                }
            }
            product_name = product.product_name;
            $ajaxPost._post({
                url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
                handler:"handler",
                data:{
                    "transtype":"urlparamrequest",
                    // "requrl":baseurl + "/fin-ifbp-base/fin/quote/chooseProductD",
                    "requrl": baseurl + "/fin-ifbp-base/fin/productMgt/productDList",
                    "reqmethod":"GET",
                    "chamc_mobiletoken":"",
                    "reqparam":"fk_id_productdentity="+product.pk_product_h
                },
                success:"callback()",
                error:"error()"
            })

        $(this).css("border", "1px solid #2dbbfa").siblings().css("border","none");
    })
}

function myerror1(err) {
    alert('获取车型数据失败');
    alert("errpr: "+JSON.stringify(err))
}

function callback(data) {
    // alert('拿到车系数据成功');
    var Serisedata = data.detailMsg.data;
    var carSeries = "";
    Serisedata.forEach(function (item,i) {
        carSeries += '<div class="car_series_item" style="width: 25%; height: 6rem">';
        carSeries += '<img src="./img/50.png" class="w um-img-responsive um-circle" alt="">';
        carSeries += '<span class="car_name">' +item.catena_name+ '</span>';
        carSeries += '</div>';
    });
    $("#car_series").append(carSeries);
    $(".car_series_item").on("click",function () {
        // 给选中的增加一个框  然后将别的框去除
        $(this).css("border", "1px solid #2dbbfa").siblings().css("border","none");
        // 先把原来的样式删除
        $(".car_type_item").remove();
        var type = "";
        for(var i=0; i< Serisedata.length; i++){
            if($(this).find(".car_name").text() == Serisedata[i].catena_name) {
                type = Serisedata[i];
            }
        }
        catena_name = type.catena_name;
        $ajaxPost._post({
            url:"com.yyjr.ifbp.fin.controller.IFBPFINController",
            handler:"handler",
            data:{
                "transtype":"urlparamrequest",
                // "requrl":baseurl + "/fin-ifbp-base/fin/quote/chooseProductD",
                "requrl": baseurl + "/fin-ifbp-base/fin/productMgt/productModelList",
                "reqmethod":"GET",
                "chamc_mobiletoken":"",
                "reqparam":"fk_product_d="+type.pk_product_d
            },
            success:"callback1()",
            error:"error1()"
        })
        // 然后这里在调用ajax函数
    });
}
function error(err) {
    alert('拿到车系数据失败');
    alert("errpr: "+JSON.stringify(err))
}

function callback1(data) {
    var Typedata = data.detailMsg.data;
    var carType = "";
    Typedata.forEach(function (item,i) {
        carType += '<div class="car_type_item">';
        carType += '<img alt=""  src="./img/51.png">';
        carType += '<span class="car_type_name">' +item.model_name+ '</span>';
        carType += '</div>';
    });
    $("#car_types").append(carType);
    $(".car_type_item").on("click",function () {
        // 给选中的增加一个框  然后将别的框去除
        $(this).css("border", "1px solid #2dbbfa").siblings().css("border","none");
        model_name = $(this).find(".car_type_name").text()
        // 然后这里在调用ajax函数
    });
    $(".um-header-right").on("click", function () {
        localStorage.setItem("product_name",product_name);
        localStorage.setItem("catena_name",catena_name);
        localStorage.setItem("model_name",model_name);
        localStorage.setItem('currentTabName2', '.product');
        window.history.go(-1);
        // localStorage.setItem('currentTabName', '.game');
    })

}
function error1(err) {
    alert('拿到车系数据失败');
    alert("errpr: "+JSON.stringify(err))
}