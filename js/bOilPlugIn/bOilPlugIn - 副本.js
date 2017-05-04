/**
 *@Name:    bOilPlugIn.js
 *@Object:  mobile
 *@Author:  XiaoYu/Guo CJ
 *@E-mail:  592429285@qq.com
 *@Time:    2017.01.12
 *@version: 1.1.1
*/

function bOilPlugIn () {};

bOilPlugIn.prototype = {
    constructor: bOilPlugIn,

    viewportHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

    viewportWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,

    status: false,

    //校验错误时返回的html
    resHtml: '',

    //120秒
    waitTime: 120,

    //等候加载提示语
    loadingText: '加载中，请稍等...',

    //需要校验的input标签的id名
    inputIdArray: [
        //检验手机号码的
        'userPhone', 

        //用户名
        'userName', 

        //真实姓名
        'realName', 

        //简单密码（6-16位数字和字母的组合）
        'passWordLoose', 

        //重复密码
        'rePassWordLoose', 

        //严格密码（6-16位字符，包含数字、大小写字母、符号中的2种）
        'passWord', 

        //重复密码
        'rePassWord', 

        //图形验证码
        'imgCode', 

        //短信验证码
        'phoneCode', 

        //交易密码
        'dealPassword',

        //重复交易密码
        'reDealPassword',

        //中文汉字
        'chinese',

        //简单金额
        'amountLoose',

        //严格金额
        'amount',

        //简单身份证
        'chinaIdLoose',

        //严格身份证
        'chinaId',

        //银行卡号
        'bankCard',

        //油卡号码
        'oilCard',

        //重复油卡号码
        'reOilCard'
    ],

    //校验的正则及对应提示语
    regs: {
        //手机号码
        userPhone : {
            reg: /^1[3-9]\d{9}$/,
            empty: '请输入手机号码',
            tips: '请输入正确的手机号码'
        },

        //用户名
        userName: {
            reg: /^[\u4E00-\u9FA5A-Za-z0-9_]{4,30}$/,
            empty: '请输入用户名',
            tips: '用户名只能为4-30位非特殊字符'
        },

        //真实姓名
        realName: {
            reg: /^[\u4E00-\u9FA5\sa-zA-Z]{2,20}$/,
            empty: '请输入真实姓名',
            tips: '姓名只能为2-20位中文或英文字符'
        },

        //简单密码（6-16位数字和字母的组合）
        passWordLoose: {
            reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            empty: '请输入密码',
            tips: '密码为6-16位数字和字母的组合'
        },

        //重复密码
        rePassWordLoose: {
            reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            empty: '请输入重复密码',
            tips: '两次密码不一致'
        },

        //严格密码（6-16位字符，包含数字、大小写字母、符号中的2种）
        passWord: {
            reg: /^(?=.{6,16})((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*[a-zA-Z])(?=.*[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]))|((?=.*[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]])(?=.*[0-9])).*$/,
            empty: '请输入密码',
            tips: '密码为6-16位字符，包含数字、大小写字母、符号中的2种'
        },

        //重复密码
        rePassWord: {
            reg: /^(?=.{6,16})((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*[a-zA-Z])(?=.*[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]))|((?=.*[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]])(?=.*[0-9])).*$/,
            empty: '请输入重复密码',
            tips: '两次密码不一致'
        },

        //图形验证码
        imgCode: {
            reg: /^[a-zA-Z0-9]{4}$/,
            empty: '请输入图形验证码',
            tips: '请输入正确图形验证码'
        },

        //短信验证码
        phoneCode: {
            reg: /^[0-9]{6}$/,
            empty: '请输入短信验证码',
            tips: '请输入正确短信验证码'
        },

        //交易密码
        dealPassword: {
            reg: /^[0-9]{6}$/,
            empty: '请输入交易密码',
            tips: '交易密码应为6位纯数字'
        },

        //重复交易密码
        reDealPassword: {
            reg: /^[0-9]{6}$/,
            empty: '请输入重复交易密码',
            tips: '两次交易密码不一致'
        },

        //中文汉字
        chinese: {
            reg: /^[\u4E00-\u9FA5]+$/,
            empty: '请输入中文文字',
            tips: '对不起，只能输入中文'
        },
        
        //简单金额
        amountLoose: {
            reg: /(0|[1-9]\d)(?:\.\d{1,2})/,
            empty: '',
            tips: '金额必须是不多于2位小数的数字'
        },

        //严格金额
        amount: {
            reg: /^(0|[1-9]\d{0,2}(,\d{3})*)(\.\d{2})?$/,
            empty: '',
            tips: '金额必须带2位小数，整数部分超过3位数需加千分号'
        },
        
        //简单身份证
        chinaIdLoose: {
            reg: /^(\d{18}|\d{15}|\d{17}[xX])$/,
            empty: '请输入身份证号码',
            tips: '请输入正确的身份证号码'
        },
        
        //严格身份证
        chinaId: {
            reg: /^[1-9]\d{5}[1-9]\d{3}(((0[13578]|1[02])(0[1-9]|[12]\d|3[0-1]))|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))(\d{4}|\d{3}[xX])$/,
            empty: '请输入身份证号码',
            tips: '请输入正确的身份证号码'
        },
        
        //银行卡号
        bankCard: {
            reg: /^(\d{16}|\d{19})$/,
            empty: '请输入银行卡号',
            tips: '请输入正确的银行卡号'
        },

        //油卡
        oilCard: {
            reg: /^(1\d{18}|9\d{15})$/,
            empty: '请输入油卡号码',
            tips: '请输入正确的油卡号码'
        },

        reOilCard: {
            reg: /^(1\d{18}|9\d{15})$/,
            empty: '请重复油卡号码',
            tips: '两次油卡号码不一致'
        }
    },

    //移动端浏览器检测
    platform: function () {
        var UA = navigator.userAgent, app = navigator.appVersion;
        //移动终端浏览器版本信息 
        return {
            trident: UA.indexOf('Trident') > -1, //IE内核 
            presto: UA.indexOf('Presto') > -1, //opera内核 
            webKit: UA.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
            gecko: UA.indexOf('Gecko') > -1 && UA.indexOf('KHTML') == -1, //火狐内核 
            mobile: Boolean(navigator.userAgent.match(/.*(iphone|ipod|ipad|android|symbian|nokia|blackberry| rim |opera mini|opera mobi|windows ce|windows phone|up\.browser|netfront|palm-|palm os|pre\/|palmsource|avantogo|webos|hiptop|iris|kddi|kindle|lg-|lge|mot-|motorola|nintendo ds|nitro|playstation portable|samsung|sanyo|sprint|sonyericsson|symbian).*/i) || navigator.userAgent.match(/alcatel|audiovox|bird|coral|cricket|docomo|edl|huawei|htc|gt-|lava|lct|lg|lynx|mobile|lenovo|maui|micromax|mot|myphone|nec|nexian|nook|pantech|pg|polaris|ppc|sch|sec|spice|tianyu|ustarcom|utstarcom|videocon|vodafone|winwap|zte/i)), //是否为移动终端 
            ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
            android: UA.indexOf('Android') > -1 || UA.indexOf('Linux') > -1, //android终端或者uc浏览器 
            iPhone: UA.indexOf('iPhone') > -1 || UA.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器 
            iPad: UA.indexOf('iPad') > -1, //是否iPad 
            webApp: UA.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
        };
    },

    //日期
    getDate: function () {
        var D = new Date(),
            getFullYear = D.getFullYear(),
            getMonth = D.getMonth() + 1 + '',
            getDate = D.getDate() + '',
            getDay = D.getDay() + '',
            getHours = D.getHours() + '',
            getMinutes = D.getMinutes() + '',
            getSeconds = D.getSeconds() + '',
            getTimes =  D.getTime();

        if (getMonth.length == 1) 
            getMonth = '0' + getMonth;
        if (getDate.length == 1) 
            getDate = '0' + getDate;
        if (getDay.length == 1) 
            getDay = '0' + getDay;
        if (getHours.length == 1) 
            getHours = '0' + getHours;
        if (getMinutes.length == 1) 
            getMinutes = '0' + getMinutes;
        if (getSeconds.length == 1) 
            getSeconds = '0' + getSeconds;

        return {
            getFullYear: getFullYear,
            getMonth: getMonth,
            getDate: getDate,
            getDay: getDay,
            getHours: getHours,
            getMinutes: getMinutes,
            getSeconds: getSeconds,
            getFullDateCn: getFullYear + '年' + getMonth + '月' + getDate + '日 ' + getHours + ':' + getMinutes + ':' + getSeconds,
            getFullDateEn: getMonth + '/' + getDate + '/' + getFullYear + ' ' + getHours + ':' + getMinutes + ':' + getSeconds,
            getTime: getHours + ':' + getMinutes + ':' + getSeconds,
            getTimes: getTimes,
            'Y-M-D': getFullYear + '-' + getMonth + '-' + getDate,
            'MDY': getMonth + '/' + getDate + '/' + getFullYear
        };
    },

    //校验主程序
    forCheck: function (resNum, argCurr, thisElement) {
        var _this = this, resFun, returnResult = true;      
        if (resNum > -1) {//校验id传参正确
            resFun = checkThis(argCurr, _this);
        } else {//传参错误
            function Error (thisInputId) {
                _this.alertMsg('id "' + thisInputId + '" 不符合要求！', thisElement);
                _this.resHtml = '';
                return false;
            }
            resFun = Error(argCurr);
        }

        function checkThis (thisInputId, _this) {
            var thisVal = $('#' + thisInputId).val().replace(/\s+/g, '');
            if (thisVal == '') {
                _this.alertMsg(_this.regs[argCurr].empty, thisElement);
                _this.resHtml = '';
                returnResult = false;
            } else {
                if (!_this.regs[argCurr].reg.test(thisVal)) {
                    alertMsgFun(_this);
                } else {
                    //简单重复密码
                    if (argCurr == 'rePassWordLoose') {//如果是重复密码校验
                        if ($('#' + argCurr).val() != $('#passWordLoose').val()) {//判断两次输入的密码是否相同
                            alertMsgFun(_this);
                        }
                    }

                    //严格重复密码
                    if (argCurr == 'rePassWord') {//如果是重复密码校验
                        if ($('#' + argCurr).val() != $('#passWord').val()) {//判断两次输入的密码是否相同
                            alertMsgFun(_this);
                        }
                    }

                    //交易密码重复密码
                    if (argCurr == 'reDealPassword') {//如果是重复密码校验
                        if ($('#' + argCurr).val() != $('#dealPassword').val()) {//判断两次输入的交易密码是否相同
                            alertMsgFun(_this);
                        }
                    }

                    //重复油卡号码
                    if (argCurr == 'reOilCard') {//如果是重复油卡号码校验
                        if ($('#' + argCurr).val() != $('#oilCard').val()) {//判断两次输入的油卡号码是否相同
                            alertMsgFun(_this);
                        }
                    }
                }
            }
            return returnResult;
        }
        
        function alertMsgFun (_this) {
            _this.alertMsg(_this.regs[argCurr].tips, thisElement);
            _this.resHtml = '';
            returnResult = false;
        }

        return !!resFun;
    },

    //获取短信验证码
    getPhoneCord: function () {
        var thisBtnId = arguments[0].id,
            thisElement = $('#' + thisBtnId), 
            forCheckRes = false,
            argCurr = '',
            resNum = 0,
            date = null;

        //存在禁用状态时,终止执行函数
        if (thisElement.hasClass('active')) {
            return false;
        }

        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                //遍历传进来的id参数
                argCurr = arguments[i];
                //去掉#号的前缀
                if (argCurr.indexOf('#') === 0) {
                    argCurr = argCurr.replace(/^#/, '');
                }
                //判断传进来的id参数是否存在于预定义的id数组里面
                resNum = this.inputIdArray.indexOf(argCurr);

                forCheckRes = this.forCheck(resNum, argCurr, thisElement);
                if (!forCheckRes) return false;
            }
        }

        date = this.getDate();

        return date.getTimes;
    },

    //提交表单
    submintForm: function () {
        var thisBtnId = arguments[0].id,
            thisElement = $('#' + thisBtnId), 
            forCheckRes = false,
            argCurr = '', 
            resNum = 0;

        //存在禁用状态时,终止执行函数
        if (thisElement.hasClass('active')) {
            return false;
        }

        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                //遍历传进来的id参数
                argCurr = arguments[i];
                //去掉#号的前缀
                if (argCurr.indexOf('#') === 0) {
                    argCurr = argCurr.replace(/^#/, '');
                }

                //判断传进来的id参数是否存在于预定义的id数组里面
                resNum = this.inputIdArray.indexOf(argCurr);

                forCheckRes = this.forCheck(resNum, argCurr, thisElement);
                if (!forCheckRes) return false;
            }
        }
        return true;
    },

    //倒计时
    codeTime: function (id, times, duringTimes) {
        var _this = this, thisElement = $('#' + id);
   /*     if (_this.waitTime <= 0) {
            thisElement.text('获取验证码').removeClass('disabled active');
            _this.waitTime = 120;
        } else {
            thisElement.text(_this.waitTime + ' 秒后重发').addClass('disabled active');
            _this.waitTime--;
            setTimeout(function() {
                var date = new Date(), newTimes = date.getTime();
                _this.waitTime = Math.ceil(duringTimes - (newTimes - times)/1000);
                _this.codeTime(id, times, duringTimes);
            }, 1000);
        }*/

        var intervalObj = null;
        intervalObj = setInterval(function(){
            if($('#' + id).length <= 0){
                thisElement.text('获取验证码').removeClass('disabled active');
                _this.waitTime = 120;
                clearInterval(intervalObj);
            }else {
                if (_this.waitTime <= 0) {
                    thisElement.text('获取验证码').removeClass('disabled active');
                    _this.waitTime = 120;
                    clearInterval(intervalObj);
                } else {
                    thisElement.text(_this.waitTime + ' 秒后重发').addClass('disabled active');
                    _this.waitTime--;

                    var date = new Date(), newTimes = date.getTime();
                    _this.waitTime = Math.ceil(duringTimes - (newTimes - times) / 1000);
                    //_this.codeTime(id, times, duringTimes);
                }
            }

        },1000);
    },

    //表单校验弹层
    alertMsg: function (text, thisElement, icon, isClear) {
        var text = text || '', thisElement = $(thisElement) || null, icon = icon || '', isClear = isClear || '',
            message = '', iconState = '', iconHtml = '';

        //如果页面存在信息提示框，终止执行函数
        if ($('.mask').length) return;

        if (thisElement) {
            if (thisElement.hasClass('active'))  return;
            thisElement.addClass('active');
        }

        if (icon) {
            if (icon == 'warning') {//警告
                iconState = 'icon-tishikuangjingshi';
            }
            if (icon == 'success') {//成功
                iconState = 'icon-ok';
            }
            if (icon == 'fail') {//失败
                iconState = 'icon-no';
            }
            if (icon == 'loading') {//加载等待
                iconState = 'icon-loading';
            }
            iconHtml = '<i Class="' + iconState + '"></i>';
        }

        this.resHtml = iconHtml + '<span class="mask-txt word-break">' + text + '</span>';
        $('body').append('<div class="mask active">' + this.resHtml + '</div>');
        this.middleText('.mask', thisElement, isClear);
    },

    //清除已有提示
    clearAlertMsg: function () {
        if ($('.mask').length) {
            $('.mask').remove();
        }
    },    

    //绝对定位垂直居中
    middleText: function (className, thisElement, isClear) {
        var _this = this, thisEl = $(className), h = thisEl.height();
        thisEl.css('margin-top', -h/2 + 'px');

        if (!(isClear == 'noClear') && !(isClear == 'noclear')) {
            //手动点击隐藏
            this.clickDisappear(thisElement);

            //2秒后自动隐藏
            setTimeout(function () {
                if (!_this.status) {
                    _this.disappear(thisElement);
                }
                _this.status = false;
            }, 2000);
        }
    },

    //手动隐藏提示框
    clickDisappear: function (thisElement) {
        var _this = this;
        $('.mask').on('click', function () {
            _this.clearAlertMsg();
            _this.status = true;

            if (thisElement) {
                thisElement.removeClass('active');
            }
        });
    },

    //2秒后自动隐藏提示框
    disappear: function (thisElement) {
        var _this = this;
        
        _this.clearAlertMsg();
        if (thisElement) {
            thisElement.removeClass('active');
        }
    },

    //常规弹层
    tips: function (config) {
        var _this = this, 
        o = {
            title: config.title || '',
            closeId: config.closeId || '',
            content: config.content || '',
            btn: config.btn || null,
            btnNums: config.btnNums || 0,
            btnSureCallback: null,
            btnSureDisplay: false,
            btnCancleCallback: null,
            btnCancleDisplay: false,
            refresh: false,
            alone: config.alone || false,
            fixedHeight: config.fixedHeight || false
        },
        iconBtn = o.closeId ? '<i id="' + o.closeId + '" class="icon-no icon-btn"></i>' : '',
        titleHtml = '<h2 class="title text-center">' + o.title + iconBtn + '</h2>',
        btnHtml = '',
        contHtml = '',
        maskInner = null,
        maskInnerHeight = 0,
        maxHeight = _this.viewportHeight - 100,
        titleHeight = 0,
        cont = null,
        btnContHeight = 0,
        refreshVSbtncb = function () {
            if (typeof o.btn.btnSure.fun == 'function') {
                o.btnSureCallback = o.btn.btnSure.fun;
                if (o.btn.btnSure.display) {
                    o.btnSureDisplay = o.btn.btnSure.display;
                }
            }

            if (typeof o.btn.btnSure.refresh === true) {
                o.refresh = true;
            }
        };

        if (!o.alone) {
            contHtml = '<div class="cont word-break">' + o.content + '</div>';
        } else {
            contHtml = '<div class="cont word-break alone">' + o.content + '</div>';
        }

        if (o.btnNums === 1) {
            //确定按钮是否带回调函数
            refreshVSbtncb();

            btnHtml = '<div class="btnCont"><a id="btnSure" class="btn btn-danger" href="' + o.btn.btnSure.href + '">' + o.btn.btnSure.text + '</a></div>';
        } else if (o.btnNums === 2) {
            //确定按钮是否带回调函数
            refreshVSbtncb();

            //取消按钮是否带回调函数
            if (typeof o.btn.btnCancle.fun == 'function') {
                o.btnCancleCallback = o.btn.btnCancle.fun;
                if (o.btn.btnCancle.display) {
                    o.btnCancleDisplay = o.btn.btnCancle.display;
                }
            }

            btnHtml = '<div class="btnCont clear">' + 
                '<span class="left"><a id="btnCancle" class="btn btn-cancle" href="' + o.btn.btnCancle.href + '">' + o.btn.btnCancle.text + '</a></span>' + 
                '<span class="right"><a id="btnSure" class="btn btn-submit" href="' + o.btn.btnSure.href + '">' + o.btn.btnSure.text + '</a></span></div>';
        }

        $('body').append('<div id="maskFull" class="mask-full active"></div><div id="maskInner" class="mask-inner">' + titleHtml + contHtml + btnHtml + '</div>');

        //设置弹层整体高度和居中显示
        maskInner = $('.mask-inner');
        maskInnerHeight = maskInner.height();

        titleHeight = $('.mask-inner > .title').get(0).clientHeight;
        cont = $('.mask-inner > .cont');
        btnContHeight = $('.mask-inner > .btnCont').height();

        if (maskInnerHeight > maxHeight || o.fixedHeight) {//给maskInner设定固定高度
            maskInnerHeight = maxHeight;
            cont = cont.removeClass('alone');
            if (o.btnNums) {
                cont.css('height', maskInnerHeight - titleHeight - btnContHeight - 15 + 'px');
            } else {
                cont.css('height', maskInnerHeight - titleHeight - 15 + 'px');
            }
        }
        maskInner.css({
            'margin-top': (-maskInnerHeight/2 + 'px'),
            'height': (maskInnerHeight + 'px'),
            'max-height': (maskInnerHeight + 'px')
        }).addClass('active');

        if (typeof o.btnSureCallback == 'function') {
             var resObj = o.btnSureCallback() || null;
             if (typeof resObj == 'object') {//返回对象
                if (typeof resObj.btnPhoneCode == 'function') {
                    //验证码按钮
                    $('#btnPhoneCode').on('click', function () {
                        var e = this;
                        resObj.btnPhoneCode(e);
                    });
                 }

                 if (typeof resObj.btnSure == 'function') {
                    //确定按钮
                    $('#btnSure').on('click', function () {
                        var e = this;
                        var rescb = resObj.btnSure(e) || null;
                        if (rescb === 'loading'){
                            //等候加载提示
                            _this.alertMsg(_this.loadingText, null, 'loading', 'noClear');
                        }
                        _this.resHtml = '';
                        if (!o.btnSureDisplay) {
                            $('#maskFull, #maskInner').remove();
                        }
                    });
                 }
             } else if (typeof resObj == 'function') {//返回function
                //确定按钮
                $('#btnSure').on('click', function () {
                    var e = this;
                    resObj(e);
                    _this.resHtml = '';
                    if (!o.btnSureDisplay) {
                        $('#maskFull, #maskInner').remove();
                    }
                });
             }                 
        }
        
        //取消按钮
        $('#btnCancle').on('click', function () {
            if (typeof o.btnCancleCallback == 'function') {
                o.btnCancleCallback();
            }
            if (!o.btnCancleDisplay) {
                $('#maskFull, #maskInner').remove();
            }
        });

        //关闭弹层
        $('#' + o.closeId).on('click', function(){
            $('#maskFull, #maskInner').remove();
            if (o.refresh){
                _this.refresh(true);
            }
        });
    },

    //底部固定按钮
    fixedBtn: function (id) {
        var _this = null, _thisId = id, h = '';
        if (_thisId.indexOf('#') === -1) {
            _thisId = '#' + _thisId;
        }
        _this = $(_thisId);
        if (_this.length) {
            h = _this.height();
            $('.container').css('padding-bottom', h / 10 + 2 + 'rem');
        }

        //获取焦点隐藏清除控件
        $('input').on('focus', function(e) {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            $(id).css('position', 'relative');
        }).on('blur', function () {
            $(id).css('position', 'fixed');
        });
    },

    //滚动列表
    scrollMsg: function (id, time, listNum) {
        var tagUl = null, _thisId = id, time = time || 2500, listNum = listNum || 5, liLength = 0;
        if (_thisId.indexOf('#') === -1) {
            _thisId = '#' + _thisId;
        }
        tagUl = $(_thisId + ' ul'), liLength = tagUl.find('li').length;

        if (liLength > listNum) {
            (function scroll () {
                tagUl.prepend(tagUl.find('li:last').css('height', '0').animate({
                    height: 3 + 'rem'
                }, 'slow'));
                var timer = setTimeout(function () {
                    scroll();
                }, time);
            })();
        }
    },

    //刷新页面
    refresh: function (boolean) {
        window.location.reload(boolean);
    },

    //长号码4位数分割
    NumberSeparation: function (className) {
        var _this = this;
        if (!(className.indexOf('.') === 0)) {
            className = '.' + className;
        }
        $(className).on('input', function() {
            var thisVal = $(this).val().replace(/\s/g, ''), strl = thisVal.length, reg = /^[0-9]+$/;
            if (reg.test(thisVal)) {
                if (strl > 4) {
                    thisVal = thisVal.replace(/(\d{4})(?=\d)/g, '$1 ');
                    $(this).val(thisVal);
                }
            } else {
                if (thisVal !== '') {
                    _this.alertMsg('请输入正确的卡号');
                }
            }
        });
    },

    //页面底部箭头
    footerArrow: function (id) {
        var _this = $(id), 
            //页面整体高度
            bH = $('body')[0].scrollHeight, 
            //设备视窗高度
            vH = this.viewportHeight;
        $(window).scroll(function(){
            //滚动条滚动距离
            var bsH = $("body")[0].scrollTop;
            if(bsH >= bH - vH){
                _this.addClass('hide')
            }else{
                _this.removeClass('hide');
            }
        });
    },

    //显示隐藏密码
    pwdShowHide: function () {
        var _this = null, eyes = null, i = 0, argCurr = '', l = arguments.length; 
        if (l > 0) {
            for (; i < l; i++) {
                argCurr = arguments[i];
                if (argCurr.indexOf('#') === -1) {
                    argCurr = '#' + argCurr;
                }

                _this = $(argCurr);
                _this.after('<i data-show="false" data-click="iconEyes" class="icon-buxianshi01"></i>');
            }

            $('input[type="password"]').on('input', function () {
                if ($(this).val().length > 0) {
                    $(this).parent().addClass('active');
                } else {
                    $(this).parent().removeClass('active');
                }
            }).on('click', function (e) {
                //阻止事件冒泡
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
                $(this).parent('.form-group').parent('li').siblings().find('.form-group').removeClass('active');
                if ($(this).val() === '') {
                    $(this).parent().removeClass('active');
                } else {
                    $(this).parent().addClass('active');
                }
            });
            
            $('input[type="password"] + i[class^="icon-"]').on('click', function () {
                //阻止事件冒泡
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
                if ($(this).attr('data-show') === 'false') {
                    $(this).addClass('icon-49').removeClass('icon-buxianshi01').attr('data-show', 'true').siblings().attr('type', 'text');
                } else {
                    $(this).addClass('icon-buxianshi01').removeClass('icon-49').attr('data-show', 'false').siblings().attr('type', 'password');
                }
            });

            //点击文本框已区域以外地方时文本框失去焦点
            $('body').on('click', function() {
                var _parent = $('input[type="password"]').parent();
                if (_parent.hasClass('active')) {
                    _parent.removeClass('active');
                }
            });
        }
    },

    //清除文本框
    clearInput: function () {
        $('input[type="text"], input[type="tel"]').after('<i data-show="false" class="icon-x"></i>');

        $('input[type="text"], input[type="tel"]').on('input', function () {
            if ($(this).val() === '') {
                $(this).parent().removeClass('active');
            } else {
                $(this).parent().addClass('active');
            }
        }).on('click', function (e) {
            //阻止事件冒泡
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            $(this).parent('.form-group').parent('li').siblings().find('.form-group').removeClass('active');
            if ($(this).val() === '') {
                $(this).parent().removeClass('active');
            } else {
                $(this).parent().addClass('active');
            }
        });

        //清除文本框内容
        $('input[type="text"] + i[class="icon-x"], input[type="tel"] + i[class="icon-x"]').on("click", function() {
            $(this).siblings('input').val('').parent().removeClass('active');
        });

        //点击文本框已区域以外地方时文本框失去焦点
        $('body').on('click', function() {
            var _parent = $('input[type="text"], input[type="tel"]').parent();
            if (_parent.hasClass('active')) {
                _parent.removeClass('active');
            }
        });
    },

    //活动声明
    activityStatement: function (text) {
        var platform = this.platform();
        if (platform.mobile && platform.ios) {
            $('.container').append('<div class="activityStatement">' + text + '</div>');
        }
    }
};