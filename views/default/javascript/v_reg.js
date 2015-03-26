//全局变量 存储当前注册类型
var regType = "email";
var submitenable = true; //是否能提交表单
var referUrl = "https://login.vancl.com/login/login.aspx"; //跳转Url
var curEmail, curPhone;

//定义 注册的枚举类型
var regEnum = {
    Email: "email",
    Phone: "phone"
};

var Resource = {
    ErrorImage: "<p class='v2regBtn_02' name='ValidateIng'><img  src='"+skin+"images/front/no.gif' /></p>",
    RightImage: "<p class='v2regBtn_02' name='ValidateIng'><img  src='"+skin+"images/front/yes.gif' /></p>",
    ValidateIng: "<p name='ValidateIng'><img src='"+skin+"images/front/loading.gif' align='absmiddle'/>正在验证...</p>",
    ValidateSubmit: "<img src='"+skin+"images/front/loading.gif' align='absmiddle'/>正在提交...",
    SubmitTitle: "同意以上条款并注册",
    TipEmail: "Email地址作为用户名，同时也用于接收账户信息、订单通知及密码找回等功能",
    TipUserName: "用户名必须是由2-20个字符，可以为字数，数字下划线和中文",
    TipPwd: "6-16位字符，可使用字母、数字或符号的组合",
    TipRePwd: "请再次输入登录密码，两次输入必须一致",
    TipValidate: "请输入图片中的字符，大小写不限",
    TipValidate1: "请输入图片中的验证码，大小写不限",
    TipPhone: "请填写真实的手机号，并进行验证",
    TipPhoneCode: "请输入手机接收到的验证码",
    TipEmailRemark: "请填写有效的Email地址用于接收账户信息、订单通知等提醒邮件",
    TipPhoneRegisted: "该手机号已被注册。您可以重新输入其他手机号，或请使用该手机号<a class='phonelogin' href='" + referUrl + "'>登录</a>"
};
//获得焦点 显示提示信息
$(document).ready(function () {
    var isSubmit = false;
    var _referUrl = document.getElementById("hdn_ResourceHref_name").value;
    if (_referUrl != null && _referUrl != "" && _referUrl != "/login/regsuccess.aspx") {
        referUrl += "?" + _referUrl;
    }
    Resource.TipPhoneRegisted = "该手机号已被注册。您可以重新输入其他手机号，或请使用该手机号<a class='phonelogin' href='" + referUrl + "'>登录</a>";
    TabChange(regType);
    $('#img_validatecode,.FSVerification').click(function () {
        $('#img_validatecode').attr('src', webroot+'simple/getCaptcha?random=' + new Date().getTime());
        $('#input_validatecode').val('').focus();
        $(this).parent().find('.v2regBtn_02').remove();
        $(this).parent().find('span').hide();
        return false;
    }).css('cursor', 'pointer');
    $('#img_phonevalidate,a.grayft6').click(function () {
        $('#img_phonevalidate').attr('src', '/Controls/CalculateValidateCode.ashx?t=' + new Date().getTime());
        $('#input_phonevalidate').val('').focus();
        $('.inviteTips_ft').html('<img src="https://ssl.vanclimg.com/login/inviteico1.gif">请输入验证码！');
        return false;
    }).css('cursor', 'pointer');
    $('.email li').mouseover(function () {
        $('.email li').removeClass('v2reg_bg');
        $(this).addClass('v2reg_bg').removeClass('v2reg_bg1');
    }).mouseout(function () {
        $(this).addClass('v2reg_bg1').removeClass('v2reg_bg');
    });
    $('#input_phonevalidate').keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $('.inviteTips_img a').click();
        }
    });
    $('#input_email').focus(function () { showTips($(this), Resource.TipEmail); })
    .blur(function () {
        var email = $(this).val();
        if (email.length == 0) {
            showTips($(this), '');
        }
        else {
            checkEmail(function () { checkUserName($('#input_email')); });
        }
    }).keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var email = $(this).val();
            if (email.length == 0) {
                showTips($(this), '');
            }
            else {
                checkEmail(function () {
                    checkUserName($('#input_email'), function () { $('#input_password').focus(); });
                });
            }
        }
    });
    $('#input_username').focus(function () { showTips($(this), Resource.TipUserName); })
    .blur(function () {
        var username = $(this).val();
        if (username.length == 0) {
            showTips($(this), '');
        }
        else {
            checkUN(function () { checkUserName($('#input_username')); });
        }
    }).keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var username = $(this).val();
            if (username.length == 0) {
                showTips($(this), '');
            }
            else {
                checkUN(function () {
                    checkUserName($('#input_username'), function () { $('#input_password').focus(); });
                });
            }
        }
    });

    $('#input_phone').focus(function () { showTips($(this), Resource.TipPhone); })
    .blur(function () {
        var mobile = $(this).val();
        if (mobile.length == 0) {
            showTips($(this), '');
        }
        else {
            checkPhone(function () { checkUserName($('#input_phone')); });
        }
    }).keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var mobile = $(this).val();
            if (mobile.length == 0) {
                showTips($(this), '');
            }
            else {
                checkPhone(function () {
                    checkUserName($('#input_phone'), function () { $('#input_phonecode').focus(); });
                });
            }
        }
    });
    $('#input_phonecode').focus(function () { showTips($(this), Resource.TipPhoneCode); })
     .blur(function () {
         var code = $(this).val();
         if (code.length == 0) {
             showTips($(this), '');
         }
         else {
             checkPhone(function () {
                 checkUserName($('#input_phone'), checkPhoneCode);
             });
         }
     }).keyup(function (e) {
         if (e.which == 13) {
             e.preventDefault();
             var code = $(this).val();
             if (code.length == 0) {
                 showTips($(this), '');
             }
             else {
                 checkPhone(function () {
                     checkUserName($('#input_phone'), checkPhoneCode(function () {
                         $('#input_password').focus();
                     }));
                 });
             }
         }
     });
    $('#input_password').focus(function () {
        $('.v2reg_Safetyinfo').hide();
        showTips($(this), Resource.TipPwd);
    })
    .blur(function () {
        $('.v2reg_Safetyinfo').hide();
        var password = $(this).val();
        if (password.length == 0) {
            showTips($(this), '');
        }
        else {
            checkPassword(checkRePassword);
        }
    }).keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $('.v2reg_Safetyinfo').hide();
            var password = $(this).val();
            if (password.length == 0) {
                showTips($(this), '');
            }
            else {
                checkPassword(function () { $('#input_repassword').focus(); });
            }
        }
    });
    $('#input_repassword').focus(function () { showTips($(this), Resource.TipRePwd); })
    .blur(function () {
        var password = $(this).val();
        if (password.length == 0) {
            showTips($(this), '');
        }
        else {
            checkRePassword();
        }
    }).keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var password = $(this).val();
            if (password.length == 0) {
                showTips($(this), '');
            }
            else {
                checkRePassword(function () {
                    if (regType == regEnum.Phone) {
                        $('#submitRegister').click();
                    }
                    else {
                        $('#input_validatecode').focus();
                    }
                });
            }
        }
    });
    $('#input_validatecode').focus(function () {
        var tips = Resource.TipValidate1;
        if ($('#img_validatecode').width() < 100) {
            tips = Resource.TipValidate;
        }
        showTips($(this), tips);
    })
    .blur(function () {
        var password = $(this).val();
        if (password.length == 0) {
            showTips($(this), '');
        }
        else {
            checkValidateCode();
        }
    }).keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var password = $(this).val();
            if (password.length == 0) {
                showTips($(this), '');
            }
            else {
                checkValidateCode(function () {
                    if (regType == regEnum.Email) {
                        $('#submitRegister').click();
                    }
                });
            }
        }
    });
    var showTips = function (element, tips) {
        var li = element.parent();
        li.find('[name="ValidateIng"]').remove();
        li.find('.v2regBtn_02').remove().end().find('>span').show();
        if (element.val().trim().length > 0 && tips.length == 0)
            li.find('>span:eq(0)').before(Resource.RightImage);
        li.find('>span:eq(1)').removeClass('v2reg_tips02').addClass('v2reg_tips01').html(tips);
    };
    var showError = function (element, error) {
        var li = element.parent();
        li.find('[name="ValidateIng"]').remove();
        li.find('.v2regBtn_02').remove().end().find('>span').show();
        li.find('>span:eq(0)').before(Resource.ErrorImage);
        li.find('>span:eq(1)').removeClass('v2reg_tips01').addClass('v2reg_tips02').html(error);
    };
    var checkUN = function (callback) {
        var username = $('#input_username').val().trim();
        if (username != $('#input_username').val()) {
            showError($('#input_username'), '不允许输入空格');
            return false;
        }
        else if (username.length == 0) {
            showError($('#input_username'), '请输入有效的用户名');
            return false;
        } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]{2,20}$/.test(username)) {
            showError($('#input_username'), '请输入有效的用户名');
            return false;
        }
        else {
            showTips($('#input_username'), '');
            if (callback) {
                callback();
            }
        }
        return true;
    };
    var checkEmail = function (callback) {
        var email = $('#input_email').val().trim();
        if (email != $('#input_email').val()) {
            showError($('#input_email'), '不允许输入空格');
            return false;
        }
        else if (email.length == 0) {
            showError($('#input_email'), '请输入有效的Email地址');
            return false;
        } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.(\w)+)*(\.(\w){2,3})$/.test(email)) {
            showError($('#input_email'), '请输入有效的Email地址');
            return false;
        }
        else {
            showTips($('#input_email'), '');
            if (callback) {
                callback();
            }
        }
        return true;
    };
    var checkUserName = function (element, callback) {
        element.parent().find('[name="ValidateIng"]').remove();
        //alert(encodeURIComponent(element.val().trim()));
        var paramerValue = encodeURIComponent(element.val().trim());
        var baseUrl = webroot+"simple/reg_CheckValidate?";
        var Url = element.selector.indexOf("email")>-1?baseUrl+"email=" + paramerValue:baseUrl+"username=" + paramerValue;
        $.ajax({
            url: Url,
            cache: false,
            async: true,
            datatype: "json",
            beforeSend: function () {
                element.parent().find('>span:eq(0)').before(Resource.ValidateIng);
                element.parent().find('.v2regBtn_02').remove();
            },
            success: function (data) {
            	data = eval("(" + data + ")");
                if (data != null && data != "" && data.Error != "") {
                    //if (data.Error == undefined)
                    showError(element, data.Error);
                    isSubmit = false;
                    return false;
                } else {
                    showTips(element, '');
                    if (callback) {
                        callback();
                    }
                    return true;
                }
            }
        });
        return true;
    };
    var checkPassword = function (callback) {
        var element = $('#input_password');
        var password = element.val().trim();
        if (element.val() != element.val().trim()) {
            showError(element, '密码中不允许输入空格,请重新输入');
            return false;
        }
        else if (password.length == 0) {
            showError(element, '密码不能为空');
            return false;
        }
        else if (password.length < 6) {
            showError(element, '密码必须大于6位,请重新输入');
            return false;
        }
        else if (password.length > 16) {
            showError(element, '密码长度必须为6-16位,请重新输入');
            return false;
        }
        else {
            var chinese = password.match(/[^\x00-\xff]/ig) || [];
            if (chinese.length > 0) {
                showError(element, '密码必须为字母、数字或符号的组合,请重新输入');
                return false;
            }
            else {
                showTips(element, '');
                var number = password.match(/\d/ig) || [];
                var c = password.match(/[a-zA-Z]/ig) || [];
                var length = number.length + c.length;
                if (length == 0 || number.length == password.length || c.length == password.length) {
                    //只设置了数字或者字母或者符号
                    $(".v2reg_Safetyinfo div").removeClass().addClass("v2regimg_01");
                    $('.v2reg_Class').html('弱');
                }
                else if (number.length == 0 || c.length == 0 || length == password.length) {
                    //数字+字母；数字/字母+符号
                    $(".v2reg_Safetyinfo div").removeClass().addClass("v2regimg_02");
                    $('.v2reg_Class').html('中');
                }
                else {
                    //安全程度强：数字+字母+符号
                    $(".v2reg_Safetyinfo div").removeClass().addClass("v2regimg_03");
                    $('.v2reg_Class').html('强');
                }
                $('.v2reg_Safetyinfo').show();
                if (callback) {
                    callback();
                }
            }
        }
        return true;
    };
    var checkRePassword = function (callback) {
        var element = $('#input_repassword');
        var password = $('#input_password').val().trim();
        var password1 = $('#input_repassword').val().trim();
        if (isSubmit && password1 == "") {
            showError(element, '两次输入密码不一致，请重新输入');
            return false;
        }
        else if (password1 != "" && $('#input_password').val() != $('#input_repassword').val()) {
            showError(element, '两次输入密码不一致，请重新输入');
            return false;
        }
        else if (password1.length > 5 && password1.length < 17 && password1 == password) {
            showTips(element, '');
            if (callback) {
                callback();
            }
        }
        return true;
    };
    var checkValidateCode = function (callback) {
        var element = $('#input_validatecode');
        element.parent().find('[name="ValidateIng"]').remove();
        var password = $('#input_validatecode').val().trim();
        if (password != $('#input_validatecode').val()) {
            showError(element, '验证码不能输入空格');
            return false;
        }
        else if (password.length == 0) {
            showError(element, '验证码不能为空');
            return false;
        }
        else {
            showTips(element, '');
            var Url = webroot+"simple/reg_CheckValidate?VCode=" + encodeURIComponent(element.val().trim());
            $.ajax({
                url: Url,
                cache: false,
                async: true,
                datatype: "json",
                beforeSend: function () {
                    element.parent().find('>span:eq(0)').before(Resource.ValidateIng);
                    element.parent().find('.v2regBtn_02').remove();
                },
                success: function (data) {
                    element.parent().find('[name="ValidateIng"]').remove();
                    data = eval("(" + data + ")");
                    if (data != null && data != "" && data.Error != "") {
                        //if (data.Error == undefined)
                        //$('#img_validatecode').attr('src', webroot+'simple/getCaptcha?random=' + new Date().getTime());
                        //$('#input_validatecode').val('');
                        showError(element, data.Error);
                        isSubmit = false;
                        return false;
                    } else {
                        showTips(element, '');
                        if (callback) {
                            callback();
                        }
                        return true;
                    }
                }
            });
        }
        return true;
    };
    var checkPhone = function (callback) {
        $('.iFloatingwindow').hide();
        var element = $('#input_phone');
        var phone = element.val();
        if (!/^((13|15|18|14)+\d{9})$/.test(phone)) {
            showError(element, '请输入有效的手机号');
            return false;
        }
        else {
            showTips(element, '');
            if (callback) {
                callback();
            }
        }
        return true;
    };
    var checkPhoneCode = function (callback) {
        var element = $('#input_phonecode');
        element.parent().find('[name="ValidateIng"]').remove();
        var code = $('#input_phonecode').val();
        if (code != $('#input_phonecode').val()) {
            showError(element, '验证码不能输入空格');
            return false;
        }
        else if (code.length == 0) {
            showError(element, '请输入验证码');
            return false;
        }
        else if (code.length != 6) {
            showError(element, '输入的验证码错误，请重试');
            return false;
        }
        else {
            element.parent().find('[name="ValidateIng"]').remove();
            $.ajax({
                url: 'SendMobileValidateKey.ashx?action=1&mobile=' + encodeURIComponent($('#input_phone').val().trim())
            + '&validatecode=' + encodeURIComponent(code),
                cache: false,
                async: true,
                datatype: "json",
                beforeSend: function () {
                    element.parent().find('>span:eq(0)').before(Resource.ValidateIng);
                    element.parent().find('.v2regBtn_02').remove();
                },
                success: function (data) {
                    if (data != null && data != "") {
                        if (data.Error == undefined)
                            data = eval("(" + data + ")");
                        showError(element, data.Error);
                        return false;
                    } else {
                        showTips(element, '');
                        if (callback) {
                            callback();
                        }
                        return true;
                    }
                }
            });
        }
        return true;
    };
    $('.asPhoneregBtn').click(function () {
        checkPhone(function () {
            checkUserName($('#input_phone'), function () {
                $('#img_phonevalidate').click();
                $('.iFloatingwindow').show();
                $('#input_phonevalidate').focus();
            });
        });
        return false;
    });
    $('.inviteTips_img a').click(function () {
        var code = $('#input_phonevalidate').val().trim();
        if (code.length == 0) {
            $('#input_phonevalidate').focus();
            $('.inviteTips_ft').html('<img src="https://ssl.vanclimg.com/login/inviteico.gif"><font color="red">请输入验证码</font>！');
            return false;
        }
        $.ajax({
            url: 'SendMobileValidateKey.ashx?action=0&mobile=' + encodeURIComponent($('#input_phone').val().trim())
            + '&validatecode=' + encodeURIComponent(code),
            cache: false,
            async: true,
            datatype: "json",
            beforeSend: function () {
                $('.inviteTips_img a').hide().after("<img src='https://ssl.vanclimg.com/login/loading.gif' align='absmiddle'/>");
                $('.inviteTips_ft').html('');

            },
            success: function (data) {
                $('.inviteTips_img a').next().remove();
                if (data != null && data != "") {
                    if (data.Error == undefined)
                        data = eval("(" + data + ")");
                    var success = Number(data.success) || -1;
                    if (success == -1) {
                        $('.inviteTips_ft').html('<img src="https://ssl.vanclimg.com/login/inviteico.gif">' + data.Error);
                        $('.inviteTips_img a').show();
                        $('.inviteTips_img a').parent().find('>img').remove();
                    }
                    else {
                        showError($('#input_phone'), data.Error);
                        $('.iFloatingwindow').hide();
                        $('.inviteTips_img a').show();
                        $('.inviteTips_ft').html('<img src="https://ssl.vanclimg.com/login/inviteico1.gif">请输入验证码');
                    }
                }
                else {
                    $('.iFloatingwindow').hide();
                    $('.inviteTips_img a').show();
                    $('.inviteTips_ft').html('<img src="https://ssl.vanclimg.com/login/inviteico1.gif">请输入验证码');
                    var time = 60;
                    var interval = setInterval(function () {
                        if (time == 0) {
                            $('.v2regList_Btnimg').hide();
                            $('.asPhoneregBtn').show().html('重新获取验证码');
                            $('#input_phone').removeAttr('disabled');
                            clearInterval(interval);
                            showTips($('#input_phone'), '');
                        }
                        else {
                            showTips($('#input_phone'), '尊敬的用户，请耐心等待，如果在<font color="red">' + time + '</font>秒内没有收到验证码，请重新验证');
                            $('.asPhoneregBtn').hide();
                            $('#input_phone').attr('disabled', 'disabled');
                            $('.v2regList_Btnimg').show().html('<img align="absmiddle" src="https://ssl.vanclimg.com/login/loading.gif">正在发送');
                            time--;
                        }
                    }, 1000);
                }
            }
        });
        return false;
    });
    var submitRegister = function () {
        if (isSubmit) return false;
        $('#input_validatecode').parent().find('[name="ValidateIng"]').remove();
        $("#submitRegister").removeClass().addClass("log2").html(Resource.ValidateSubmit);
        $('.v2regListInfo_rtCont').find('>span:eq(1)').removeClass('v2reg_tips02').addClass('v2reg_tips01').html('');
        isSubmit = true;
        if (regType == regEnum.Email) {
        	if (!checkUN()) isSubmit = false;
            if (isSubmit && !checkUserName($('#input_username'))) isSubmit = false;
            if (!checkEmail()) isSubmit = false;
            if (isSubmit && !checkUserName($('#input_email'))) isSubmit = false;
            if (isSubmit && !checkPassword()) isSubmit = false;
            if (isSubmit && !checkRePassword()) isSubmit = false;
            if (isSubmit && !checkValidateCode(submitRegisterData)) isSubmit = false;
        }
        else {
            if (!checkPhone()) isSubmit = false;
            if (isSubmit && !checkUserName($('#input_phone'))) isSubmit = false;
            if (isSubmit && !checkPhoneCode()) isSubmit = false;
            if (isSubmit && !checkPassword()) isSubmit = false;
            if (isSubmit && !checkRePassword(submitRegisterData)) isSubmit = false;
        }
        $('#submitRegister').unbind('click').removeClass().addClass("submitStyle").html("同意以上条款并注册").one('click', submitRegister);
        return false;
    };
    var submitRegisterData = function () {
        var username = '';
        var useremail = '';
        var valicode = '';
        if (regType == regEnum.Email) {
            username = encodeURIComponent($("#input_username").val().trim());
            useremail = encodeURIComponent($("#input_email").val().trim());
            valicode = encodeURIComponent($("#input_validatecode").val().trim());
        }
        else {
            username = encodeURIComponent($("#input_phone").val().trim());
            valicode = encodeURIComponent($("#input_phonecode").val().trim());
        }
        var Url = document.location.protocol + "//" + domain + "simple/reg_act";
        var PostData = "rtype=" + regType + "&username=" + username +"&email=" + useremail +
        "&password=" + encodeURIComponent($("#input_password").val().trim()) + "&repassword=" + encodeURIComponent($("#input_repassword").val().trim()) +
        "&captcha=" + valicode;
        $.ajax({
            url: Url,
            type: "POST",
            cache: false,
            async: true,
            data: PostData,
            dataType: "text",
            beforeSend: function () {
                $("#submitRegister").removeClass().addClass("log2").html(Resource.ValidateSubmit);
            },
            success: function (data) {
                if (data != null && data != "" && data != "undefined") {
                    //data = "{" + data + "}";
                    data = eval("(" + data + ")");
                    if (data.errortype.trim() == "true") {
                        try {
                            VA_GLOBAL.va.track(null, "va_reg", "username=" + $("#Email").val()); //用户注册完成后执行
                        }
                        catch (ex) {
                        }
                        window.location.href = 'ht' + 'tp://' + domain + "simple/success_info"; //注册成功 跳转到请求页面
                    }
                    else if (data.errortype.trim() == "validate") {
                        isSubmit = false;
                        $('#img_validatecode').attr('src', webroot+'simple/getCaptcha?random=' + new Date().getTime());
                        $('#input_validatecode').val('');
                        $('#submitRegister').removeClass().addClass("submitStyle").html("同意以上条款并注册").unbind('click').one('click', submitRegister);
                        showError($('#input_validatecode'), data.message);
                    }
                    else {
                        isSubmit = false;
                        $('#img_validatecode').attr('src', webroot+'simple/getCaptcha?random=' + new Date().getTime());
                        $('#input_validatecode').val('');
                        showTips($('#input_validatecode'), '');
                        $('#submitRegister').removeClass().addClass("submitStyle").html("同意以上条款并注册").unbind('click').one('click', submitRegister);
                        $.fn.alert(data.message);
                    }
                    return false;
                }
            },
            error: function (e) {
                $('#submitRegister').unbind('click').removeClass().addClass("submitStyle").html("同意以上条款并注册").one('click', submitRegister);

            },
            complete: function () {
            }

        });
        return true;
    };
    $('#submitRegister').unbind('click').removeClass().addClass("submitStyle").html("同意以上条款并注册").one('click', submitRegister);
});

function TabChange(type) {
	//隐藏点
    //$('li[id],.v2regListInfo_rtCont>span,.v2reg_Safetyinfo').hide();
    $('[type="password"]').val('');
    $('.v2regBtn_02').remove();
    $('#v2regListInfo_bar li').addClass('v2reg_bg1').removeClass('v2reg_bg');
    if (type != "" && type.length > 0) {
        if (type == regEnum.Email) {
            regType = "email";
            $('#liusername,#liemail,#livalidatecode').show();
            $('#liphone,#liphonecode').hide();
            $("#hdn_RegisterType").val("email");
            $("#tags .tb-email").addClass("tb-email-select");
            $("#tags .tb-phone").removeClass("tb-phone-select");
        }
        else if (type == regEnum.Phone) {
            regType = "phone";
            $("#hdn_RegisterType").val("phone");
            $('#liusername,#liemail,#livalidatecode').hide();
            $('#liphone,#liphonecode').show();
            $("#tags .tb-email").removeClass("tb-email-select");
            $("#tags .tb-phone").addClass("tb-phone-select");
        }
    }
}
