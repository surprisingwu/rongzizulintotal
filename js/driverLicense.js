/**
 * Created by 巫运廷 on 2017/6/22.
 */
var busyOverlay;
var upbody_img_code;
var id_img_code;
var scrollTopNum;
var flag = false;
var $photoContainer;
var baseurl = 'http://10.3.1.145:8080';
summerready = function () {
    //点击图片框，打开相机进行拍照，并展示和发送到后台进行识别。识别的信息展示到页面
    $("#ceshiaaaa").on("click", function () {
        //判断容器里面是否已经存在图片，有则先删除
       alert('测试啊啊啊啊啊啊啊啊啊啊');
    })
    $(".photoContainer").on("click", function () {
        //判断容器里面是否已经存在图片，有则先删除
        alert('进入ocr')
        $photoContainer = $(".photoContainer");
        $(".takePhotosTypeWraper").show();
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
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 85,
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth:1024,
            targetHeight: 768
        });
        function onFail(message) {
            alert('Failed because: ' + message);
        }
        function onSuccess(imageData) {
            // 展示遮罩层
            alert('成功进入');
            showWaiting();
            if (!!$photoContainer.find("img")){
                $photoContainer.html("");
            }
            id_img_code = imageData
            var img = new Image();
            img.src = "data:image/jpeg;base64," + imageData;//base64字符串
            //这里设置的是撑开图片盒子，也可以自己设置宽和高
            img.style.width = "100%";
            img.style.height = "100%";
            $photoContainer.append(img);
            alert('进入回调函数');
            $ajaxPost._post({
                url: "com.yyjr.ifbp.fin.controller.IFBPFINController",
                handler: "handler",
                data: {
                    "transtype": "urlparamrequest",
                    "requrl": baseurl + "/fin-ifbp-base/fin/mobile/ocr/Docr",
                    "reqmethod": "POST",
                    "reqparam": "typeId=6&img="+ imageData,
                },
                success: "mycallback()",
                error: "myerror()"
            })
        }

        $(".takePhotosTypeWraper").hide();
    })
    //点击打开相册的逻辑，回复body的样式，关闭弹出层
    $("#openAlbumDiv").on("click", function () {
        alert('打开相册');
        bodyOverfloawAuto();
        var $specialUserMesgListItemIcon = $(".specialUserMesgListItemIcon");
        upbody_img_code = $._openAblumHandler($specialUserMesgListItemIcon)
        $(".takePhotosTypeWraper").hide();
    })
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
    alert('进入关闭遮罩层');
    bodyOverfloawAuto();
    alert('bodyOverfloawAuto结束')
    if (busyOverlay) {
        busyOverlay.remove();
        busyOverlay = null;
    }
    alert('关闭遮罩层结束');
}
function mycallback(data) {
    alert(JSON.stringify(data));
    alert('获取数据成功');
    alert(data.data.car_number);
    alert(data.data.VIN);
    alert(data.data.engine_number);
    $("#plateNumber").val(data.data.car_number);
    $("#carVin").val(data.data.VIN);
    $("#motorNum").val(data.data.engine_number);
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




