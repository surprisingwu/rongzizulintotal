/**
 * Created by Administrator on 2017/6/19.
 */
var appSettings = {};
// appSettings.ip = "10.4.102.31";
// appSettings.port = "8888";


// appSettings.ip = "10.4.102.56";
// 客户IP地址
appSettings.ip = "115.236.160.13";
appSettings.port = "8081";
// appSettings.port = "8090";
appSettings.proxy = "http://"+appSettings.ip+":"+appSettings.port;

var $ajaxPost = {};
$ajaxPost._post = function (options) {

    var paramsObj = {};
    summer.writeConfig({
        "host": appSettings.ip, //向configure中写入host键值
        "port": appSettings.port //向configure中写入port键值
    });
    paramsObj.viewid = options.url;
    paramsObj.action = options.handler;
    paramsObj.params = options.data;
    paramsObj.header = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "imgfornote"
    }
    paramsObj.callback = options.success;
    paramsObj.error = options.error;
    paramsObj.isalerterror = "true",

    summer.callAction(paramsObj);
}
//打开相机拍照并展示，需要传一个视图容器， 返回一个base64字符串
// $obj: imgContainer   options:{height: Num,width:Num,quality:Num}
$.extend({
    _openCamaraHandler: function ($obj,options) {
        summer.openCamera({
            callback: function (args) {
                openCamaraOrAlbum($obj,args,options);
            }
        });
    },
    _openAblumHandler: function ($obj,options) {
        summer.openPhotoAlbum({
            callback: function (args) {
                openCamaraOrAlbum($obj,args,options);
            }
        });
    }
})
function openCamaraOrAlbum($obj,args,options) {
    if (arguments.length === 3){
        var width = options.width || undefined;
        var height = options.height||undefined;
        var quality = options.quality||undefined;
    }
    if ($obj.find("img").legth >0){
        $obj.html("");
    }
    var imgPath = args.imgPath;
    var img = new Image();
    img.src = imgPath; //base64字符串
    //这里设置的是撑开图片盒子，也可以自己设置宽和高
    img.style.width = "100%";
    img.style.height = "100%";
    $obj.append(img);
    img.onload = function () {
        //对图片进行压缩
        var canvas = document.createElement("canvas");
        canvas.width = width ||img.width;
        canvas.height = height||img.height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        //这里的压缩比例是0.85
        var dataURL = canvas.toDataURL('image/jpeg', quality||0.85);
        var base64Str = dataURL;
        return base64Str.slice(base64Str.indexOf("base64,")+7);
    }
}
