
$(function () {
	$.fn.alert = function (d, a, e) {
		var f = $.extend(false, {}, $.fn.alert.defaults, e);
		$(".orderChangeTsk80EE8D67985E,#maskdiv80EE8D67985E").remove();
		var c = "<div id=\"maskdiv80EE8D67985E\"></div>";
		$(c).appendTo($("body"));
		var b = [];
		b.push("<div class=\"orderChangeTsk80EE8D67985E\">");
		b.push("<h3><span>" + f.title + "</span><a href=\"#\" class=\"close80EE8D67985E\">\u5173\u95ed</a>");
		b.push("<a class=\"close80EE8D67985E\" href=\"#\"><img src=\"//i.vanclimg.com/Others/2011/2/15/dpbox_06.gif\"></a></h3>");
		b.push("<p class=\"Word80EE8D67985E\" style=\"text-align:center;\">" + d + "</p>");
		b.push("<div id=\"buttons80EE8D67985E\"><input type=\"submit\" value=\"\" class=\"queding80EE8D67985E\"><span><a id=\"quxiao80EE8D67985E\" href=\"#\">\u53d6\u6d88</a></span></div></div>");
		$(b.join("")).appendTo($("body"));
		if (f.type == 1) {
			$("#quxiao80EE8D67985E").hide();
			$("#buttons80EE8D67985E").attr("style", "margin-left:120px");
		} else {
			$("#quxiao80EE8D67985E").show();
			$("#buttons80EE8D67985E").attr("style", "margin-left:100px");
		}
		$(".orderChangeTsk80EE8D67985E").center();
		$(".orderChangeTsk80EE8D67985E, #maskdiv80EE8D67985E").show();
		$(".orderChangeTsk80EE8D67985E .close80EE8D67985E, #quxiao80EE8D67985E").click(function () {
			if (a) {
				a(false);
			}
			$(".orderChangeTsk80EE8D67985E, #maskdiv80EE8D67985E").hide();
			return false;
		});
		$(".queding80EE8D67985E").click(function () {
			if (a) {
				a(true);
			}
			$(".orderChangeTsk80EE8D67985E, #maskdiv80EE8D67985E").hide();
			return false;
		});
	};
	$.fn.alert.defaults = {title:"\u63d0\u793a", type:1};
	$.fn.center = function () {
		var b = (($(window).height() - this.height()) / 2 - 80).toString() + "px";
		var a = (($(window).width() - this.width()) / 2).toString() + "px";
		if ($.browser.msie && $.browser.version == "6.0") {
			b = ((($(window).height() - this.height()) / 2 - 80) + $(window).scrollTop()).toString();
		}
		return this.css({top:b, left:a}).show();
	};
});
var isIE6 = false;
(function (a) {
	a.fn.popwindow = function (c) {
		var c = a.extend({}, c);
		if (this.context) {
			a(this).click(function () {
				d(this);
				return false;
			});
		} else {
			d(null);
		}
		function d(g) {
			html = [];
			html.push();
			html.push("<div id=\"Overlay\">");
			if (c.title) {
				var h = c.title;
				if (typeof (c.title) == "function") {
					h = c.title(g);
				}
				html.push("<div class=\"KmainBox\">");
				html.push("<h2 class=\"msgboxhead\">");
				html.push("    <span>" + h + "</span> ");
				html.push("    <a style=\"color: #fff;\" href=\"#\" class=\"close track\" name=\"item-close\">\u5173\u95ed</a><a href=\"#\" class=\"close track\" name=\"item-close\"><img src=\"//i.vanclimg.com/Others/2011/2/15/dpbox_06.gif\" /></a></h2>");
			}
			html.push("    <iframe id=\"LoadedContent\" frameborder=\"0\"></iframe>");
			if (c.title) {
				html.push("</div>");
			}
			html.push("</div>");
			a("body").prepend(html.join(""));
			if (!c.noOverlayClose) {
				a("#Overlay").click(function () {
					a(this).remove();
				});
			}
			if (a.fn.decorateIframe) {
				a("#Overlay").decorateIframe();
			}
			var f = a("#LoadedContent");
			var j = "";
			if (c.href) {
				j = c.href;
			} else {
				j = a(g).attr("href");
			}
			f.attr("src", j);
			a("#Overlay").children().eq(0).css(c);
			b();
			a("#Overlay .close").click(function () {
				a("#Overlay").fadeOut().remove();
				return false;
			});
		}
	};
	a.fn.popwindow.close = function () {
		a("#Overlay").fadeOut().remove();
	};
	a.fn.popwindow.resize = function (c) {
		a("#LoadedContent").css(c);
	};
	function b() {
		var c = a("#LoadedContent");
		if (isIE6) {
			ie6.windowresize();
		} else {
			a("#Overlay").css({position:"fixed"});
		}
		var d = {marginLeft:(a(window).width() - c.width()) / 2, marginTop:(a(window).height() - c.height()) / 2};
		a("#Overlay").children().eq(0).css(d);
	}
	a(window).resize(b);
})(jQuery);
String.prototype.cut = function (b) {
	var d = 0;
	var c = [];
	for (var a = 0; a < this.length; a++) {
		if (this.charCodeAt(a) > 128) {
			d += 2;
		} else {
			d++;
		}
		c.push(this.charAt(a));
		if (d >= b) {
			c.push("...");
			break;
		}
	}
	return c.join("");
};
String.prototype.gblen = function () {
	var b = 0;
	for (var a = 0; a < this.length; a++) {
		if (this.charCodeAt(a) > 128) {
			b += 2;
		} else {
			b++;
		}
	}
	return b;
};
var stockTimeout = null;
function stockIn() {
	if (stockTimeout != null) {
		window.clearTimeout(stockTimeout);
	}
	$(".addressWindows").show();
	$(".cityAdd").addClass("cityAddHover");
}
function stockOut() {
	stockTimeout = window.setTimeout(function () {
		$(".addressWindows").hide();
		$(".cityAdd").removeClass("cityAddHover");
	}, 50);
}
function checkStocking() {
	var b = getCloseCode();
	if (b != null) {
		var a = $(".addressWindows a:contains('" + $.trim($("#shippingAddr").text()) + "')");
		if (a.length == 0) {
			return;
		}
		var c = a.attr("name").replace("hs-", "");
		var d = [];
		d.push("/styles/stocking.aspx");
		d.push("?clothescode=" + b);
		d.push("&housecode=" + c);
		$.get(d.join(""), function (e) {
			if (e == "True") {
				$("#stockinfo").text("\u4ece\u6700\u8fd1\u5e93\u623f\u53d1\u8d27");
				$("#citystatus").text("(\u6709\u8d27)");
			} else {
				$("#stockinfo").text("\u4ece\u5176\u4ed6\u5e93\u623f\u53d1\u8d27");
				$("#citystatus").text("(\u5e93\u5b58\u7d27\u5f20)");
			}
		});
	}
	stockOut();
}
function getCloseCode() {
	if ($(".selSize #onlickSelSize").length == 0) {
		return null;
	}
	return $(".selSize #onlickSelSize").attr("name");
}
function ajaxIsLogined(a, c) {
	var d = "styles/IsLogined.aspx";
	var b = [];
	if (c != null && c.length > 0) {
		b.push("productcode=" + c);
	}
	if (b.length > 0) {
		d = d + "?" + b.join("&");
	}
	$.getScript(d, a);
}
function global() {
	window.VANCL = window.VANCL || {};
	window.VANCL.Global = window.VANCL.Global || {};
	return window.VANCL.Global;
}
var sizetitle = "";
$(function () {
	isIE6 = (typeof ie6 != "undefined");
	if ($.fn.decorateIframe) {
		$("#bigView,#collectbox,#shopbox,#carbox").decorateIframe();
	}
	var productcode = $("#productcode").text().split("\uff1a")[1];
	$("#addToShoppingCar").live("click", function () {
		$("#carboxloading").html("<img src=\"//i.vanclimg.com/logo/loading.gif\" alt=\"loading\">");
		$(".shoppingErrTips , .shoppingErrTips2").remove();
		if ($("#carbox").css("display") != "none") {
			$("#collectbox").fadeOut();
		} else {
			$("#collectbox,#carbox").fadeOut();
		}
		var closeCode = getCloseCode();
		if (closeCode == null) {
			$(".danpin_xuanzeGMcm").show();
			return false;
		}
		var url = [];
		url.push("http://shopping.vancl.com");
		url.push("/mycart/batchadd");
		url.push("?sku=");
		url.push(closeCode);
		url.push("&price=");
		url.push($("#pricearea >.cuxiaoPrice>span>strong:eq(0)").text());
		url.push("&qty=");
		url.push($("#selectedAmount").val());
		var refLink = (function (o) {
			var href = o.attr("href");
			var index = href.indexOf("#");
			if (index > -1 && index + 1 < href.length) {
				var href = href.substring(index + 1, href.length);
				return "&" + href;
			} else {
				var g = global();
				if (g.ref != undefined && g.ref.length > 0) {
					return "&ref=" + g.ref;
				}
			}
		})($(this));
		if (refLink) {
			url.push(refLink);
		}
		url.push("&async=true");
		url.push("&callback=?");
		$("#carbox").css({top:$("#addToShoppingCar").offset().top - 49}).show();
		if (isIE6) {
			$("#carbox").css({left:ie6.setLeft(512)});
		}
		$("#carbox").find(".close,.jxgwbtn").click(function () {
			$("#carbox").hide();
			$("#carboxloading").show().next().hide();
			return false;
		});
		var shoppingurl = url.join("");
		if ($(".cuxiaoPrice").find("strong").length == 1 && shoppingurl.indexOf("&isPoint=true") > 0) {
			shoppingurl = shoppingurl.replace("&isPoint=true", "");
		}
		$.getJSON(shoppingurl, function (data) {
			if (!data.Type || data.Type == "") {
				$("#shopcarprice").text("\uffe5" + (new Number(data.TotalPrice)).toFixed(2));
				$("#shopcarcount").text(data.TotalProducts);
				$.getJSON("/api/buynow.aspx?callback=?", function (json) {
					var html = [];
					if (json.msg == "Y") {
						html.push("<div class=\"CarBox_nowCheckout\"><a href=\"http://buy.vancl.com?from=item\">\u7acb\u5373\u7ed3\u7b97</a></div>");
						if ($("#continueshop").hasClass("CarBox_continueShopping") == false) {
							$("#continueshop").removeClass("CarBox_nowCheckout CarBox_nowContinueBuy").addClass("CarBox_continueShopping");
							$("#continueshop").before(html.join("")).show();
						}
						var today = new Date();
						var buynowdatetime = (today.getFullYear()) + "-" + (today.getMonth() + 1) + "-" + today.getDate();
						$.getScript("http://counter.vanclimg.com/counter?key=item-" + buynowdatetime);
					}
				});
				var clothes = "";
				if (typeof (data.clothes) != "undefined") {
					clothes = data.clothes;
				}
				var paramJson = "[{Position:\"rp_item_cart\", ProductCodes:\"" + productcode + "\",Rows:\"" + 5 + "\",Remark:\"NeedExclude\",ClothesCodes:\"" + clothes + "\"}]";
				var $gmlist = $("#carbox").find(".CarBox_ProductList");
				var $weblog = $("<img style='display:none;' src='//item.vancl.com/api/user.aspx?closeCode=" + closeCode + "' />");
				$("body").append($weblog);
				recmApi(paramJson, $gmlist, "dp_add2cart_similarpurchase", "item-shopping-pap", "cart");
				$("#carboxloading").fadeOut(function () {
					$(this).next().show();
				});
				VA_GLOBAL.va.track(null, "va_atc", shoppingurl.substr(shoppingurl.indexOf("?") + 1));
				if (typeof (VANCL.MiniCart.trackSBU) != undefined) {
					VANCL.MiniCart.trackSBU();
				}
			} else {
				$("#carbox").hide();
				var $tip = $("<p class=\"shoppingErrTips\"><span></span>" + data.Content + "</p>");
				if (data.Content.indexOf("\u8bf7\u5148\u767b\u5f55") > 0) {
					$tip = $("<p class=\"shoppingErrTips\"><span></span>\u672c\u5546\u54c1\u9650\u8d2d\uff0c<a href=\"javascript:location.href='https://login.vancl.com/login/login.aspx?'+location.href\"> \u8bf7\u5148\u767b\u5f55</a> \u786e\u8ba4\u60a8\u7684\u4f1a\u5458\u7b49\u7ea7\u80fd\u5426\u8d2d\u4e70</p>");
				}
				$(".shoppingCarArea").after($tip);
				if ($(".SelectAreaItotal").length > 0) {
					var $tip = $("<p class=\"shoppingErrTips2\"><span></span>" + data.Content + "</p>");
					if (data.Content.indexOf("\u8bf7\u5148\u767b\u5f55") > 0) {
						$tip = $("<p class=\"shoppingErrTips2\"><span></span>\u672c\u5546\u54c1\u9650\u8d2d\uff0c<a href=\"javascript:location.href='https://login.vancl.com/login/login.aspx?'+location.href\"> \u8bf7\u5148\u767b\u5f55</a> \u786e\u8ba4\u60a8\u7684\u4f1a\u5458\u7b49\u7ea7\u80fd\u5426\u8d2d\u4e70</p>");
					}
					$(".SelectAreaItotal").after($tip);
				}
			}
		});
		return false;
	});
	$("img[original]").lazyload();
	var producttype = $("#pricearea").attr("name");
	var styleid = $("#styleinfo").attr("name");
	$("#imageMenu li span").live("mouseover", function () {
		if ($(this).attr("id") != "onlickImg") {
			midChange($(this).attr("name").replace("small", "mid"));
			$("#imageMenu li").removeAttr("id");
			$(this).parent().attr("id", "onlickImg");
		}
	});
	function midChange(src) {
		$("#midimg").attr("src", src).load(function () {
			changeViewImg();
		});
	}
	$("#imageMenu").scrollTop(0);
	(function () {
		function mouseEnter(e) {
			if ($("#winSelector").css("display") == "none") {
				$("#winSelector,#bigView").show();
			}
			$("#winSelector").css(fixedPosition(e));
			e.stopPropagation();
			return false;
		}
		function mouseOut(e) {
			if ($("#winSelector").css("display") != "none") {
				$("#winSelector,#bigView").hide();
			}
			e.stopPropagation();
			return false;
		}
		if (document.createTouch) {
			$("#midimg,#winSelector").live("touchmove", mouseEnter).live("touchend", mouseOut);
		} else {
			$("#midimg, #winSelector").live("mouseenter", mouseEnter);
			$("#winSelector").live("mousemove", mouseEnter);
			$("#midimg,#winSelector").live("mouseout", mouseOut);
		}
		var $divWidth = $("#winSelector").width();
		var $divHeight = $("#winSelector").height();
		var $imgWidth = $("#midimg").width();
		var $imgHeight = $("#midimg").height();
		var $viewImgWidth = $viewImgHeight = $height = null;
		$(window).load(changeViewImg);
		$("#bigView").scrollTop(0);
		function fixedPosition(e) {
			if (e == null) {
				return;
			}
			var pageX = e.clientX + $(document).scrollLeft();
			var pageY = e.clientY + $(document).scrollTop();
			if (document.createTouch) {
				pageX = event.touches[0].pageX;
				pageY = event.touches[0].pageY;
			}
			var $imgLeft = $("#midimg").offset().left;
			var $imgTop = $("#midimg").offset().top;
			X = pageX - $imgLeft - $divWidth / 2;
			Y = pageY - $imgTop - $divHeight / 2;
			X = X < 0 ? 0 : X;
			Y = Y < 0 ? 0 : Y;
			X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
			Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;
			if ($viewImgWidth == null) {
				$viewImgWidth = $("#bigView img").outerWidth();
				$viewImgHeight = $("#bigView img").height();
				if ($viewImgWidth < 200 || $viewImgHeight < 200) {
					$viewImgWidth = $viewImgHeight = 800;
				}
				$height = $divHeight * $viewImgHeight / $imgHeight;
				$("#bigView").width($divWidth * $viewImgWidth / $imgWidth);
				$("#bigView").height($height);
			}
			var scrollX = X * $viewImgWidth / $imgWidth;
			var scrollY = Y * $viewImgHeight / $imgHeight;
			$("#bigView img").css({left:scrollX * -1, top:scrollY * -1});
			var viewH = document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
			var top = ((viewH - $height) / 2) + $(document).scrollTop();
			top = top < 240 ? 240 : top;
			var left = 537;
			if (isIE6) {
				left = ie6.setLeft(left);
			}
			$("#bigView").css({top:top, left:left});
			return {left:X, top:Y};
		}
	})();
	$("#saleout").live("click", function () {
		var productcode = $("#productcode").text().split("\uff1a")[1];
		var saleoutWidth = 466;
		var saleoutHeight = 208;
		ajaxIsLogined(function () {
			if (!isLogined) {
				saleoutWidth = 451;
				saleoutHeight = 156;
			}
			$.fn.popwindow({width:saleoutWidth, height:saleoutHeight, title:"\u5230\u8d27\u901a\u77e5\u6211", href:"http://www.vancl.com/Product/ProductSaleOutNotify.aspx?oper=1&productCode=" + productcode + "&r=" + Math.random()});
		});
		return false;
	});
	$(".selColor li:not(.colorBlocksouqing),.selSize li").live("mouseover", function () {
		$(this).addClass("hover");
	}).live("mouseout", function () {
		$(this).removeClass("hover");
	});
	function selectedAmount_click() {
		var number = parseFloat($("#selectedAmount").val());
		re = /\d/g;
		var text = $(".cuxiaoPrice span").text().replace(/[\d|\.]+/g, function ($1, i) {
			if (i == 1) {
				i = 2;
			} else {
				i = 0;
			}
			return (parseFloat($1) * number).toFixed(i);
		});
		$(".goodsPrice em").text(text);
	}
	$("#selectedAmount").click(selectedAmount_click);
	selectedAmount_click();
	(function () {
		var api = ["sina", "sohu", "qq", "qqzone", "kaixin", "renren", "douban"];
		$("#share a").live("click", function () {
			var index = $(this).prevAll("a").length;
			var imgdata = [];
			$.each($("#imageMenu li span"), function (i, item) {
				if (api[index] == "qqzone") {
					imgdata[i] = $(item).attr("name");
				} else {
					imgdata[i] = $(item).attr("name").replace("small", "mid");
				}
			});
			var userName = "@VANCL\u7c89\u4e1d\u56e2";
			if (api[index] == "qq") {
				userName = "@VANCL";
			}
			var title = "\u6211\u5728\u51e1\u5ba2\u8bda\u54c1\u770b\u5230\u4e86\u4e00\u4e2a\u975e\u5e38\u4e0d\u9519\u7684\u5546\u54c1\uff1a" + $.trim($("#styleinfo").text()) + "\uff0c\u4ec5\u552e" + $.trim($(".cuxiaoPrice").find("strong").text()) + "\u5143\uff1b " + $.trim($(".danpin_YhTsBox").find("li:first").text()) + userName + " \uff0c\u5730\u5740\uff1a" + getQueryString(document.location.href.replace(/(demo|my)item/ig, "item")) + " ";
			$.fn.share({api:api[index], title:title, url:getencodelochref(), pic:imgdata});
			return false;
		});
		function getencodelochref() {
			return encodeURIComponent(getQueryString(document.location.href.replace(/(demo|my)item/ig, "item")));
		}
	})();
	$(".question a").hover(function () {
		var divIframe = $("#vipiframe");
		if (divIframe.length == 0) {
			var divIframe = $("<iframe />");
			divIframe.attr("id", "vipiframe").attr("frameborder", "0").appendTo("body");
		}
		divIframe.attr("src", $(this).attr("href")).css({width:340, height:125, top:$(this).offset().top + 20, left:650}).show();
	}, function () {
		$("#vipiframe").hide();
	}).click(function () {
		return false;
	});
	if ($("#onlickColor .colorBlock").attr("name") == "True") {
		$("#comeon").fadeIn();
	}
	$(".dp_scbtn").live("click", function () {
		$("#collectbox,#carbox").hide();
		ajaxIsLogined(function () {
			if (!isLogined) {
				openLoginDiv("addFavorite()");
			} else {
				addFavorite();
			}
		});
		return false;
	});
	var closeCode = getCloseCode();
	if (closeCode == null) {
		$(".cityAdd").addClass("notallowed").hover(function () {
			$(this).nextAll(".warnning").show();
		}, function () {
			$(this).nextAll(".warnning").hide();
		});
	} else {
		$(window).load(checkStocking);
		SumPrice();
		$(".cityAdd").hover(stockIn, stockOut).nextAll("div.warnning").remove();
		$(".addressWindows").hover(stockIn, stockOut);
	}
	$(".goodsAddArea").fadeIn("slow");
	if (window.localStorage) {
		var myprovince = window.localStorage.myprovince;
		if (myprovince == null) {
			myprovince = "\u5317\u4eac";
		}
		$("#shippingAddr").text(myprovince);
	} else {
		if (document.body.style.behavior != "undefined") {
			var o = document.getElementById("bigView");
			o.style.behavior = "url('#default#userData')";
			o.addBehavior("#default#userData");
			o.load("my");
			var myprovince = o.getAttribute("province");
			if (myprovince == null) {
				myprovince = "\u5317\u4eac";
			}
			$("#shippingAddr").text(myprovince);
		}
	}
	$(".addressWindows a").live("click", function () {
		$("#shippingAddr").text($(this).text());
		if (window.localStorage) {
			window.localStorage.myprovince = $(this).text();
		} else {
			if (document.body.style.behavior != "undefined") {
				var o = document.getElementById("bigView");
				o.setAttribute("province", $(this).text());
				o.save("my");
			}
		}
		checkStocking();
		return false;
	});
	(function () {
		$(".RsetTabMenu li").click(function () {
			var menu = $(".RsetTabMenu li");
			menu.removeClass("hover").addClass("down");
			$(this).addClass("hover").removeClass("down");
			var index = $(this).prevAll().length;
			var tabs = $(".RsetTabCon");
			tabs.hide();
			if ($.trim(tabs.eq(index).html()) == "") {
				$.get($(this).find("a").attr("href"), function (data) {
					tabs.eq(index).html(data);
				}).success(function () {
					tabs.eq(index).show();
				});
			} else {
				tabs.eq(index).show();
			}
			if (index > 0) {
				$(".RsetTabArea>.liketabfg,.RsetTabArea>.blank20,.RsetTabArea>.blank15,#starvancl").hide();
			} else {
				$(".RsetTabArea>.liketabfg,.RsetTabArea>.blank20,.RsetTabArea>.blank15,#starvancl").show();
				tabs.eq(1).show();
				tabs.eq(2).show();
			}
			return false;
		});
	})();
	$("#selectedAmount").live("change", SumPrice);
	$("#tiwen").click(function () {
		ajaxIsLogined(function () {
			if (!isLogined) {
				$.fn.alert("\u6b64\u64cd\u4f5c\u9700\u8981\u767b\u5f55\uff0c\u60a8\u73b0\u5728\u8981\u767b\u5f55\u5417\uff1f", function (b) {
					if (b) {
						location.href = "https://login.vancl.com/login/login.aspx?" + location.href;
					}
				}, {type:2});
			} else {
				$.fn.popwindow({href:"/styles/static.aspx?position=Ask", width:"821px", height:"380px", title:"\u63d0\u95ee"});
			}
		});
		return false;
	});
	$(window).one("scroll", function () {
		var productcode = $("#productcode").text().split("\uff1a")[1];
		$.get("/styles/ajaxload.aspx?productcode=" + productcode + "&producttype=" + producttype + "&styleid=" + styleid, function (data) {
			$(".danpinRight").append(($("#promotion", data).html()));
			$(".sideBarArea").append(($("#left", data).html()));
			$("#starvancl").replaceWith($("#starvancl", data));
			$(".dpShuXing ul").append($("#productporperty", data).html());
			if ($(".dpShuXing ul li").length > 0) {
				$("#attr").show();
			} else {
				$("#attr").hide();
			}
			var index = $(".RsetTabMenu li.hover").prevAll().length;
			if (index > 0) {
				$("#starvancl").hide();
			}
			if (typeof (vjiaAd) != "undefined" && vjiaAd.imageUrl && vjiaAd.imageLink) {
				try {
					var adlink = "<a class='track' name='" + vjiaAd.track + "' href='" + vjiaAd.imageLink + "?source=" + vjiaAd.source + "' target='_blank'><img src='" + vjiaAd.imageUrl + "' style='width: 200px;height:220px;' /></a>";
					$(".sideBarArea").append("<div class='itemad' style='width: 200px;height:220px;overflow:hidden;'>" + adlink + "</div>");
				}
				catch (e) {
				}
			}
			bindShowStarWindow();
			$lazyload = $(".danpin_TJtaozTab,#starvancl,.sideBarArea").find("img[original]").not("[src])");
			if ($lazyload.length > 0) {
				$lazyload.lazyload();
			}
		});
		$.ajax({url:"//jsy.vanclimg.com/js.ashx?href=item/unimportant.js&compress&v=20120711", cache:true, dataType:"script"});
	});
	(function () {
		var viewH = document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
		if (window.screen.width > $(document.body).width() + 100) {
			var scrollit = function () {
				if ($(window).scrollTop() == 0) {
					goup.fadeOut();
				} else {
					goup.fadeIn();
					if (isIE6) {
						goup.css({top:ie6.goUpTop()});
					}
				}
			};
			var goup = $("<div style=\"right:0px;POSITION: absolute;z-index:1\"><a href=\"javascript:window.scrollTo(0,0);\"><div class=\"sprites\" style=\"width:34px;height:24px;background-position:-88px -321px\"></div></a></div>").hide();
			if (!isIE6) {
				goup.css({position:"fixed", bottom:5, right:($(window).width() / 2 - $(document.body).width() / 2 - 100) < 0 ? 0 : ($(window).width() / 2 - $(document.body).width() / 2 - 100)});
			} else {
				if ($(window).scrollTop() > 0) {
					goup.css({top:ie6.goUpTop()}).show();
				}
				ie6.windowresize();
				$(window).resize(scrollit);
			}
			$(window).scroll(scrollit);
			$("body").prepend(goup);
		}
	})();
	(function () {
		var pageCount = $("#relatedPager").find("a[id*='relatedPager_']").length;
		if (pageCount > 0) {
			$("#relatedLeft").hide();
			$("#relatedPager").find("a[id*='relatedPager_']").click(function () {
				var pagerID = $(this).attr("id");
				setRelatedCurent(pagerID);
				window.location.hash = "relatedshow";
				return false;
			});
			$("#relatedRight").click(function () {
				relatedPageStep(1);
				window.location.hash = "relatedshow";
				return false;
			});
			$("#relatedLeft").click(function () {
				relatedPageStep(-1);
				window.location.hash = "relatedshow";
				return false;
			});
		}
	})();
	(function () {
		$(window).load(function () {
			LimitPurchase();
			var styleID = $("#styleinfo").attr("name");
			$.get("/SizeCalculate/IniColorBox.aspx?styleID=" + styleID, function (r) {
				if (r) {
					sizeCalObj = eval("(" + r + ")");
					if (sizeCalObj.isHave) {
						$("#sizeCal_text").show();
						if (sizeCalObj.start) {
							$("#showSizeCalculate").attr("href", "/SizeCalculate/PageRedirect.aspx?pageName=" + sizeCalObj.start);
						}
						$("#showSizeCalculate").popwindow({width:"530px", height:"354px", noOverlayClose:true});
					}
				}
			});
		});
	})();
	var num = $("#onlickSelSize").attr("title");
	selectTip(num);
});
function changeViewImg() {
	$("#bigView").empty().append("<span>\u6b63\u5728\u52a0\u8f7d\u4e2d\u2026\u2026</span><img style=\"display:none\"/>");
	$("#bigView img").load(function () {
		$("#bigView span").remove();
		$(this).show();
	}).attr("src", $("#midimg").attr("src").replace("mid", "big"));
}
function bindShowStarWindow() {
	var a = $("#productcode").text().split("\uff1a")[1];
	$("#showstar").attr("href", "//seller.vancl.com/suit/show?productid=" + a);
	$("#showstar").unbind("click");
	$("#showstar").click(function () {
		ajaxIsLogined(function () {
			if (!isLogined) {
				$.fn.alert("\u6b64\u64cd\u4f5c\u9700\u8981\u767b\u5f55\uff0c\u60a8\u73b0\u5728\u8981\u767b\u5f55\u5417\uff1f", function (c) {
					if (c) {
						location.href = "https://login.vancl.com/login/login.aspx?" + location.href;
					}
				}, {type:2});
				return false;
			} else {
				if (isPurchased && isPurchased > 0) {
					if (trialproductcode != "") {
						$("#showstar").attr("href", "http://seller.vancl.com/suit/show?productid=" + trialproductcode);
					}
					$.fn.popwindow({href:$("#showstar").attr("href"), width:"821px", height:"500px", title:"\u6211\u8981\u6652\u5355"});
				} else {
					$.fn.alert("\u60a8\u5c1a\u672a\u8d2d\u4e70\u6b64\u5546\u54c1\uff0c\u6216\u8ba2\u5355\u672a\u5b8c\u6210\uff0c\u8fd8\u4e0d\u80fd\u6652\u5355\u3002");
					return false;
				}
			}
		}, a);
		return false;
	});
	$("#starItemPager a").live("click", function (c) {
		var d = $(this).attr("href");
		if (!d) {
			return false;
		} else {
			d = d + "&normalstarcount=" + $("#starvancl").attr("name");
		}
		b(d);
		return false;
	});
	function b(c) {
		$.get(c, function (d) {
			$("#starItem .bask").html($(".baskcontainer", d).html());
			$("#starItemPager").html($(".pagercontainer", d).html());
		});
	}
}
function relatedPageStep(f) {
	var b = $("#relatedPager").find("strong").parent();
	var c = b.attr("id");
	var a = c.split("_");
	var e = Number(a[1]) + f;
	var d = a[0] + "_" + e;
	setRelatedCurent(d);
}
function setRelatedCurent(e) {
	var b = $("#relatedPager").find("strong");
	var f = b.html();
	b.parent().html(f);
	$("#" + e).html("<strong>" + $("#" + e).html() + "</strong>");
	$(".relatedshow").removeClass("relatedshow").addClass("relatedhide");
	var d = 0;
	var a = 5;
	var g = Number(e.split("_")[1]) * a;
	var j = Number($("#relatedTotal").html());
	if (g + a >= j) {
		a = j - g;
		$("#relatedRight").hide();
	} else {
		$("#relatedRight").show();
	}
	if (g == 0) {
		$("#relatedLeft").hide();
	} else {
		$("#relatedLeft").show();
	}
	while (d < a) {
		var h = g + d;
		$("#relatedImage_" + h).removeClass("relatedhide").addClass("relatedshow");
		d++;
	}
}
function selectTip(a) {
	$(".SelectName").text($("#onlickColor").attr("title"));
	if ($(".shoppingErrTips2").length > 0) {
		$(".shoppingErrTips2").remove();
	}
	var b = $("#onlickSelSize p");
	if (b.length == 1) {
		$(".SelectSize").text($("#onlickSelSize p").text());
		if (a >= 10) {
			$(".NowHasGoods").text("\u73b0\u5728\u6709\u8d27");
		} else {
			$(".NowHasGoods").text("\u5e93\u5b58\u7d27\u5f20");
		}
		$("#sizetip").show();
	} else {
		$("#sizetip").hide();
	}
	$(".SelectGoods").show();
}
function ChooseThisSize(a, d, c) {
	$(".danpin_xuanzeGMcm").hide();
	$(".shoppingErrTips").remove();
	$(".cityAdd").removeClass("notallowed").next("div.warnning").remove();
	if (c < 10) {
		$("#comeon").fadeIn();
	} else {
		$("#comeon").fadeOut();
	}
	$(".selSize li").removeAttr("id");
	$(a).attr("id", "onlickSelSize");
	c = parseInt(c);
	$(a).siblings().find("span").remove();
	$("<span></span>").appendTo($(a));
	var e = $("#selectedAmount option").length - c;
	if (e > 0) {
		$("#selectedAmount option").eq(c - 1).nextAll().remove();
	} else {
		if (e < 0) {
			e = Math.abs(e);
			var b = new Array(e);
			$.map(b, function (g, f) {
				var h = parseInt($("#selectedAmount option:last-child").val()) + 1;
				$("#selectedAmount").append("<option value=\"" + h + "\">" + h + "</option>");
			});
		}
	}
	checkStocking();
	SumPrice();
	selectTip(c);
	$(".cityAdd").unbind();
	$(".cityAdd").hover(stockIn, stockOut);
	$(".addressWindows").hover(stockIn, stockOut);
}
var preUrlArr = ["/SizeCalculate/PageRedirect.aspx?pageName=HWCompute"];
var sizeCalObj;
var preParam = {};
function setTab(e, b, d) {
	for (i = 1; i <= d; i++) {
		var c = document.getElementById(e + i);
		var a = document.getElementById("con_" + e + "_" + i);
		c.className = i == b ? "hover" : "";
		a.style.display = i == b ? "block" : "none";
	}
}
function recmApi(b, a, d, e, c) {
	if (a.length > 0) {
		$.getJSON("//app-recm.vancl.com/RecmService/GetProductByPosition?jsoncallback=?", {strJson:b}, function (f) {
			if (f.Success) {
				var h = $("#productcode").text().split("\uff1a")[1];
				var g = [];
				g.push("<h2>");
				g.push("<a href='/favourate?productcode=" + h + "&p=" + c + "' class='track' name='" + e + "' target='_blank'>\u60a8\u53ef\u80fd\u559c\u6b22\u7684\u5546\u54c1>></a>");
				g.push(f.Title);
				g.push("</h2>");
				g.push("<ul class='CarBox_ProductListTab'>");
				$.each(f.Items, function (j, k) {
					var m = "//item.vancl.com/" + k.ProductCode + ".html";
					var l = k.Ref + "-" + h;
					g.push("<li>");
					g.push("<div class=\"ygmPic\">");
					g.push("<a class='track' name='" + e + "' href=\"" + m + "\" target=\"_blank\" rel=\"" + l + "\">");
					g.push("<img src=\"" + k.ImageUrl + "\" /></a></div>");
					g.push("<a class=\"ygmName track\" name='" + e + "' href=\"" + m + "\" target=\"_blank\" rel=\"" + l + "\">" + k.ProductName + "</a>");
					g.push("<p class=\"ygmPrice\">");
					g.push("<span>\u552e\u4ef7\uffe5" + k.Price + "</span>");
					g.push("</p>");
					g.push("</li>");
				});
				g.push("</ul>");
				a.html(g.join("")).show();
			} else {
				a.hide();
			}
		});
	}
}
function recmApibyFavorite(b, a, d, e, c) {
	if (a.length > 0) {
		$.getJSON("//app-recm.vancl.com/RecmService/GetProductByPosition?jsoncallback=?", {strJson:b}, function (f) {
			if (f.Success) {
				var h = $("#productcode").text().split("\uff1a")[1];
				var g = [];
				g.push("<h6>");
				g.push(f.Title);
				g.push("<a href='/favourate?productcode=" + h + "&p=" + c + "' style='color:#A10000;margin-left:120px;' class='track' name='" + e + "' target='_blank'>\u66f4\u591a\u60a8\u53ef\u80fd\u559c\u6b22\u7684\u5546\u54c1>></a></h6>");
				g.push("<ul>");
				$.each(f.Items, function (j, k) {
					var m = "//item.vancl.com/" + k.ProductCode + ".html";
					var l = k.Ref + "-" + h;
					g.push("<li>");
					g.push("<div class=\"ygmPic\">");
					g.push("<a class='track' name='" + e + "' href=\"" + m + "\" target=\"_blank\" rel=\"" + l + "\">");
					g.push("<img src=\"" + k.ImageUrl + "\" /></a></div>");
					g.push("<a class=\"ygmName track\" name='" + e + "' href=\"" + m + "\" target=\"_blank\" rel=\"" + l + "\">" + k.ProductName + "</a>");
					g.push("<p class=\"ygmPrice\">");
					g.push("<span>\u552e\u4ef7\uffe5" + k.Price + "</span>");
					g.push("</p>");
					g.push("</li>");
				});
				g.push("</ul>");
				a.html(g.join("")).show();
			} else {
				a.hide();
			}
		});
	}
}
function addFavorite() {
	$("#collectboxloaging").html("<img src=\"//i.vanclimg.com/logo/loading.gif\" alt=\"loading\">");
	$.fn.popwindow.close();
	$("#collectbox").css({top:$(".dp_scbtn").offset().top - 100}).show();
	if (isIE6) {
		$("#collectbox").css({left:ie6.setLeft(539)});
	}
	isLogined = true;
	setWelcome();
	var d = $("#productcode").text().split("\uff1a")[1];
	var c = "[{Position:\"rp_item_favorite\", ProductCodes:\"" + d + "\",Rows:\"" + 5 + "\",Remark:\"NeedExclude\"}]";
	var a = $(".collectbox").find(".gmlist");
	var b = {productcode:d};
	b.price = $.trim($(".cuxiaoPrice strong:eq(0)").text());
	b.endcatename = $.trim($(".breadNav a:last").text());
	$.getJSON("/api/likethis.aspx", b, function (e) {
		if (e.msg == "Y") {
			$("#collectbox").find(".msgboxhead2 a").click(function () {
				$("#collectbox").hide();
				$("#collectboxloaging").show().nextAll().hide();
				$(".fonttext,.tishi, .baocun").hide();
				$(".icte").val("");
				$(".inCti").find("span").removeClass().addClass("inCti_img02");
				return false;
			});
			recmApibyFavorite(c, a, "dp_collect_SimilarWatching", "item-favorite-pab", "favorite");
			$("#collectboxloaging").hide().nextAll().show();
			$.getJSON("/api/FavoriteMark.aspx?styleid=" + $("#styleinfo").attr("name"), function (f) {
				if (f.Success == "Y") {
					var h = f.CommonRemarks || [];
					if (h.length == 0) {
						var g = $.map($(".breadNav a:gt(0)"), function (j) {
							return $.trim($(j).text());
						});
						g.reverse().splice(3 - h.length);
						if (g.length > 3) {
							g.length = 3;
						}
						$.merge(h, g);
					} else {
						if (h.length > 3) {
							h.length = 3;
						}
					}
					$("#commonmarks").hide();
					if (h.length > 0) {
						$("#commonmarks").show().html("\u5e38\u7528\u6807\u7b7e\uff1a" + $.map(h, function (j) {
							return "<label><input type=\"checkbox\" class=\"input\" />" + j + "</label>";
						}).join(" "));
					}
				}
			});
		} else {
			$.fn.alert("\u6dfb\u52a0\u9519\u8bef\u3002");
			$(".queding80EE8D67985E").click(function () {
				$("#collectbox").hide();
			});
		}
	});
}
function openLoginDiv(a) {
	var b = [];
	b.push("https://login.vancl.com");
	b.push("/PublicControls/LoginDiv.aspx");
	b.push("?url=");
	b.push(escape(window.location.href));
	b.push("&location=");
	b.push(escape("http://item.vancl.com/styles/closeit.aspx?func=" + a));
	$.fn.popwindow({href:b.join(""), width:384, height:463, title:"\u64cd\u4f5c\u63d0\u793a", noOverlayClose:true});
}
function CommentVote(b) {
	$.fn.popwindow.close();
	isLogined = true;
	setWelcome();
	b = b.replace("#mvc", ".mvc");
	var a = $(".new-btn").find("a[href='" + b + "']").find("span");
	if (!a.html()) {
		a = $(".new-btn[href='" + b + "']").find("strong em");
	}
	$.ajax({url:b + "&t=" + Math.random(), dataType:"text"}).success(function (c) {
		if (c == "Y") {
			a.fadeOut(function () {
				var d = "(" + (parseInt(a.text().replace("(", "").replace(")", "")) + 1) + ")";
				a.text(d).fadeIn();
			}).closest(".new-comment, .plDYinfo").find(".new-btn, .new-btn a").attr("href", "");
		} else {
			$.fn.alert(c);
		}
	}).error(function (c) {
		$.fn.alert(c);
	});
}
function LimitPurchase() {
	function b(f, g, h) {
		var d = $("#selectedAmount");
		var e = $("#selectedAmount option");
		d.after("<span id='limitinfo' style='margin-left:5px;'>" + g + "</span>");
		var c = e.eq(h - 1).prevAll();
		if (f == "down") {
			c = e.eq(h - 1).nextAll();
		}
		c.attr("disabled", true);
		if ($.browser.msie && $.browser.version <= 7) {
			c.css({color:"graytext"});
			d.unbind("focus").focus(function () {
				$(this).data("f", this.selectedIndex);
			});
			d.unbind("change").change(function () {
				var j = f == "down" ? this.selectedIndex > h - 1 : this.selectedIndex < h - 1;
				if (j) {
					this.selectedIndex = $(this).data("f");
				} else {
					$(this).data("f", this.selectedIndex);
				}
			});
		}
		if ($.browser.msie && $.browser.version == 8) {
			d.unbind("keypress").keypress(function (k) {
				var l = k.keyCode;
				var j = f == "down" ? l > (h + 48) : l < (h + 48);
				if (l > 48 && l < 58 && j) {
					if (l == 49 && f == "down") {
						this.selectedIndex = 0;
					}
					return false;
				}
			});
		}
	}
	$("#selectedAmount").next("#limitinfo").remove();
	var a = $("#productcode").text().split("\uff1a")[1];
	$.getJSON("api/LimitPurchase.aspx?productcode=" + a, function (c) {
		if (c.msg == "Y" && typeof (c.direction) != "undefined") {
			b(c.direction, c.err, c.num);
		}
	});
}
function SumPrice() {
	var a = $(".goodsCar .dpxj0523");
	if (getCloseCode()) {
		var c = Number($("#selectedAmount").val());
		var b = Number($(".cuxiaoPrice strong").eq(0).text());
		a.show().children("span").html((c * b).toFixed(2));
	} else {
		a.hide();
	}
}
$(function () {
	$("input[name=yes]").click(function (b) {
		var c = $(this).index("input[name=yes]");
		if (c == 0) {
			$("#recommendarea").slideUp();
			$(".SubmitOk :button").eq(0).show();
		} else {
			$(".SubmitOk :button").eq(0).hide();
			$("#recommendarea").slideDown();
			$("#recommendarea textarea").data("forid", (c == 1 ? "textbox26382" : "textbox26379"));
		}
	});
	var a = true;
	$(".Comment0903 textarea").keyup(function (b) {
		if (this.value.length >= 1000) {
			$(".reachWord").show();
			this.value = this.value.substr(0, 1000);
		} else {
			$(".reachWord").hide();
		}
		$(".OrderZifu em").text(this.value.length);
	}).focus(function (b) {
		if (a) {
			this.value = "";
			this.style.color = "black";
			a = false;
		}
	});
	$(".SubmitOk :button").click(function () {
		var b = {textbox26373:"\u5355\u54c1\u9875", textbox26382:"", textbox26379:""};
		b.p4182 = $(".Comment0903 :checked").val();
		var c = $("#recommendarea textarea");
		if (c.data("forid")) {
			b[c.data("forid")] = c.val();
		}
		$.post("/api/survey.aspx", b);
		$(".yijianTJ").replaceAll(".Comment0903").show();
		return false;
	});
});
function getQueryString(f) {
	var a = ["ref=", "source="];
	for (var b = 0; b < a.length; b++) {
		var e = f.indexOf(a[b]);
		if (e > -1) {
			var d = f.substring(e, f.length);
			f = f.substring(0, e);
			if (d.indexOf("&") > -1) {
				f += d.substring(d.indexOf("&") + 1);
			}
		}
	}
	var c = f.length - 1;
	if (f[c] == "&") {
		f = f.substring(0, c);
		c = f.length - 1;
	}
	if (f[c] == "?") {
		f = f.replace(f[c], "");
	}
	return f;
}
(function (a) {
	a.fn.share = function (e) {
		var e = a.extend({}, e);
		var m = e.windowSize || "scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes";
		var l = e.target || "_blank";
		var j = "http://v.t.sina.com.cn/share/share.php";
		var c = "http://www.kaixin001.com/rest/records.php?style=11&stime=&sig=";
		var h = "http://share.renren.com/share/buttonshare/post/1004";
		var b = "http://shuo.douban.com/!service/share";
		var f = "http://share.v.t.qq.com/index.php?c=share&a=index&appkey=801276851";
		var g = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
		var k = "http://t.sohu.com/third/post.jsp";
		d();
		function d() {
			switch (e.api) {
			  case "sina":
				window.open(j + "?pic=" + e.pic[0] + "&title=" + encodeURIComponent(e.title) + "&url=" + encodeURIComponent(e.url) + "&rcontent=", l, m);
				break;
			  case "sohu":
				window.open(k + "?url=" + encodeURIComponent(e.url) + "&pic=" + e.pic.join(",") + "&title=" + encodeURIComponent(e.title) + "&content=utf8", l, m);
				break;
			  case "qq":
				window.open(f + "&title=" + encodeURIComponent(e.title) + "&url=" + encodeURIComponent(e.url) + "&pic=" + e.pic.join("|") + "&rcontent=", l, m);
				break;
			  case "qqzone":
				window.open(g + "?title=" + encodeURIComponent(e.title) + "&url=" + e.url + "&pics=" + e.pic.join("|") + "&rcontent=", l, m);
				break;
			  case "kaixin":
				window.open(c + "&url=" + encodeURIComponent(e.url) + "&content=" + encodeURIComponent(e.title) + "&pic=" + e.pic.join(","), l, m);
				break;
			  case "renren":
				window.open(h + "?title=" + encodeURIComponent(e.title) + "&url=" + encodeURIComponent(e.url) + "&pic=" + e.pic[0] + "&rcontent=", l, m);
				break;
			  case "douban":
				window.open(b + "?image=" + e.pic[0] + "&href=" + e.url + "&name=" + encodeURIComponent(e.title), l, m);
				break;
			}
		}
	};
})(jQuery);
$(document).ready(function () {
	$("#video").click(function () {
		trackurl("dp-Video-track", this);
		if ($(this).css("background-image").indexOf("videoBtn.gif") > -1) {
			$(this).removeClass("videoBtn").addClass("videoBtn02");
			$("#share,#imageMenu,#midimg").hide();
			var d = "args=" + $(this).attr("name") + "|" + encodeURI($.trim($("#pricearea h2").text())) + "|yes|no|yes|0|75";
			$(this).css("background-image", "url(http://i.vanclimg.com/Others/2010/8/20/fanhuiImg.gif)");
			html = [];
			html.push("<div id=\"videowindow\" style=\"position:absolute;background-color:White;\">");
			html.push("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0\"");
			html.push("width=\"507\" height=\"380\" align=\"middle\">");
			html.push("<param name=\"allowScriptAccess\" value=\"sameDomain\" />");
			html.push("<param name=\"allowFullScreen\" value=\"true\" />");
			html.push("<param name=\"movie\" value=\"http://i.vanclimg.com/flv/vanclplayer.swf\" />");
			html.push("<param name=\"quality\" value=\"high\" />");
			html.push("<param name=\"bgcolor\" value=\"#ffffff\" />");
			html.push("<param name=\"flashvars\" value=\"" + d + "\" />");
			html.push("<embed src=\"http://i.vanclimg.com/flv/vanclplayer.swf\" quality=\"high\" bgcolor=\"#ffffff\" width=\"507\"");
			html.push(" height=\"380\" align=\"middle\" allowscriptaccess=\"sameDomain\"");
			html.push(" allowfullscreen=\"true\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\"");
			html.push(" flashvars=\"" + d + "\" />");
			html.push("</object>");
			html.push("</div>");
			var c = $(".danpin_colLef").position().left - ($(document).width() - $("body").width()) / 2 < 0 ? 0 : $(".danpin_colLef").position().left - ($(document).width() - $("body").width()) / 2;
			var b = {top:$(".danpin_colLef").position().top, left:c};
			if (!document.all) {
				b = {top:$(".danpin_colLef").position().top - 2};
			}
			$(html.join("")).appendTo("body").css(b);
		} else {
			a();
		}
		return false;
	});
	function a() {
		$("#video").css("background-image", "url(http://i.vanclimg.com/Others/2010/8/20/videoBtn.gif)").removeClass("videoBtn02").addClass("videoBtn");
		$("#share,#imageMenu,#midimg").show();
		$("#videowindow").remove();
	}
});
$(function () {
	function c(e) {
		if (history && history.pushState) {
			var f = {productcode:e};
			window.history.pushState(f, document.title, window.location.href.replace(/\d{7,8}\.html/, e + ".html"));
		}
	}
	window.onpopstate = function (f) {
		if (f.state) {
			a(f.state.productcode, b, false);
		} else {
			var g = document.location.toString().match(/(\w{7,8}).html/);
			if (g != null && g.length == 2) {
				var h = g[1];
				if ($("#productcode").text().split("\uff1a")[1] != h) {
					a(h, b, false);
				}
			}
		}
	};
	function a(g, f, e) {
		$("#loading").html("<img src=\"//i.vanclimg.com/logo/loading.gif\" alt=\"loading\">");
		if (isIE6) {
			$("#loading").css({left:ie6.setLeft(0)});
		}
		$("#loading").css({top:$(".bigImg").position().top, height:260}).show();
		$.get("/styles/AjaxChangeProduct.aspx?productcode=" + g + "&point=" + f + "&ref=" + d("ref") + "&source=" + d("source"), function (l) {
			$this = $(".selColor li[name='" + g + "']");
			$this.siblings().find(".colorHoverok").remove().appendTo($this);
			$(".bigImg").html($(".bigImg", l).html());
			$("#loading").fadeOut("slow").hide(0);
			changeViewImg();
			$(".smallImg").html($(".smallImg", l).html());
			if (typeof checkMenuStatus == "undefined" && $("#imageMenu").children("li").length > 5) {
				$.getScript("//js.vanclimg.com/item/smallimg.js", function () {
					checkMenuStatus();
				});
			}
			$("#productTitle").html($("#title", l).html());
			var q = $("#pricearea").children(".pingfen").html();
			$("#pricearea").html($("#price", l).html()).children(".pingfen").html(q);
			$(".selSizeArea").html($("#size", l).html());
			$("#tj").html($("#tj", l).html());
			$lazyload = $("#tj").find("img[original]").not("[src])");
			if ($lazyload.length > 0) {
				$lazyload.lazyload();
			}
			$(".goodsNum, .goodsAddArea, .AreaItotal,.shoppingNews,.shoppingErrTips").remove();
			$(".cityAdd").removeClass("notallowed");
			$("#citystatus").text("");
			$(".SelectGoods").hide();
			if ($(".goodsNum", l).length != 0) {
				$(".selSizeArea + .blank8ie").after($("#shoppingcar", l).html());
				$(".goodsAddArea").show();
				var k = getCloseCode();
				if (k == null) {
					$(".cityAdd").addClass("notallowed").hover(function () {
						$(this).nextAll(".warnning").show();
					}, function () {
						$(this).nextAll(".warnning").hide();
					});
				} else {
					$(".cityAdd").hover(stockIn, stockOut).nextAll("div.warnning").remove();
					$(".addressWindows").hover(stockIn, stockOut);
				}
				if (window.localStorage) {
					var m = window.localStorage.myprovince;
					if (m == null) {
						m = "\u5317\u4eac";
					}
					$("#shippingAddr").text(m);
				} else {
					if (document.body.style.behavior != "undefined") {
						var p = document.getElementById("bigView");
						p.style.behavior = "url('#default#userData')";
						p.addBehavior("#default#userData");
						p.load("my");
						var m = p.getAttribute("province");
						if (m == null) {
							m = "\u5317\u4eac";
						}
						$("#shippingAddr").text(m);
					}
				}
			}
			$("#onlickColor").removeAttr("id");
			var j = $this.find(".colorBlock");
			if (j.attr("name") == "True" && j.hasClass("colorBlocksouqing") == false) {
				$("#comeon").show();
			} else {
				$("#comeon").hide();
			}
			var h = $.trim($this.text());
			var r = $("#productcode").text().split("\uff1a")[1];
			$this.attr("id", "onlickColor");
			var n = $("#onlickSelSize").attr("title");
			selectTip(n);
			$("#imageMenu").scrollTop(0).scrollLeft(0);
			if (typeof checkMenuStatus != "undefined") {
				$("#imageMenu").scrollTop(0);
				checkMenuStatus();
			}
			$(".fangda a").attr("href", "/Styles/BigImg.aspx?ProductCode=" + r);
			$("#product_set").html($("#product_set", l).html());
			$(".dpShuXing ul li.ajaxchange").remove();
			$(".dpShuXing ul").append($("#productporperty", l).html());
			if ($(".dpShuXing ul li").length > 0) {
				$("#attr").show();
			} else {
				$("#attr").hide();
			}
			$("#starvancl").html($("#starvancl", l).html());
			bindShowStarWindow();
			LimitPurchase();
			var s = location.href.replace(/\d{7,8}/, r);
			var k = getCloseCode();
			if (k != null) {
				checkStocking();
				SumPrice();
			}
			if (e) {
				c(r);
			}
			$lazyload = $(".danpin_TJtaozTab,#starvancl,#tj").find("img[original]").not("[src])");
			if ($lazyload.length > 0) {
				$lazyload.lazyload();
			}
		});
	}
	$(".selColorArea .selColor li[name]").click(function () {
		if ($(this).attr("id") != "onlickColor") {
			$(".selSize li").removeAttr("onclick");
			var e = $(this).attr("name");
			a(e, b, true);
		}
		return false;
	});
	var b = (function () {
		var h = document.location.toString();
		var g = h.indexOf("point=");
		if (g > -1) {
			g += 6;
			var f = h.indexOf("&");
			if (f == -1) {
				f = g.length;
			}
			return h.substring(g, f);
		}
		return 0;
	})();
	function d(f) {
		var h = document.location.search;
		if (h.indexOf(f + "=") > -1) {
			var e = h.indexOf(f + "=");
			var g = h.substring(e + f.length + 1, h.length);
			if (g == "") {
				return null;
			}
			if (g.indexOf("&") > -1) {
				g = g.substring(0, g.indexOf("&"));
			}
			return g;
		}
		return "";
	}
});
var smallImgData = [];
smallImgData.downHover = {direction:1, target:"last-child", className:"downer", visible:function () {
	var a = $("#imageMenu");
	return a.scrollTop() + a.height() == a.get(0).scrollHeight;
}, span:function (a) {
	return a.position().top;
}, scrollSpan:function (a) {
	return a.scrollTop();
}, animateParam:function (a) {
	return {scrollTop:a};
}};
smallImgData.upHover = {direction:-1, target:"first", className:"upper", visible:function () {
	return $("#imageMenu").scrollTop() == 0;
}, span:function (a) {
	return a.position().top;
}, scrollSpan:function (a) {
	return a.scrollTop();
}, animateParam:function (a) {
	return {scrollTop:a};
}};
function checkMenuStatus() {
	for (key in smallImgData) {
		if (smallImgData[key].visible()) {
			$("." + key).removeClass(key).addClass(smallImgData[key].className);
		} else {
			$("." + smallImgData[key].className).addClass(key).removeClass(smallImgData[key].className);
		}
	}
}
$(function () {
	$(".smallImgDown,.smallImgUp").live("click", function () {
		var b = $(this).attr("class");
		if (b.indexOf("downHover") > -1) {
			b = "downHover";
		}
		if (b.indexOf("upHover") > -1) {
			b = "upHover";
		}
		if (b == "downHover" || b == "upHover") {
			var d = smallImgData[b];
			var e = 0;
			while (d.span($("#imageMenu")) > d.span($("#imageMenu li").eq(e))) {
				e++;
			}
			e += 5 * d.direction;
			var a = $("#imageMenu li").eq(e);
			if (a.length == 0 || e < 0) {
				a = $("#imageMenu li:" + d.target);
			}
			var c = d.scrollSpan($("#imageMenu")) + d.span(a) - d.span($("#imageMenu"));
			$("#imageMenu").animate(d.animateParam(c), 500, checkMenuStatus);
		}
	});
});
$(function () {
	function c() {
		$(".rightborder2").height($(".cltboxcon").height() - 2);
	}
	function b(e, j) {
		var k = "", f = false;
		var l = "171";
		if (!$.trim(j)) {
			k = " \u8bf7\u8f93\u5165\u6807\u7b7e";
			f = true;
		} else {
			var h = /^[\u4E00-\u9FA50-9_a-zA-Z,，]+$/i;
			var d = j.split(/[,，]/);
			var g = d.length;
			if (!h.test(j)) {
				k = "\u8bf7\u8f93\u5165\u4e2d\u82f1\u6587\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf";
				l = "190";
				f = true;
			} else {
				if ($.unique(d).length < g) {
					k = "\u8bf7\u4e0d\u8981\u8bbe\u7f6e\u91cd\u590d\u6807\u7b7e";
					f = true;
				} else {
					if (d.length > 3) {
						k = "\u6700\u591a3\u4e2a\u6807\u7b7e";
						f = true;
					} else {
						$.each(d, function (m, o) {
							if (o.gblen() > 10) {
								f = true;
								k = "\u5355\u4e2a\u6807\u7b7e\u6700\u591a10\u4e2a\u5b57\u7b26";
								return false;
							}
						});
					}
				}
			}
		}
		if (f) {
			$(".tishi").eq(e).width(l).empty().html("<span></span>" + k + "\uff01").show(c);
			return false;
		} else {
			$(".tishi").eq(e).hide(c);
		}
		return true;
	}
	function a(e, f) {
		var g = "", d = true;
		if (!(d = !!$.trim(f))) {
			g = "Email\u4e0d\u80fd\u4e3a\u7a7a";
		} else {
			if (!(d = /^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i.test(f))) {
				g = "Email\u683c\u5f0f\u4e0d\u6b63\u786e";
			}
		}
		if (!d) {
			$(".tishi").eq(e).empty().html("<span></span>" + g + "\uff01").show(c);
		}
		return d;
	}
	$(".addsubscribe,.addmark").click(function (f) {
		var g = $(this).attr("class").indexOf("addmark") == -1 ? 1 : 0;
		$(".fonttext").eq(g).toggle();
		var d = $(".inCti").eq(g).find("span").attr("class");
		$(".inCti").eq(g).find("span").removeClass().addClass(d == "inCti_img02" ? "inCti_img01" : "inCti_img02");
		c();
		if ($(this).text() == "\u53d6\u6d88") {
			$(".fonttext").eq(g).find(":text").val("");
			$(".fonttext").eq(g).find(":checkbox").attr("checked", false);
			$(".tishi").eq(g).hide();
		}
		return false;
	});
	$(".icte:eq(0)").blur(function () {
		var d = $(this).val();
		$(this).val(d.replace(/[,，]{2,}/g, ",").replace(/^[,，]/, "").replace(/[,，]$/, ""));
	});
	$(".submitdiv").click(function (d) {
		var j = $("#styleinfo").attr("name");
		var h = $("#productcode").text().split("\uff1a")[1];
		var f = $(this).index(".submitdiv");
		var k = $(".icte").eq(f).val();
		var g = {productcode:h};
		var l = "";
		if (f == 0) {
			if (!b(f, k)) {
				return false;
			}
			g.styleid = j;
			g.marks = k;
			l = "/api/SaveFavoriteMark.aspx";
		} else {
			if (!a(f, k)) {
				return false;
			}
			g.email = k;
			l = "/api/AddSubscribe.aspx";
		}
		$.getJSON(l, g, function (e) {
			var m = e.Success ? "\u6210\u529f" : "\u5931\u8d25";
			$(".baocun").eq(f).html("\u4fdd\u5b58" + m + "\uff01").show("fast", function () {
				var n = $(this);
				setTimeout(function () {
					n.hide("fast");
				}, 3000);
				$(".tishi").eq(f).hide(c);
			});
		});
		return false;
	});
	$("#commonmarks input").live("click", function (f) {
		var g = $(".icte").eq(0);
		var j = g.val();
		var h = $(this).closest("label").text();
		if (!$.trim(j) && this.checked) {
			g.val(h);
		} else {
			var d = $.grep(j.split(/[,，]/), function (k, e) {
				return k != $.trim(h);
			});
			if (this.checked) {
				d.push(h);
			}
			g.val(d.join(","));
		}
		b(0, g.val());
	});
});
//document.domain = "vancl.com";
var ColorBoxTitle = "\u8ba1\u7b97\u60a8\u7684\u5c3a\u7801";
var PreUrl = window.parent.preUrlArr;
var sizeCalObj = window.parent.sizeCalObj;
var preParam = window.parent.preParam;
var isSizeList = false;
function IniSlider(styleID, SDVFIDs, arrSDVFID, isJYW) {
	var t = encodeURI(SDVFIDs.toString());
	jQuery.get("/SizeCalculate/IniSlider.mvc?styleID=" + styleID + "&SDVFIDs=" + t + "&r=" + Math.random(), function (data) {
		if (data == "") {
			iframeClose();
			return;
		}
		var r = "var arr = " + data;
		eval(r);
		for (var i = 0; i < arr.length; i++) {
			var id = arr[i].Name;
			for (var j = 0; j < arrSDVFID.length; j++) {
				if (id == arrSDVFID[j].SDVFID) {
					arrSDVFID[j].min = arr[i].min;
					arrSDVFID[j].max = arr[i].max;
					var bgImage = arr[i].backImage;
					if (isJYW) {
						bgImage = bgImage.replace(".gif", "_2.gif");
					}
					$("#" + arrSDVFID[j].divID).css("background-image", "url(" + bgImage + "?1234)");
					$("#" + arrSDVFID[j].outputID).attr("name", arr[i].SDVFID);
					if (preParam[arrSDVFID[j].outputID]) {
						var v = preParam[arrSDVFID[j].outputID];
						arrSDVFID[j].value = v.split(",")[0];
					}
					Slider(arrSDVFID[j]);
				}
			}
		}
	});
}
function Slider(a) {
	this.range = "min";
	this.min = 0;
	this.max = 100;
	this.value = 0;
	this.sliderID = "";
	this.outputID = "";
	this.step = 1;
	if (a.sliderID != "undefined" && a.sliderID != "") {
		if (typeof (a.range) != "undefined") {
			this.range = a.range;
		}
		if (typeof (a.min) != "undefined") {
			this.min = parseFloat(a.min);
		}
		if (typeof (a.max) != "undefined") {
			this.max = parseFloat(a.max);
		}
		if (typeof (a.value) != "undefined") {
			this.value = a.value;
		} else {
			this.value = this.min;
		}
		if (typeof (a.step) != "undefined") {
			this.step = a.step;
		}
		var b = {range:this.range, value:this.value, step:this.step, min:this.min, max:this.max};
		if (typeof (a.outputID) != "undefined" && a.outputID != "") {
			$("#" + a.outputID).val(this.value);
			b.slide = function (c, d) {
				$("#" + a.outputID).val(0 + d.value);
			};
			$("#" + a.outputID).data("max", this.max);
			$("#" + a.outputID).data("min", this.min);
			$("#" + a.outputID).focusout(function () {
				var c = $("#" + a.outputID).val();
				if (/^[0-9]+(.[0-9]{2})?$/.test(c) || /^[0-9]+(.[0-9]{1})?$/.test(c)) {
					$("#" + a.sliderID).slider("option", "value", c);
				} else {
					alert("\u8bf7\u8f93\u5165\u4e24\u4f4d\u4f4d\u5c0f\u6570\u6216\u6574\u6570\uff01\uff01");
					$("#" + a.outputID).focus();
				}
			});
		}
		$("#" + a.sliderID).slider(b);
	}
}
function ShowHWCompute() {
	ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=HWCompute.html");
}
function ShowSizeList() {
	if (sizeCalObj.sizelist) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.sizelist);
	}
}
function ShowExactCompute() {
	if (sizeCalObj.exact) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.exact);
	}
}
function ShowButtocks() {
	if (sizeCalObj.second) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.second);
	}
	return false;
}
function ShowContFind() {
	if (sizeCalObj.nofind) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.nofind);
	}
}
function ShowContFind_E() {
	if (sizeCalObj.nofind_e) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.nofind_e);
	}
}
function ShowResult() {
	if (sizeCalObj.result) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.result);
	}
}
function ShowResult_E() {
	if (sizeCalObj.result_e) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.result_e);
	}
}
function showResult4Exact() {
	if (sizeCalObj.result4exact) {
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.result4exact);
	}
}
function ShowResult_EYW() {
	ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=ResultExactYW");
}
function ShowError() {
	if (sizeCalObj.error) {
		isSizeList = true;
		ColorboxReload("/SizeCalculate/PageRedirect.mvc?pageName=" + sizeCalObj.error);
	}
}
function GoPrevious() {
	if (PreUrl.length > 0) {
		var a = PreUrl.pop();
		ColorboxReload(a);
	}
}
function ColorboxReload(d) {
	var a = $(window.parent.document.body);
	var b = a.find("#LoadedContent");
	b.attr("src", d);
}
function LoadLookList(a, e, c) {
	if (typeof (c) != "undefined") {
		var d = "";
		var b = "";
		if (sizeCalObj.sizelist) {
			d = "<a href=\"#\" id=\"sizeList\" title=\"\">\u67e5\u770b\u5c3a\u7801\u5bf9\u7167\u8868</a>";
		}
		if (c) {
			if (sizeCalObj.exact) {
				b = "<a id=\"exactCompute\" href=\"#\" title=\"\">\u7cbe\u786e\u8ba1\u7b97</a>";
			} else {
				if (typeof ($(".Men-JXWbtnUp")) != "undefined") {
					$(".Men-JXWbtnUp").css("margin-left", "297px");
				}
				if (typeof ($(".Men-GXbtnUp") != "undefined")) {
					$(".Men-GXbtnUp").css("margin-left", "162px");
				}
			}
		}
		$("." + a).html(d + b + $("." + a).html());
	}
	$("." + a).find("a").each(function () {
		var f = $(this).attr("id");
		if (f == "sizeList") {
			$(this).click(function () {
				pushInputParm();
				PreUrl.push(e);
				ShowSizeList();
				return false;
			});
		}
		if (f == "exactCompute") {
			$(this).click(function () {
				pushInputParm();
				PreUrl.push(e);
				ShowExactCompute();
				return false;
			});
		}
	});
}
function pushInputParm() {
	$("input[type='text']").each(function () {
		window.parent.preParam[$(this).attr("id")] = $(this).val() + "," + $(this).attr("name");
	});
}
function pushRaidoChecked() {
	$("input[type='radio']").each(function () {
		if ($(this).attr("checked")) {
			window.parent.preParam.statureRadio = $(this).attr("id");
		}
	});
}
function setRadioChecked() {
	var a = "standard";
	if (typeof (window.parent.preParam.statureRadio) != "undefined") {
		var a = window.parent.preParam.statureRadio;
	}
	$("#" + a).attr("checked", "checked");
}
function UnitSelect(d) {
	var b = d.val();
	var a = b.split(",");
	if (a.length == 2) {
		$("#div_" + a[0]).removeClass("hide").addClass("show");
		$("#div_" + a[1]).removeClass("show").addClass("hide");
		var g = $("#" + a[1]).val();
		var f = d.find("option:selected").text();
		var c = "";
		if (f == "CM") {
			c = g * 33.33333;
		} else {
			c = g / 33.33333;
		}
		var e = c.toFixed(1);
		if (e > $("#" + a[0]).data("max")) {
			e = $("#" + a[0]).data("max");
		}
		if (e < $("#" + a[0]).data("min")) {
			e = $("#" + a[0]).data("min");
		}
		$("#" + a[0]).val(e);
		$("#" + a[0]).focusout();
	}
}
function setColorBoxTitle() {
	var a = $(window.parent.document.body);
	a.find("#boxTitle").html(ColorBoxTitle);
}
function validate(e, d) {
	var a = $(window.parent.document.body);
	var b = $("#" + e).slider("option", "max");
	var c = $("#" + e).slider("option", "min");
	var f = $("#" + d).val();
	errMess = a.find("#sizeCalErrMessage").val();
	if (f == "") {
		if (errMess == "") {
			a.find("#sizeCalErrMessage").val($("#" + d).attr("title"));
		} else {
			a.find("#sizeCalErrMessage").val(errMess + "\u548c" + ("#" + d).attr("title"));
		}
		return false;
	} else {
		if (b < f || c > f) {
			if (errMess == "") {
				a.find("#sizeCalErrMessage").val($("#" + d).attr("title"));
			} else {
				a.find("#sizeCalErrMessage").val(errMess + "\u548c" + $("#" + d).attr("title"));
			}
			return false;
		} else {
			return true;
		}
	}
}
function iframeClose() {
	ChooseSize();
	parent.$.fn.popwindow.close();
	return false;
}
function colorBoxResize(b) {
	var a = {width:"0px", height:"0px", overflow:"hidden"};
	if (typeof (b.innerHeight) != "undefined") {
		a.height = b.innerHeight;
	} else {
		a.height = b.height;
	}
	if (typeof (b.innerWidth) != "undefined") {
		a.width = b.innerWidth;
	} else {
		a.width = b.width;
	}
	parent.$.fn.popwindow.resize(a);
}
function reSizeC() {
	ResizeCBbody("cboxMiddleLeft");
	ResizeCBbody("cboxContent");
	ResizeCBbody("cboxMiddleRight");
}
function ResizeCBbody(b) {
	var e = $(window.parent.document.body);
	var d = e.find("#" + b);
	var a = d.css("height");
	if (a.indexOf("px") > 0) {
		a = a.replace("px", "");
		var c = parseInt(a);
		var c = c > 28 ? c - 28 : c;
		d.css("height", c.toString() + "px");
	}
}
function ChooseSize() {
	var b = $(window.parent.document.body);
	var a = b.find("#CalculateResult").val();
	if (a && a != "") {
		var c = b.find(".selSize").find("ul");
		c.find("li").each(function () {
			var d = $.trim($(this).html());
			if (d == a) {
				$(this).click();
			}
		});
	}
}
function setSelectParValue() {
	$("select").each(function () {
		var b = $(this).find("option:selected").text();
		var a = $(this).attr("id");
		sizeCalObj[a] = b;
	});
}
function getSelectValue() {
	$("select").each(function () {
		var a = $(this).attr("id");
		var b = "\u5c3a";
		if (typeof (sizeCalObj[a]) != "undefined") {
			b = sizeCalObj[a];
		}
		$(this).find("option").each(function () {
			if ($(this).text() == b) {
				$(this).attr("selected", "selected");
				var c = $(this).val().split(",");
				if (c.length == 2) {
					$("#div_" + c[0]).removeClass("hide").addClass("show");
					$("#div_" + c[1]).removeClass("show").addClass("hide");
				}
			}
		});
	});
}
var feedbacktype = 0;
$(function () {
	var c = $("#styleinfo").attr("name");
	var b = 10;
	$(".hzcTitle li").click(function () {
		$(".hzcTitle li").removeClass();
		feedbacktype = $(this).index();
		if (feedbacktype == 0) {
			$(this).addClass("commonPL");
		} else {
			$(this).addClass("hzcHover");
			$(".hzcTitle li").eq(0).addClass("commonPL2");
		}
		a(1);
	});
	$("#pinglundetail").hover(function () {
		if ($(".zwsBoxPl").length > 0) {
			$(".zwsBoxPl").show();
		} else {
			var d = $("<div class='zwsBoxPl'><div class=\"zwscondiv\"><ul><div style='text-align:center; margin-top:20px;'><img src=\"//i.vanclimg.com/logo/loading.gif\" /></div></ul></div></div>");
			$("#pinglundetail").after(d);
			$.get(this.name, function (e) {
				d.remove();
				$("#pinglundetail").after($(e));
			});
		}
	}, function () {
		$(".zwsBoxPl").hide();
	});
	function a(e, d) {
		window.location.hash = "feedback";
		window.location = window.location;
		$(".NewCommentDetail").html("<div style='text-align:center; margin-top:20px;'><img src=\"//i.vanclimg.com/logo/loading.gif\" /></div>");
		var f = "";
		if (typeof (e) != "undefined") {
			f = "/styles/AjaxStyleAssesses.aspx?styleId=" + c + "&pageindex=" + e + "&type=" + feedbacktype + "&total=" + $("#feedbackcount" + feedbacktype).text();
		}
		if (typeof (d) != "undefined") {
			f = d.href + "&total=" + $("#feedbackcount" + feedbacktype).text();
		}
		$.get(f, function (g) {
			if ($.trim($("#comments", g).html()) == "") {
				g = "<div style='text-align:center;padding-top:10px;color:#999'>\u8fd8\u6ca1\u6709\u6700\u65b0\u7684\u6b64\u7c7b\u8bc4\u8bba\uff0c<a href='#' id='nocomment'><<\u8fd4\u56de\u5168\u90e8\u8bc4\u8bba</a></div>";
				$(".NewCommentDetail").html(g);
				$("#feedbackpagerarea").hide();
				return;
			}
			$(".NewCommentDetail").html($("#comments", g).html());
			$("#feedbackpagerarea").html($("#page", g).html());
			$("#feedbackpagerarea").show();
		});
	}
	$("#styleAssessesPager ul li a").live("click", function () {
		a(1, this);
		return false;
	});
	$("#nocomment").live("click", function () {
		$(".hzcTitle li:eq(0)").click();
		return false;
	});
});
$(function () {
	var c = $("#styleinfo").attr("name");
	var b = 5;
	$(".myAsk a").live("click", function () {
		var d = $(this);
		ajaxIsLogined(function () {
			if (!isLogined) {
				$.fn.alert("\u6b64\u64cd\u4f5c\u9700\u8981\u767b\u5f55\uff0c\u60a8\u73b0\u5728\u8981\u767b\u5f55\u5417\uff1f", function (e) {
					if (e) {
						location.href = "https://login.vancl.com/login/login.aspx?" + location.href;
					}
				}, {type:2});
			} else {
				$.fn.popwindow({href:d.attr("href"), width:"821px", height:"470px", title:"\u6211\u8981\u56de\u7b54"});
			}
		});
		return false;
	});
	function a(e, d) {
		window.location.hash = "quiz";
		window.location = window.location;
		var g = "";
		if (e != "undefined") {
			g = "styles/AjaxStyleQuestions.aspx?styleId=" + c + "&pageindex=" + e + "&orderType=" + $("#questionOrderType").val();
		}
		if (typeof (d) != "undefined") {
			g = d.href + "&orderType=" + $("#questionOrderType").val();
		}
		var f = $(".area3[name]").attr("name");
		if (f) {
			g = g + "&totalcount=" + f;
		}
		$("#stylequestionslist").html("<div style='text-align:center'><img src=\"//i.vanclimg.com/logo/loading.gif\" /></div>");
		$.get(g, function (h) {
			$("#stylequestionslist").html($("#quiz", h));
			$("#stylequestionsPager").html($("#page", h));
			$(".area3Con:odd").addClass("area3ConBg");
		});
	}
	$(".area3Con:odd").addClass("area3ConBg");
	$("#stylequestionsPager ul li a").live("click", function () {
		a(1, this);
		return false;
	});
	$("#questionOrderType").change(function () {
		a(1);
	});
	$(".sizeList table tr:first td").each(function (d) {
		$(this).addClass("col0" + (d + 1));
	});
});
$(function () {
	$(".showfile").live("click", function () {
		var a = $(this).closest(".plConr,.area3Con").find(".notesNewpl");
		a.find(".pl0727Hfk").remove();
		if (a.css("display") == "none") {
			$(this).closest(".root").find(".notesNewpl").hide();
		}
		if ($.trim(a.html()) == "") {
			$.ajax({url:$(this).attr("href"), dataType:"html"}).success(function (b) {
				a.html(b);
				a.toggle("normal");
			}).error(function (b) {
				$.fn.alert(b);
			});
		} else {
			a.toggle("normal");
		}
		if (!window.replyfunction) {
			$.getScript("http://jsy.vanclimg.com/item/reply.js?v=2");
		}
		return false;
	});
	$(".new-btn a, .new-btn").removeAttr("onclick").live("click", function () {
		var a = $(this).find("span");
		var b = $(this).attr("href");
		if (b == "") {
			$.fn.alert("\u60a8\u5df2\u7ecf\u6295\u8fc7\u7968\u4e86\u3002");
			return false;
		}
		ajaxIsLogined(function () {
			if (isLogined == false) {
				openLoginDiv("CommentVote('" + escape(escape(b)) + "')");
				return false;
			}
			CommentVote(b);
		});
		return false;
	});
});

