
function PhoneGetPwdUserName() {
	var a = true;
	var c = $("#txtM1Email").val();
	if (c == "") {
		$("#userNameErrMsg").html(GetSpanStr("\u8bf7\u8f93\u5165\u6ce8\u518c\u65f6\u4f7f\u7528\u7684\u7528\u6237\u540d\u3002"));
		a = false;
		return false;
	}
	jQuery.ajax({url:"/Login/Check.ashx?email=" + c, cache:false, async:false, success:function (b, d) {
		if (b == "") {
			jQuery("#userNameErrMsg").html(GetSpanStr("\u7528\u6237\u540d\u4e0d\u5b58\u5728\u3002"));
			a = false;
			return false;
		} else {
			jQuery("#hiddenUserIDAndEmail").val(b);
			a = true;
			return true;
		}
	}, error:function () {
		a = false;
	}});
	return a;
}
function PhoneGetPwdPhone(d) {
	var a = true;
	var c = $("#txtM1Email").val();
	var e = $("#txtM1Phone").val();
	if (e == "") {
		jQuery("#userNameErrMsg").html(GetSpanStr("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801\u3002"));
		a = false;
		return false;
	}
	var f = vancl.addQueryString("/Login/Check.ashx", "email", c);
	f = vancl.addQueryString(f, "phone", e);
	f = vancl.addQueryString(f, "username", c);
	jQuery.ajax({url:f, cache:false, async:false, dataType:"json", success:function (b, h) {
		if (!b.Succes) {
			jQuery("#userNameErrMsg").html(GetSpanStr("\u7528\u6237\u540d\u548c\u624b\u673a\u53f7\u7801\u4e0d\u5339\u914d\u3002"));
			a = false;
			return false;
		} else {
			if (b.CheckVerfCount == 5) {
				showTips($("#errortips1"));
				a = false;
				return false;
			} else {
				jQuery("#hiddenUserID").val(b);
				if (d) {
					var g = $("#form1");
					jQuery("#hiddenUserIDAndEmail").val(b.UserID);
					jQuery("#hidEmail").val(b.EmailMD5);
					jQuery("#hidPhone").val(b.PhotoMD5);
					jQuery("#hidUserName").val(b.UseNameMD5);
					g.attr("action", "/Login/GetPwdStep2_phone.aspx");
					g.submit();
				}
				a = true;
				return true;
			}
		}
	}, error:function () {
		a = false;
	}});
	return a;
}
function PhoneGetPwd() {
	var a = $("#txtM1Email").val();
	var b = $("#txtM1Phone").val();
	if (!PhoneGetPwdUserName()) {
		return;
	}
	if (!PhoneGetPwdPhone(false)) {
		return;
	}
	PhoneGetPwdUserName(a);
	PhoneGetPwdPhone(a, b, true);
}
function EmailGetPwdsubmit() {
	if (!EmailGetPwd(true)) {
		return;
	}
}
function EmailGetPwd(c) {
	var a = $("#txtM2Email").val();
	var d = "";
	var b = "";
	if (a == "") {
		$("#emailErrMsg").html(GetSpanStr("\u8bf7\u8f93\u5165\u6ce8\u518c\u65f6\u4f7f\u7528\u7684Email\u5730\u5740\u3002"));
		return false;
	}
	var e = vancl.addQueryString("/Login/Check.ashx", "email", a);
	e = vancl.addQueryString(e, "phone", d);
	e = vancl.addQueryString(e, "username", b);
	jQuery.ajax({url:e, cache:false, dataType:"json", success:function (f) {
		if (!f.Succes) {
			jQuery("#emailErrMsg").html(GetSpanStr("Email\u5730\u5740\u4e0d\u5b58\u5728\u3002"));
			return false;
		} else {
			if (f.CheckVerfCount == 5) {
				showTips($("#errortips"));
				return false;
			} else {
				jQuery("#emailErrMsg").html("");
				jQuery("#hiddenUserIDAndEmail").val(f.UserID);
				jQuery("#hidEmail").val(f.EmailMD5);
				jQuery("#hidPhone").val(f.PhotoMD5);
				jQuery("#hidUserName").val(f.UseNameMD5);
				if (c) {
					var g = $("#form1");
					g.attr("action", "/Login/GetPwdStep2_email.aspx");
					g.submit();
				}
				return true;
			}
		}
	}, error:function () {
		return false;
	}});
	return true;
}
function GetSpanStr(a) {
	return "<span class=\"errMsg\" >" + a + "</span>";
}
function centerDiv(b) {
	if (!b || b.length == 0) {
		return;
	}
	var a = document.documentElement.scrollTop + document.body.scrollTop;
	var f = $(window).width();
	var e = $(window).height();
	var c = (f - b.width()) / 2;
	var d = a + (e - b.height()) / 2;
	b.css({left:c, top:d}).show();
	b.find("a,.queding0117").click(function () {
		b.hide();
		return false;
	});
}
function showTips(a) {
	centerDiv(a);
}
/*
* Vancl JavaScript Library v1.0
*
* Copyright 2011, http://www.vancl.com
*
* Referrer: jquery library 1.4
* Author: chenqiliang
* Date: 2011.10.17
*/
(function (c, a) {
	var b = {codec:function (e, d) {
		return d ? encodeURIComponent(e) : decodeURIComponent(e);
	}, addQueryString:function (e, d, f) {
		e += e.indexOf("?") === -1 ? "?" : "&";
		e += this.codec(d, true) + "=" + this.codec(f, true);
		return e;
	}, getQueryString:function (j) {
		var k = (location.href.length > 0 ? location.search.substring(1) : ""), g = k.split("&"), f = null, d = {};
		for (var e = 0, h = g.length; e < h; e++) {
			f = g[e].split("=");
			if (f instanceof Array) {
				d[this.codec(f[0], false)] = this.codec(f[1], false);
			}
		}
		return (this.isString(j) && j) ? d[j] : d;
	}, rndInRange:function (f, h, e) {
		if (typeof f === "number" && typeof h === "number") {
			var d = (e ? (h - f + 1) : (h - f)), g = Math.random() * d + f;
			return e ? Math.floor(g) : g;
		} else {
			jQuery.error("rndInRange\u65b9\u6cd5\u5f02\u5e38\uff1a\u4f20\u5165\u7684\u53c2\u6570\u5fc5\u987b\u4e3anumber\u7c7b\u578b\u3002");
		}
	}, operateClipboard:function (d, e) {
		if (arguments.length === 2) {
			if (d.clipboardData) {
				return d.clipboardData.setData("text/plain", e);
			} else {
				return c.clipboardData.setData("text", e);
			}
		} else {
			return (d.clipboardData || c.clipboardData).getData("text");
		}
	}, throttle:function (e, d, f) {
		clearTimeout(e.timeId);
		f = (typeof f !== "number" && f < 10) || 200;
		e.timeId = setTimeout(function () {
			e.call(d);
		}, f);
	}};
	b.dialog = {alert:function (d) {
		d.buttons = {"\u786e\u5b9a":function () {
			$.isFunction(d.fn) ? d.fn() : "";
			$(this).dialog("destroy").remove();
		}};
		this.custDialog(d);
	}, confirm:function (d) {
		d.buttons = {"\u786e\u5b9a":function () {
			$.isFunction(d.fn) ? d.fn() : "";
			$(this).dialog("destroy").remove();
		}, "\u53d6\u6d88":function () {
			$(this).dialog("destroy").remove();
		}};
		this.custDialog(d);
	}, custDialog:function (d) {
		d.title = d.title || "";
		d.closeText = "\u5173\u95ed";
		d.msg = d.msg || "";
		d.modal = d.modal || false;
		d.buttons = d.buttons || {};
		$("<div></div>").append(d.msg).dialog(d);
	}};
	jQuery.extend(Date.prototype, {isLeapYear:function () {
		return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
	}, format:function (d) {
		var g = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"];
		var f = {"M+":this.getMonth() + 1, "d+|D+":this.getDate(), "h+|H+":this.getHours(), "w|W":g[this.getDay()], "m+":this.getMinutes(), "s+":this.getSeconds()};
		if (/(y+|Y+)/.test(d)) {
			d = d.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length));
		}
		for (var e in f) {
			if (new RegExp("(" + e + ")").test(d)) {
				d = d.replace(RegExp.$1, RegExp.$1.length == 1 ? f[e] : ("00" + f[e]).substr(("" + f[e]).length));
			}
		}
		return d;
	}});
	jQuery.extend(String.prototype, {sub:function (f) {
		var g = /[^\x00-\xff]/g;
		if (this.replace(g, "mm").length <= f) {
			return this;
		}
		var e = Math.floor(f / 2);
		for (var d = e; d < this.length; d++) {
			if (this.substr(0, d).replace(g, "mm").length >= f) {
				return this.substr(0, d) + "...";
			}
		}
		return this;
	}});
	//c.vancl = c.vc = c.v = b;
})(window);
var Resource = {RightImage:"<img name='rightimage'  src='https://ssl.vanclimg.com/login/yes.gif' style='padding-top:5px' align='absmiddle'/>", ErrorImage:"<img name='rightimage'  src='https://ssl.vanclimg.com/login/no.gif' style='padding-top:5px' align='absmiddle'/>", ValidateIng:"\u6b63\u5728\u9a8c\u8bc1...", ValidateSubmit:"<img src='https://ssl.vanclimg.com/login/loading.gif' align='absmiddle' style='vertical-align:middle'/>\u6b63\u5728\u63d0\u4ea4", ValidateSend:"<img src='https://ssl.vanclimg.com/login/loading.gif' align='absmiddle' style='vertical-align:middle'/>\u6b63\u5728\u53d1\u9001", UserNameNotExists:"\u60a8\u597d\uff0c\u60a8\u8f93\u5165\u7684\u7528\u6237\u540d\u4e0d\u5b58\u5728\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", SystemError:"\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", TipValidate:"\u8bf7\u8f93\u5165\u7b54\u6848\u6216\u5b57\u7b26\uff0c\u5927\u5c0f\u5199\u4e0d\u9650"};
switch (step) {
  case 1:
	$(function () {
		var checkUserName = function (username, callback) {
			$("#div_username").parent().find("[name=\"rightimage\"]").remove();
			if (username.length == 0) {
				$("#div_username").parent().find(".box3").before(Resource.ErrorImage);
				$("#div_username").removeClass().addClass("v2reg_tips02").html("\u7528\u6237\u540d\u4e0d\u80fd\u4e3a\u7a7a");
				return false;
			}
			return true;
		};
		var checkValidateCode = function (code, callback) {
			$("#div_validatecode").parent().find("[name=\"rightimage\"]").remove();
			if (code.length != $("#input_validatecode").val().length) {
				$("#div_validatecode").parent().find(".huanimg").after($(Resource.ErrorImage).css("padding-top", "20px"));
				$("#div_validatecode").removeClass().addClass("v2reg_tips02").html("\u9a8c\u8bc1\u7801\u9519\u8bef");
				return false;
			} else {
				if (code.length == 0) {
					$("#div_validatecode").parent().find(".huanimg").after($(Resource.ErrorImage).css("padding-top", "20px"));
					$("#div_validatecode").removeClass().addClass("v2reg_tips02").html("\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a");
					return false;
				}
			}
			$.ajax({url:webroot+"simple/reg_CheckValidate?VCode=" + encodeURIComponent(code), cache:false, async:true, datatype:"json", success:function (data) {
				$("#div_validatecode").parent().find("[name=\"rightimage\"]").remove();
				data = eval("(" + data + ")");
				if (data != null && data != "" && data.Error != "") {
					/*if (data.Error == undefined) {
						data = eval("(" + data + ")");
					}*/
					//$("#img_validatecode").click();
					$("#div_validatecode").parent().find(".huanimg").after($(Resource.ErrorImage).css("padding-top", "20px"));
					$("#div_validatecode").removeClass().addClass("v2reg_tips02").html(data.Error);
					return false;
				} else {
					$("#div_validatecode").removeClass().html("");
					$("#div_validatecode").parent().find(".huanimg").after($(Resource.RightImage).css("padding-top", "20px"));
					if (callback) {
						callback();
					}
				}
			}, error:function () {
				$("#div_validatecode").parent().find(".huanimg").after($(Resource.ErrorImage).css("padding-top", "20px"));
				$("#div_validatecode").removeClass().addClass("v2reg_tips02").html(Resource.SystemError);
			}});
			return true;
		};
		var initButton = function () {
			$(".DetermineBtn").html("\u4e0b\u4e00\u6b65").unbind("click").one("click", function () {
				var username = $.trim($("#input_username").val());
				var code = $.trim($("#input_validatecode").val());
				var isSubmit = true;
				submitPwd(username, code);
				return false;
			});
		};
		var submitPwd = function (username, code) {
			$.ajax({url:webroot+"simple/do_find_password/?step=1&username=" + encodeURIComponent(username) + "&captcha=" + encodeURIComponent(code), cache:false, async:true, datatype:"json", beforeSend:function () {
				$(".DetermineBtn").html(Resource.ValidateSubmit);
			}, success:function (data) {
				var success = false;
				var errType = 0;
				if (data != null && data != "") {
					if (data.error == undefined) {
						data = eval("(" + data + ")");
					}
					if (data.errType != undefined) {
						errType = data.errType;
					}
					success = (data.error.length == 0);
				}
				//$.fn.alert(success);
				if (success) {
					window.location = webroot+"simple/find_password/?step=2";
				} else {
					if (data.errType == 0) {
						initButton();
						$("#img_validatecode").click();
						$("#div_username").parent().find("[name=\"rightimage\"]").remove();
						$("#div_username").parent().find(".huanimg").after(Resource.ErrorImage);
						$("#div_username").removeClass().addClass("v2reg_tips02").html(data.error);
					} else {
						if (data.errType == 1) {
							initButton();
							$("#img_validatecode").click();
							$("#div_validatecode").parent().find("[name=\"rightimage\"]").remove();
							$("#div_validatecode").parent().find(".huanimg").after(Resource.ErrorImage);
							$("#div_validatecode").removeClass().addClass("v2reg_tips02").html(data.error);
						} else {
							$.fn.alert(data.error, function () {
								initButton();
								$("#img_validatecode").click();
							});
						}
					}
				}
			}, error:function () {
				initButton();
			}});
		};
		$("#input_username").blur(function () {
			$("#div_username").parent().find("[name=\"rightimage\"]").remove();
			var username = $.trim($("#input_username").val());
			//if (username.length > 0) {
				checkUserName(username);
			//}
		}).keydown(function (e) {
			if (e.which == 13) {
				e.preventDefault();
				var username = $.trim($("#input_username").val());
				if (username.length > 0) {
					checkUserName(username, function () {
						$("#input_validatecode").focus();
					});
				}
			}
		});
		$("#img_validatecode,.huanimg").click(function () {
			$("#div_validatecode").parent().find("[name=\"rightimage\"]").remove();
			$("#img_validatecode").attr("src", webroot+'simple/getCaptcha?random=' + new Date().getTime());
			$("#div_validatecode").empty().removeClass();
		}).css("cursor", "pointer");
		$("#input_validatecode").blur(function () {
			$("#div_validatecode").parent().find("[name=\"rightimage\"]").remove();
			var code = $.trim($("#input_validatecode").val());
			if (code.length > 0) {
				checkValidateCode(code);
			} else {
				$("#div_validatecode").removeClass("v2reg_tips02").addClass("v2reg_tips01").empty();
			}
		}).keydown(function (e) {
			if (e.which == 13) {
				e.preventDefault();
				var code = $.trim($("#input_validatecode").val());
				if (code.length > 0) {
					checkValidateCode(code, function () {
						$(".DetermineBtn").click();
					});
				}
			}
		}).focus(function () {
			$("#div_validatecode").parent().find("[name=\"rightimage\"]").remove();
			$("#div_validatecode").removeClass("v2reg_tips02").addClass("v2reg_tips01").html(Resource.TipValidate).show();
		});
		initButton();
	});
	break;
  case 2:
	$(function () {
		var centerDiv = function (ele) {
			if (!ele || ele.length == 0) {
				return;
			}
			var bodyTop = document.documentElement.scrollTop + document.body.scrollTop;
			var winWidth = $("#body").width();
			var winHeight = $(window).height();
			var left = $("#top").offset().left + (winWidth - ele.width()) / 2;
			var top = bodyTop + (winHeight - ele.height()) / 2;
			ele.css({left:left, top:top}).show();
			ele.find("a,.queding0117").click(function () {
				ele.hide();
				return false;
			});
		};
		var sendEmail = function () {
			$.ajax({url:webroot+"simple/do_find_password/?step=2", cache:false, async:true, datatype:"json", beforeSend:function () {
				$(".href_getemail").html(Resource.ValidateSend);
			}, success:function (data) {
				var success = -1;
				if (data != null && data != "") {
					if (data.success == undefined) {
						data = eval("(" + data + ")");
					}
					success = data.success;
				}
				switch (success) {
				  case -1:
					$.fn.alert("\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5", function () {
						window.location = webroot+"simple/find_password/?step=1";
					});
					break;
				  case 0:
					$.fn.alert("\u90ae\u4ef6\u53d1\u9001\u6210\u529f!");
					break;
				  case 1:
					centerDiv($("#errortips"));
					break;
				  case 2:
					$.fn.alert("\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5!");
					break;
				}
				$("#href_getemail").html("\u83b7\u53d6\u627e\u56de\u5bc6\u7801\u90ae\u4ef6").unbind("click").one("click", sendEmail);
			}, error:function () {
				$("#href_getemail").html("\u83b7\u53d6\u627e\u56de\u5bc6\u7801\u90ae\u4ef6").unbind("click").one("click", sendEmail);
			}});
			return false;
		};
		var isSendPhoneCode = false;
		var interval;
		var sendPhoneCode = function () {
			$.ajax({url:"GetPwdHandle.ashx?action=getmobliecode", cache:false, async:true, datatype:"json", beforeSend:function () {
				$("#tips_phone2_span").hide();
				$("#href_getphone").html(Resource.ValidateSend);
			}, success:function (data) {
				var success = -1;
				if (data != null && data != "") {
					if (data.success == undefined) {
						data = eval("(" + data + ")");
					}
					success = data.success;
				}
				switch (success) {
				  case -1:
					$.fn.alert("\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5", function () {
						window.location = "GetPwdStep1.aspx";
					});
					break;
				  case 0:
					centerDiv($("#errortips1"));
					$("#href_getphone").html("\u83b7\u53d6\u77ed\u4fe1\u9a8c\u8bc1\u7801").unbind("click").one("click", sendPhoneCode);
					break;
				  case 1:
					var time = 60;
					interval = setInterval(function () {
						if (time == 0) {
							$("#href_getphone").html("\u83b7\u53d6\u77ed\u4fe1\u9a8c\u8bc1\u7801").unbind("click").one("click", sendPhoneCode);
							clearInterval(interval);
							$("#tips_phone2_span").hide();
						} else {
							$("#href_getphone").html(Resource.ValidateSend);
							$("#tips_phone2_span span").removeClass().addClass("v2reg_tips01").html("\u9a8c\u8bc1\u7801\u5df2\u53d1\u51fa\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536\u77ed\u4fe1\uff0c\u5982\u5728<font color=\"red\">" + time + "</font>\u79d2\u5185\u6ca1\u6536\u5230\uff0c\u8bf7\u91cd\u65b0\u83b7\u53d6\u9a8c\u8bc1\u7801").show();
							$("#tips_phone2_span").show();
							time--;
						}
					}, 1000);
					break;
				  case 2:
					$("#tips_phone2_span .v2reg_tips02").html("\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5!").show();
					$("#tips_phone2_span").show();
					$("#href_getphone").html("\u83b7\u53d6\u77ed\u4fe1\u9a8c\u8bc1\u7801").unbind("click").one("click", sendPhoneCode);
					break;
				}
			}});
			return false;
		};
		var gotoStep3 = function () {
			var code = $.trim($("#input_phonecode").val());
			if (code.length == 0) {
				$("#input_phonecode").focus();
				return false;
			}
			$.ajax({url:"GetPwdHandle.ashx?action=2&validatecode=" + encodeURIComponent(code), cache:false, async:true, datatype:"json", beforeSend:function () {
				$("#href_next").html(Resource.ValidateSubmit);
				$("#tips_phone2_span2").hide();
			}, success:function (data) {
				var success = -1;
				if (data != null && data != "") {
					if (data.success == undefined) {
						data = eval("(" + data + ")");
					}
					success = data.success;
				}
				switch (success) {
				  case -1:
					$.fn.alert("\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5", function () {
						window.location = "GetPwdStep1.aspx";
					});
					break;
				  case 0:
					window.location = "GetPwdStep3.aspx";
					break;
				  case -2:
					$("#tips_phone2_span2 span").html(data.message);
					$("#tips_phone2_span2,#tips_phone2_span2 span").show();
					break;
				}
				$("#href_next").html("\u4e0b\u4e00\u6b65").unbind("click").one("click", gotoStep3);
			}, error:function () {
				$("#href_next").html("\u4e0b\u4e00\u6b65").unbind("click").one("click", gotoStep3);
			}});
			return false;
		};
		$("#tips_phone2_span,#tips_phone2_span .v2reg_tips02,#tips_phone2_span2,#tips_phone2_span2 .v2reg_tips02").hide();
		if (showemail.length == 0 && moblie.length == 0) {
			$.fn.alert("\u60a8\u672a\u8fdb\u884c\u624b\u673a\u6216\u90ae\u7bb1\u9a8c\u8bc1\uff0c\u8bf7\u8054\u7cfb\u5ba2\u670d\uff08400-650-7099\uff09\u627e\u56de\u5bc6\u7801", function () {
				window.location = "GetPwdStep1.aspx";
			});
		} else {
			if ($("#span_email").html().length == 0) {
				$("#select option:eq(0)").remove();
				$("#tips_email1,#tips_email2").hide();
				$("#tips_phone1,#tips_phone2,#href_next,#tips_phone2_span,#tips_phone2_span2").show();
			} else {
				if (email.length > 0) {
					$("#herf_gotoemail").attr("href", "http://mail." + email).show();
				} else {
					$("#herf_gotoemail").hide();
				}
			}
			if (moblie.length == 0) {
				$("#select option:eq(1)").remove();
				$("#tips_email1,#tips_email2").show();
				$("#tips_phone1,#tips_phone2,#href_next,#tips_phone2_span,#tips_phone2_span2").hide();
				$("#tips_phone2_span2 .v2reg_tips02").hide();
			}
			$("#select").change(function () {
				var value = $(this).val();
				$("#tips_email1,#tips_phone1,#tips_email2,#tips_phone2,#href_next,#tips_phone2_span,#tips_phone2_span2").hide();
				if (value == 0) {
					$("#tips_email1,#tips_email2").show();
				} else {
					$("#tips_phone1,#tips_phone2,#href_next,#tips_phone2_span,#tips_phone2_span2").show();
				}
			});
			if ($("#select option").length > regType) {
				$("#select").get(0).selectedIndex = regType;
			}
			$("#tips_email1,#tips_phone1,#tips_email2,#tips_phone2,#href_next,#tips_phone2_span,#tips_phone2_span2").hide();
			switch ($("#select").val()) {
			  case "0":
				$("#tips_email1,#tips_email2").show();
				break;
			  case "1":
				$("#tips_phone1,#tips_phone2,#href_next,#tips_phone2_span,#tips_phone2_span2").show();
				break;
			}
			$("#href_getemail").one("click", function () {
				sendEmail();
			});
			$("#href_getphone").one("click", function () {
				sendPhoneCode();
			});
			$("#href_next").one("click", function () {
				gotoStep3();
			});
		}
	});
	break;
  case 3:
	$(function () {
		$("#input_password1").parent().find("[name=\"rightimage\"]").remove();
		$("#input_password").parent().find("[name=\"rightimage\"]").remove();
		$("#CheckRePassWord,#ReCheckRePassWord").removeClass().addClass("").html("");
		$(".v2reg_Safetyinfo").hide();
		if (message.length > 0) {
			$.fn.alert(message, function () {
				window.location = webroot+"simple/find_password/?step=1";
			});
		} else {
			$("#input_password").blur(function () {
				checkPassword(checkRePassword);
			});
			$("#input_password1").blur(function () {
				checkRePassword();
			});
			$(".DetermineBtn").html("\u4e0b\u4e00\u6b65").unbind("click").one("click", function () {
				gotoStep4();
			});
		}
		var checkPassword = function (callback) {
			$("#input_password").parent().find("[name=\"rightimage\"]").remove();
			var password = $.trim($("#input_password").val());
			if (password != $("#input_password").val()) {
				$("#input_password").after(Resource.ErrorImage);
				$("#CheckRePassWord").removeClass().addClass("v2reg_tips02").html("\u5bc6\u7801\u4e2d\u4e0d\u80fd\u6709\u7a7a\u683c");
				return false;
			} else {
				if (password.length == 0) {
					$("#input_password").after(Resource.ErrorImage);
					$("#CheckRePassWord").removeClass().addClass("v2reg_tips02").html("\u8bf7\u8f93\u5165\u5bc6\u7801");
					return false;
				} else {
					if (password.length < 6 || password.length > 16) {
						$("#input_password").after(Resource.ErrorImage);
						$("#CheckRePassWord").removeClass().addClass("v2reg_tips02").html("\u5bc6\u7801\u957f\u5ea6\u5fc5\u987b\u4e3a6-16\u4f4d");
						return false;
					}
				}
			}
			var chinese = password.match(/[^\x00-\xff]/ig) || [];
			if (chinese.length > 0) {
				$("#input_password").after(Resource.ErrorImage);
				$("#CheckRePassWord").removeClass().addClass("v2reg_tips02").html("\u5fc5\u987b\u4e3a\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u7b26\u53f7\u7684\u7ec4\u5408");
				return false;
			} else {
				$("#input_password").after(Resource.RightImage);
				$("#CheckRePassWord").removeClass().addClass("").html("");
				var number = password.match(/\d/ig) || [];
				var c = password.match(/[a-zA-Z]/ig) || [];
				var length = number.length + c.length;
				if (length == 0 || number.length == password.length || c.length == password.length) {
					$(".v2reg_Safetyinfo div").removeClass().addClass("v2regimg_01");
					$(".v2reg_Class").html("\u5f31");
				} else {
					if (number.length == 0 || c.length == 0 || length == password.length) {
						$(".v2reg_Safetyinfo div").removeClass().addClass("v2regimg_02");
						$(".v2reg_Class").html("\u4e2d");
					} else {
						$(".v2reg_Safetyinfo div").removeClass().addClass("v2regimg_03");
						$(".v2reg_Class").html("\u5f3a");
					}
				}
				$(".v2reg_Safetyinfo").show();
				if (callback) {
					callback();
				}
			}
			return true;
		};
		var checkRePassword = function (isSubmit) {
			$("#input_password1").parent().find("[name=\"rightimage\"]").remove();
			var password = $.trim($("#input_password").val());
			var password1 = $.trim($("#input_password1").val());
			if (isSubmit && password1 == "") {
				$("#input_password1").after(Resource.ErrorImage);
				$("#ReCheckRePassWord").removeClass().addClass("v2reg_tips02").html("\u4e24\u6b21\u8f93\u5165\u5bc6\u7801\u4e0d\u4e00\u81f4");
				return false;
			} else {
				if (password1 != "" && $("#input_password").val() != $("#input_password1").val()) {
					$("#input_password1").after(Resource.ErrorImage);
					$("#ReCheckRePassWord").removeClass().addClass("v2reg_tips02").html("\u4e24\u6b21\u8f93\u5165\u5bc6\u7801\u4e0d\u4e00\u81f4");
					return false;
				} else {
					if (password1.length > 5 && password1.length < 17 && password1 == password) {
						$("#ReCheckRePassWord").removeClass().addClass("").html("");
						$("#input_password1").after(Resource.RightImage);
					}
				}
			}
			return true;
		};
		var gotoStep4 = function () {
			var isSubmit = true;
			isSubmit = checkPassword();
			if (isSubmit) {
				isSubmit = checkRePassword(true);
			}
			if (isSubmit) {
				$.ajax({url:formaAction, cache:false, async:true, type:"POST", data:"password=" + $.trim(encodeURIComponent($("#input_password").val())) + "&repassword=" + $.trim(encodeURIComponent($("#input_password1").val())), datatype:"json", beforeSend:function () {
					$(".DetermineBtn").html(Resource.ValidateSubmit);
				}, success:function (data) {
					var success = -1;
					if (data != null && data != "") {
						if (data.success == undefined) {
							data = eval("(" + data + ")");
						}
						success = data.success;
					}
					switch (success) {
					  case -1:
						$.fn.alert("\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5", function () {
							window.location = webroot+"simple/find_password/?step=1";
						});
						break;
					  case 0:
						window.location = webroot+"simple/restore_password/?step=4";
						break;
					  case -2:
						$.fn.alert(data.message);
						break;
					  case -3:
						$.fn.alert("\u53c2\u6570\u4e0d\u5b8c\u6574");
						break;
					}
					$(".DetermineBtn").html("\u4e0b\u4e00\u6b65").unbind("click").one("click", function () {
						gotoStep4();
					});
				}, error:function () {
					$(".DetermineBtn").html("\u4e0b\u4e00\u6b65").unbind("click").one("click", function () {
						gotoStep4();
					});
				}});
			} else {
				$(".DetermineBtn").html("\u4e0b\u4e00\u6b65").unbind("click").one("click", function () {
					gotoStep4();
				});
			}
			return false;
		};
	});
	break;
  case 4:
	$(function () {
		var a = 5;
		setInterval(function () {
			if (a > 0) {
				$("#times").html(a);
				a--;
			} else {
				window.location = webroot+"simple/login";
			}
		}, 1000);
	});
	break;
}
function setWelcome() {
	var a = getCookie("UserLogin");
	if (a != "") {
		jQuery.getScript("https://login.vancl.com/login/getUserName.ashx", function () {
			getUserName = data.sub(10);
			jQuery("#welcome").html("\u60a8\u597d, <a href='http://my.vancl.com' class='top track' name='head-denglu' style='color: rgb(51, 51, 51);'>" + getUserName + "</a> <span style='color: #a10000'><a class='top track' style='color: #a10000' href='https://login.vancl.com/Login/UserLoginOut.aspx' target='_parent' name='head-tcdl' >\u9000\u51fa\u767b\u5f55</a>&nbsp;|&nbsp;<a class='track' name='head-ghyh' href=\"javascript:location.href='https://login.vancl.com/login/login.aspx?'+location.href\" style='color: #a10000'>\u66f4\u6362\u7528\u6237</a></span>");
		});
	}
}

