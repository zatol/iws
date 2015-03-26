
var vancl = window.vancl || {};
vancl.search = vancl.search || {};
vancl.search.scrollbar = (function () {
	var c = {container:"recommendscontainer", callback:function (m) {
	}};
	var k = false;
	var e = false;
	var a, h, b, f;
	var d = function () {
		a = $("#" + c.container);
		h = $(a).find(".scrollbar2");
		b = $(a).find(".controller");
		f = h.width() - b.width();
		b.mousedown(function (m) {
			$(this).css("cursor", "move");
			k = true;
		});
		h.hover(function () {
			e = true;
		}, function () {
			e = false;
		});
		h.click(function (m) {
			if (e && !k) {
				var o = m.pageX - h.offset().left - b.width() / 2;
				var n = 0;
				if (o <= 0) {
					n = 0;
				} else {
					if (o >= f) {
						n = 100;
					} else {
						n = parseInt(o / f * 100);
					}
				}
				vancl.search.scrollbar.scroll(n);
				c.callback(n);
			}
		});
		$(document).bind("mousemove", function (m) {
			if (!k) {
				return;
			}
			var n = 0;
			var o = m.pageX - h.offset().left - b.width() / 2;
			if (o <= 0) {
				b.css("margin-left", "0px");
			} else {
				if (o >= f) {
					b.css("margin-left", f + "px");
					n = 100;
				} else {
					b.css("margin-left", o + "px");
					n = parseInt(o / f * 100);
				}
			}
			c.callback(n);
		});
		$(document).mouseup(function () {
			b.css("cursor", "default");
			k = false;
		});
	};
	var l = function (m) {
		var n = m / 100 * f;
		b.animate({marginLeft:n + "px"}, "slow");
	};
	var g = function () {
		b.css("margin-left", "0px");
	};
	return {init:function (m) {
		$.extend(c, m);
		d();
	}, scroll:l, reset:g};
})();
$(window).load(function () {
	$(window).one("scroll", function () {
		var b = $("#recommend").html();
		if (b != null) {
			var a = $("#recommend").val().split(",");
			vancl.search.recommends.init({viewName:a[0], flag:a[1], totalRecords:1, urlrewriters:[], getProductsServiceUrl:"/common/getbrowsedproducts?callback=?"});
		}
	});
});
var vancl = window.vancl || {};
vancl.search = vancl.search || {};
vancl.search.recommends = (function () {
	var g = {viewName:"channel", flag:"HM", container:"recommendscontainer", productsServiceUrl:"http://app-recm.vancl.com/RecmService/GetProductByPosition?jsoncallback=?", getProductsServiceUrl:"/common/getproducts?callback=?", totalRecords:0, urlrewriters:[]};
	var n = [];
	var e = 0;
	var m = 0;
	var p = 0;
	var l = function () {
		var q = 0;
		var r = g.productsServiceUrl;
		if (g.totalRecords == 0) {
			q = 80;
		} else {
			q = 20;
			h(r, q);
		}
	};
	var h = function (r, q) {
		$.ajax({url:g.getProductsServiceUrl, dataType:"json", success:function (s) {
			if (s == "[]" || s.length == 0) {
				k(s, r, q, false);
			} else {
				k(s, r, q, true);
			}
		}, error:function (s) {
			k(s, r, q, false);
		}});
	};
	var k = function (q, u, t, r) {
		var v = "";
		if (q != undefined && q.length > 0) {
			for (i = 0; i < q.length; i++) {
				v += q[i].ProductCode + ",";
			}
		}
		var s = "[{Rows:\"" + (t + 5) + "\",ExtraField:\"ListImage\"";
		if (r) {
			s += ",Remark:\"NeedExclude\",ProductCodes:\"" + v.split(",").slice(0, 3) + "\",Position:\"rp_channel_browse\"";
		} else {
			s += ",Remark:\"NeedExclude\",Position:\"rp_channel_hot\"";
		}
		s += "}]";
		$.getJSON(u, {strJson:s}, function (w) {
			if (w.Success) {
				a(w.Title, w.Items.slice(0, t), 1, t / 5, r);
				b(q);
			}
		});
	};
	var a = function (x, w, u, v, s) {
		n = w;
		var r = "";
		var t = false;
		var q = "r-ch_" + g.viewName + "-wht-";
		var y = "r-ch_" + g.viewName + "-b_frb-";
		if (s == false) {
			r += "<div class=\"tuijian2 clearfix\">";
			r += "<div class=\"title2 pad82\"><p>" + x + "</p></div>";
			r += "<div class=\"scroll22\">";
			r += "<span class=\"blank15\"></span>";
			r += "<div class=\"bt_left2\"><div id=\"leftButton\" class=\"bt_left2div\">left</div></div>";
			r += "<div class=\"newProductArea content\" style=\"width:925px;float:left;\">";
			r += "<div class=\"newProductList33\" style=\"width:925px;overflow:hidden;\">";
			r += "<div id=\"slider\" style=\"width:3800px;\">";
			r += "<ul>";
			r += d(u, v, q);
			r += "</ul>";
			r += "</div>";
			r += "</div>";
			r += "</div>";
			r += "<div class=\"bt_right2\" style=\"float:right;\"><div id=\"rightButton\" class=\"bt_right2div\">right</div></div>";
			r += "<span class=\"blank15\"></span>";
			r += "<div class=\"bar2 scrollbar2\">";
			r += "<strong class=\"controller\">bar</strong>";
			r += "</div>";
			r += "<span class=\"blank15\"></span>";
			r += "</div>";
			r += "</div>";
			t = true;
			m = Math.floor(n.length / 5);
			p = 925;
		} else {
			r += "<div class=\"tuijian2 clearfix\">";
			r += "<div class=\"title2\">\u6839\u636e\u60a8\u7684\u6d4f\u89c8\u8bb0\u5f55\u4e3a\u60a8\u63a8\u8350</div>";
			r += "<div class=\"zuijin2\" id=\"historyItems\">";
			r += "</div>";
			r += "<div class=\"scroll2\">";
			r += "<h3>" + x + ":</h3>";
			r += "<div class=\"bt_left2\"><div id=\"leftButton\" class=\"bt_left2div\">left</div></div>";
			r += "<div class=\"newProductArea content\" style=\"width:728px;float:left;\">";
			r += "<div class=\"newProductList3\" style=\"width:728px;overflow:hidden;\">";
			r += "<div id=\"slider\" style=\"width:3640px;\">";
			r += "<ul>";
			r += d(u, v, y);
			r += "</ul>";
			r += "</div>";
			r += "</div>";
			r += "</div>";
			r += "<div class=\"bt_right2\" style=\"float:right;\"><div id=\"rightButton\" class=\"bt_right2div\">right</div></div>";
			r += "<span class=\"blank15\"></span>";
			r += "<div class=\"bar2 scrollbar2\">";
			r += "<strong class=\"controller\">bar</strong>";
			r += "</div>";
			r += "<span class=\"blank15\"></span>";
			r += "</div>";
			r += "</div>";
			t = true;
			m = Math.floor(n.length / 4);
			p = 728;
		}
		$("#" + g.container).html(r);
		if (t) {
			$(function () {
				$("#leftButton").click(function () {
					if (e == 0) {
						e = -1 * (m - 1) * p;
					} else {
						if (e + p <= 0) {
							e += p;
						} else {
							e = 0;
						}
					}
					$("#slider").css("margin-left", e + "px");
					var z = Math.abs(e) / ((m - 1) * p) * 100;
					vancl.search.scrollbar.scroll(z);
				});
				$("#rightButton").click(function () {
					if (e == -1 * (m - 1) * p) {
						e = 0;
					} else {
						if (e - p > -1 * ((m - 1) * p)) {
							e -= p;
						} else {
							e = -1 * ((m - 1) * p);
						}
					}
					$("#slider").css("margin-left", e + "px");
					var z = Math.abs(e) / ((m - 1) * p) * 100;
					vancl.search.scrollbar.scroll(z);
				});
				$("#leftButton").hover(function () {
					$(this).addClass("bt_left2hover");
				}, function () {
					$(this).removeClass("bt_left2hover");
				});
				$("#rightButton").hover(function () {
					$(this).addClass("bt_right2hover");
				}, function () {
					$(this).removeClass("bt_right2hover");
				});
				vancl.search.scrollbar.init({callback:function (A) {
					var z = -1 * (m - 1) * p;
					e = z * (A / 100);
					$("#slider").css({marginLeft:e + "px"});
				}});
			});
		}
	};
	var b = function (t) {
		var q = "<h2>\u6211\u6700\u8fd1\u7684\u6d4f\u89c8\u8bb0\u5f55</h2>";
		q += "<div class=\"seen_product2\">";
		for (i = 0; i < t.length; i++) {
			var r = t[i];
			var s = r.ProductName;
			s = f(s, 16);
			var u = "r-ch_" + g.viewName + "-b_rbs-" + (i + 1) + "-" + r.ProductCode;
			q += "<dl class=\"clearfix\">";
			q += "<dt><a href=\"" + r.ProductUrl + "\" title=\"" + r.ProductName + "\" target=\"_blank\" class=\"track\" name=\"" + u + "\"><img width=\"68\" height=\"68\" src=\"" + r.SmallPhoto + "\" /></a></dt>";
			q += "<dd><a href=\"" + r.ProductUrl + "\" title=\"" + r.ProductName + "\"  target=\"_blank\" class=\"track\" name=\"" + u + "\">" + s + "</a></dd>";
			q += "<p>\uffe5" + (parseFloat(r.SPrice) < parseFloat(r.Price) ? r.SPrice : r.Price) + "</p>";
			q += "</dl>";
		}
		q += "</div>";
		$("#historyItems").html(q);
	};
	var d = function (s, t, y) {
		var q = "";
		var x = "";
		for (i = 0; i < n.length; i++) {
			var u = n[i];
			if (typeof (u) == "undefined") {
				continue;
			}
			var v = u.ProductCode;
			for (j = 0; j < g.urlrewriters.length; j++) {
				var A = g.urlrewriters[j];
				if (A.productcode == v) {
					v = A.rewritecode;
				}
			}
			var z = u.Ref.replace("%", g.viewName) + "-" + v;
			var w = "http://item.vancl.com/" + v + ".html";
			var r = generateImageDomain(u.ProductCode) + "/product/" + u.ProductCode.substr(0, 1) + "/" + u.ProductCode.substr(1, 1) + "/" + u.ProductCode.substr(2, 1) + "/" + u.ProductCode + "/lists170/" + u.ListImage;
			q += "<li>";
			q += "<h2><a href=\"" + w + "\"  target=\"_blank\" class=\"track\" name=\"" + z + "\"><img src=\"" + r + "\" /></a></h2>";
			q += "<span class=\"blank15\"></span>";
			q += "<h4><a href=\"" + w + "\"  target=\"_blank\" class=\"track\" name=\"" + z + "\">" + u.ProductName + "</a></h4>";
			q += "<span class=\"blank5\"></span>";
			q += "<p class=\"productPrice2\"><span class=\"scPrice2\">\u5e02\u573a\u4ef7\uffe5<del>" + Math.ceil(new Number(u.MarketPrice)) + "</del></span><span class=\"salePrice\"><strong>\u552e\u4ef7\uffe5" + (new Number(u.Price)).toFixed(2) + "</strong></span></p>";
			q += "</li>";
		}
		return q;
	};
	var c = function (r, s, u, t) {
		var q = "";
		q += "<div class=\"goodspagediv\" id=\"recommendpager\">";
		for (i = 1; i <= u; i++) {
			q += "<a href=\"javascript:vancl.search.recommends.recommendPagerClick(" + i + "," + s + ",'" + t + "')\"";
			if (i == r) {
				q += " class=\"goodspageindex\" style=\"color:#fff\"";
			}
			q += ">" + i + "</a>";
		}
		q += "</div>";
		return q;
	};
	var o = function (q, r, s) {
		currentIndex = q;
		$("#recommendpager a").each(function (t, u) {
			if ($(u).html() != q) {
				$(u).removeClass("goodspageindex");
				$(u).css("color", "");
			} else {
				$(u).addClass("goodspageindex");
				$(u).css("color", "#fff");
			}
		});
		$("#recommendItems").html(constructRecommendItems(q, r, s));
		if (g.totalRecords == 0) {
			window.location.hash = "recommendscontainer";
		}
	};
	function f(r, q) {
		var s = r;
		if (s.length > q) {
			s = s.substr(0, q);
		}
		return s;
	}
	return {init:function (q) {
		$.extend(g, q);
		l();
	}, recommendPagerClick:function (q, r, s) {
		o(q, r, s);
	}};
})();
jQuery.fn.LoadImage = function (d, f, b, e, c, a) {
	e == "" ? e = "\u52a0\u8f7d\u4e2d..." : e;
	return this.each(function () {
		var k = $(this);
		var m = $(this).attr("src");
		var h = new Image();
		h.src = m;
		var g = function () {
			if (d) {
				if (h.width > 0 && h.height > 0) {
					if (h.width / h.height >= f / b) {
						if (h.width > f) {
							k.width(f);
							k.height((h.height * f) / h.width);
						} else {
							k.width(h.width);
							k.height(h.height);
						}
					} else {
						if (h.height > b) {
							k.height(b);
							k.width((h.width * b) / h.height);
						} else {
							k.width(h.width);
							k.height(h.height);
						}
					}
				}
			}
		};
		if (h.complete) {
			g();
			if (c) {
				c();
			}
			return;
		}
		$(this).attr("src", "");
		var l = $("<div>" + e + "</div>");
		k.hide();
		k.after(l);
		$(h).load(function () {
			g();
			l.remove();
			k.attr("src", this.src);
			k.show();
			if (c) {
				c();
			}
		});
		$(h).error(function () {
			l.remove();
			k.show();
			if (a) {
				a();
			}
		});
	});
};
var PAGELAB_PATTERN = /^(PageLab_PLE[0-9]{4})=([^;]*)$/;
$(document).ready(function () {
	$(document.body).mousedown(function (a) {
		a = a ? a.target : window.event.srcElement;
		if (a.className.toUpperCase().indexOf("TRACK") > -1) {
			trackurl(a.name);
		} else {
			var b = a.parentNode;
			if (b.className.toUpperCase().indexOf("TRACK") > -1) {
				trackurl(b.name);
			}
		}
	});
});
function trackurl(a) {
	if (a == null || a == "") {
		return;
	}
	var c = [];
	var b = getGatherCookie();
	c.push(document.location.protocol);
	c.push("//vamr.vancl.com/track.aspx?ref=");
	c.push(escape(window.document.referrer));
	c.push("&areaid=");
	c.push(a);
	if (b != "") {
		c.push("&gather_cookies=" + b);
	}
	var d = c.join("");
	$("#weblog_track").remove();
	$("body").append("<img id=\"weblog_track\" src=" + d + " style=\"display:none;\"/>");
}
function getGatherCookie() {
	var b = "";
	var c = document.cookie.split(";");
	for (var a = 0; a < c.length; a++) {
		if (PAGELAB_PATTERN.test(trim(c[a]))) {
			b += trim(c[a].split("=")[1]) + ",";
		}
	}
	b = (b.length > 0) ? b.substr(0, b.length - 1) : "";
	return b;
}
function trim(c) {
	for (var a = 0; a < c.length && c.charAt(a) == " "; a++) {
	}
	for (var b = c.length; b > 0 && c.charAt(b - 1) == " "; b--) {
	}
	if (a > b) {
		return "";
	}
	return c.substring(a, b);
}
$(function () {
	var d = document.location.hash;
	if (document.all && d.length > -1 && document.title.split("#").length > 1) {
		document.title = document.title.split("#")[0];
	}
	var e = d.indexOf("@");
	if (e > -1) {
		document.location.hash = d.substr(e + 1);
	}
	if (d.substr(0, 5) == "#ref=") {
		var a = d.length;
		if (e > -1) {
			a = e;
		}
		var b = c();
		b.ref = d.substring(5, a);
	}
	function c() {
		window.VANCL = window.VANCL || {};
		window.VANCL.Global = window.VANCL.Global || {};
		return window.VANCL.Global;
	}
	$("body").mousedown(function (f) {
		function n(t) {
			var r = c();
			var s = r.hasOwnProperty("ref") ? r.ref : null;
			return t.attr("location") == undefined ? s : t.attr("location");
		}
		function q(s, u) {
			var v = n(u);
			if (k(v) == true) {
				return k(s) ? null : s;
			}
			if (s == "") {
				return v;
			}
			var t = s + "|" + v;
			var r = t.split("|");
			if (r.length > 1 && r[0] == r[1]) {
				return v;
			}
			if (r.length >= 10) {
				r.splice(8, r.length - 9);
			}
			return r.join("|");
		}
		function k(r) {
			return r == undefined || r == "";
		}
		function l(s) {
			var r = s.attr("href");
			if (k(r) == true) {
				return null;
			}
			r = r.replace(" ", "");
			if (r.indexOf("javascript") > -1) {
				return null;
			}
			if (r.indexOf("#") > -1 && s.attr("target") == undefined) {
				return null;
			}
			return r;
		}
		function g(r) {
			if (r == undefined) {
				return false;
			}
			if (r == "") {
				return true;
			}
			if (r.indexOf("_") == -1 && r.indexOf("-") == -1) {
				return false;
			}
			return true;
		}
		function m(u, x) {
			var r = "";
			var s = u.lastIndexOf("#");
			var w = u;
			if (s > -1) {
				w = u.substr(0, s);
				var t = u.indexOf("@");
				if (t == -1) {
					t = s;
				}
				r = "@" + u.substr(t + 1);
			}
			if (u.indexOf("vjia.com") == -1) {
				return w + "#ref=" + x + r;
			} else {
				if (u.indexOf(x) > -1) {
					return u;
				}
				var v = u.indexOf("?") == -1 ? "?" : "&";
				return w + v + "ref=" + x;
			}
		}
		var p = $(f.target).closest("a");
		if (p.length == 0) {
			return;
		}
		var o = p.attr("rel");
		var h = l(p);
		if (h == null) {
			return;
		}
		if (k(o) && p.hasClass("track")) {
			o = p.attr("name");
		}
		if (g(o) == false) {
			return;
		}
		o = q(o, p);
		if (o) {
			//p.attr("href", m(h, o));
			p.attr("href", h);
		}
	});
});
function setLoginInfo() {
	if (hasLogin()) {
		$(window).load(setWelcome);
	}
}
function hasLogin() {
	return getCookie("UserLogin") != "";
}
function setWelcome() {
	var a = getCookie("UserLogin");
	if (a != "") {
		jQuery.getScript("http://my.vancl.com/user/getusernamebycookie", function () {
			getUserName = getUserName.sub(10);
			jQuery("#welcome").html("\u60a8\u597d, <a href='http://my.vancl.com' class='top track' name='head-denglu' style='color: rgb(51, 51, 51);'>" + getUserName + "</a> <span style='color: #a10000'><a class='top track' style='color: #a10000'  href='https://login.vancl.com/Login/UserLoginOut.aspx' target='_parent' name='head-tcdl' >\u9000\u51fa\u767b\u5f55</a>&nbsp;|&nbsp;<a class='track' name='head-ghyh' href=\"javascript:location.href='https://login.vancl.com/login/login.aspx?'+location.href\" style='color: #a10000'>\u66f4\u6362\u7528\u6237</a></span>");
		});
	}
}
String.prototype.sub = function (c) {
	var d = /[^\x00-\xff]/g;
	if (this.replace(d, "mm").length <= c) {
		return this;
	}
	var b = Math.floor(c / 2);
	for (var a = b; a < this.length; a++) {
		if (this.substr(0, a).replace(d, "mm").length >= c) {
			return this.substr(0, a) + "...";
		}
	}
	return this;
};
function setShoppingCar() {
	return;
}
function GetPrizeCout() {
	var k = 0;
	var d = getCookie("noLargessSelected");
	var h = getCookie("MustHasSKU");
	if (d != "undefined" && d != "") {
		var e = d.split("@");
		for (var a = 0; a < e.length; a++) {
			var c = e[a].split("$");
			if (c.length > 1) {
				var g = c[1].split(",");
				for (var b = 0; b < g.length; b++) {
					var f = g[b].split("|");
					k += parseInt(f[1]);
				}
			}
		}
	}
	if (h != "undefined" && h != "") {
		var e = h.split("@");
		for (var a = 0; a < e.length; a++) {
			var c = e[a].split("$");
			if (c.length > 1) {
				var g = c[1].split(",");
				for (var b = 0; b < g.length; b++) {
					k += 1;
				}
			}
		}
	}
	return k;
}
function getShoppingCookie(a, b) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(a + "=");
		if (c_start != -1) {
			c_start = c_start + a.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			value = document.cookie.substring(c_start, c_end);
			return b ? unescape(value) : value;
		}
	}
	return "";
}
function setShoppingCookie(a, d, c, b) {
	document.cookie = a + "=" + (b ? escape(d) : d) + ((c == null) ? ";" : ";expires=" + c + ";") + "path=/;domain=.vancl.com;";
}
function getCookie(b) {
	var a = "";
	var c = b + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(c);
		if (offset != -1) {
			offset += c.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) {
				end = document.cookie.length;
			}
			a = unescape(document.cookie.substring(offset, end));
		}
	}
	return a;
}
function setCookie(a, b, d) {
	var e = "";
	var c = 1;
	if (d != null) {
		c = d;
	}
	e = new Date((new Date()).getTime() + c * 86400000);
	e = "; expires=" + e.toGMTString();
	document.cookie = a + "=" + escape(b) + ";path=/" + e;
}
function delCookie(a) {
	var b = "";
	b = new Date((new Date()).getTime() - 1);
	b = "; expires=" + b.toGMTString();
	document.cookie = a + "=" + escape("") + ";path=/" + b;
}
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-18007458-1"]);
_gaq.push(["_addOrganic", "baidu", "word"]);
_gaq.push(["_addOrganic", "soso", "w"]);
_gaq.push(["_addOrganic", "youdao", "q"]);
_gaq.push(["_addOrganic", "sogou", "query"]);
_gaq.push(["_setDomainName", ".vancl.com "]);
_gaq.push(["_setAllowHash", false]);
_gaq.push(["_trackPageview"]);
_gaq.push(["_trackPageLoadTime"]);
$(window).load(function () {
	$.ajax({type:"GET", url:("https:" == document.location.protocol ? "https://" : "http://") + "stats.g.doubleclick.net/dc.js", dataType:"script", cache:true});
});
function ClickSourceVancl() {
}
ClickSourceVancl.prototype.url = location.href;
ClickSourceVancl.prototype.refUrl = document.referrer;
ClickSourceVancl.prototype.clickwwwname = "http://click.vancl.com/";
ClickSourceVancl.prototype.redirect = function (b) {
	var a = document.createElement("script");
	a.src = b;
	var c = document.getElementsByTagName("script")[0];
	c.parentNode.insertBefore(a, c);
};
ClickSourceVancl.prototype.get_param = function (d) {
	var f = location.search.substring(1) || location.hash.substring(1);
	var c = f.split("&");
	for (var b = 0; b < c.length; b++) {
		var e = c[b].indexOf("=");
		if (e == -1) {
			continue;
		}
		var a = c[b].substring(0, e);
		if (a.toLowerCase() == d.toLowerCase()) {
			var g = c[b].substring(e + 1);
			g = decodeURIComponent(g);
			return g;
		}
	}
	return null;
};
ClickSourceVancl.prototype.getHost = function (d) {
	var a = "";
	if (typeof d == "undefined" || d == null) {
		return a;
	}
	var c = /.*\:\/\/([^\/]*).*/;
	var b = d.match(c);
	if (typeof b != "undefined" && b != null) {
		a = b[1];
	}
	return a;
};
ClickSourceVancl.prototype.getCookie = function (b) {
	var a = "";
	var c = b + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(c);
		if (offset != -1) {
			offset += c.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) {
				end = document.cookie.length;
			}
			a = unescape(document.cookie.substring(offset, end));
		}
	}
	return a;
};
ClickSourceVancl.prototype.setCookie = function (a, b, d) {
	var e = "";
	var c = 1;
	if (d != null) {
		c = d;
	}
	e = new Date((new Date()).getTime() + c * 86400000);
	e = "; expires=" + e.toGMTString();
	document.cookie = a + "=" + escape(b) + ";domain=vancl.com;path=/" + e;
};
ClickSourceVancl.prototype.excuteFunction = function (a) {
	try {
		if (window.location.host.indexOf("vancl.com") < 0) {
			return;
		}
		try {
			if (window.top == window) {
				a.setCookie("union_frame", "0", 1);
			} else {
				a.setCookie("union_frame", "1", 1);
			}
		}
		catch (b) {
			a.setCookie("union_frame", "1", 1);
		}
		if (window.document.referrer && window.document.referrer.indexOf("soso.com") >= 0) {
			VanclUnionClick();
			return;
		}
		var l = a.get_param("source");
		if (l != null && l != "") {
			var m = a.get_param("sourcesuninfo");
			if (m == null) {
				m = "";
			}
			if (m == "") {
				var g = a.get_param("psId");
				if (g != null && g != "") {
					m = "ad-0-1-" + g + "-0";
				}
				var n = a.get_param("srcId");
				if (n != null && n != "") {
					m = "ad-0-3-0" + n + "-1";
				}
			}
			var p = a.getCookie("union_visited");
			var d;
			if (p == "1") {
				d = 0;
			} else {
				a.setCookie("union_visited", "1", 1);
				d = 1;
			}
			var c = a.clickwwwname + "websource/websource.aspx?source=" + l + "&sourceInfo=" + m + "&referer=" + encodeURIComponent(a.refUrl) + "&hrefurl=" + encodeURIComponent(a.url) + "&isnew=" + d;
			a.redirect(c);
		} else {
			var h = a.refUrl;
			if (h != null && h != "") {
				if (a.getHost(h).indexOf("vancl.com") < 0 && a.getHost(h).indexOf("vanclimg.com") < 0) {
					var p = a.getCookie("union_visited");
					var d;
					if (p == "1") {
						d = 0;
					} else {
						a.setCookie("union_visited", "1", 1);
						d = 1;
					}
					var f = a.clickwwwname + "websource/websourceurl.aspx?SourceUrl=" + encodeURIComponent(h) + "&hrefurl=" + encodeURIComponent(a.url) + "&isnew=" + d;
					a.redirect(f);
				} else {
					var o = a.getCookie("WebSourceTemp");
					if (o != "") {
						var k = a.clickwwwname + "websource/websource.aspx";
						a.redirect(k);
					}
				}
			}
		}
	}
	catch (b) {
	}
};
var clickSourceVanclObj = new ClickSourceVancl();
clickSourceVanclObj.excuteFunction(clickSourceVanclObj);
function VanclUnionClick() {
	var b = location.href;
	var c = document.referrer;
	var d = document.createElement("script");
	d.src = "http://click.vancl.com/Default.aspx?landingPage=" + encodeURIComponent(b) + "&referrer=" + encodeURIComponent(c);
	d.language = "javascript";
	d.type = "text/javascript";
	var a = document.getElementsByTagName("head")[0];
	a.appendChild(d);
}
function generateImageDomain(f) {
	var b = ["http://p1.vanclimg.com", "http://p2.vanclimg.com", "http://p3.vanclimg.com", "http://p4.vanclimg.com", "http://p5.vanclimg.com"], g = 0, e = b.length, a = 0;
	if (typeof f === "undefined") {
		return b[0];
	}
	a = f.length;
	while (a--) {
		g += f.charCodeAt(a);
	}
	return b[g % e];
}
try {
	$(window).load(function () {
		var a = [];
		a.push("<div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"//googlea");
		a.push("ds.g.dou");
		a.push("blecl");
		a.push("ick.net/pagea");
		a.push("d/viewthroughconversion/1045274787/?value=0&amp;label=qoSlCMXYzwIQo8G28gM&amp;guid=ON&amp;script=0\"/></div>");
		$("body").append(a.join(""));
	});
}
catch (err) {
}
var vancl = window.vancl || {};
vancl.channel = vancl.channel || {};
vancl.channel.productpop = (function () {
	var e = function (A) {
		var z = "<div align=\"center\" class=\"jJ\" style=\"position: relative;width:270px;margin:0 auto;\">";
		if (h.showzoom) {
			z += "<a href=\"" + A.imgbigurl + "\" class=\"jqzoom\" >";
		}
		z += "<img id=\"" + h.popupimageid + "\" src=\"" + A.mainpath + "\" style=\"width:270px;height:270px;\" />";
		if (h.showzoom) {
			z += "</a>";
		}
		z += "</div>";
		z += "<div class=\"sd\">" + A.productname.substr(0, 40) + "</div>";
		z += "<p class=\"jJ01\">\u4ea7\u54c1\u7f16\u53f7\uff1a" + A.productcode + "</p>";
		z += "<p class=\"jJ02\"><strong>";
		if (typeof (A.point) != "undefined") {
			z += "\u79ef\u5206\u6362\u8d2d\u4ef7\uff1a\uffe5" + A.pointprice + "+" + A.points;
		} else {
			if (t) {
				if (A.isduanma === "1") {
					z += "\u65ad\u7801\u4ef7\uff1a\uffe5" + A.sprice;
				} else {
					switch (A.salesflag) {
					  case "1":
						z += "\u7279\u60e0\u4ef7\uff1a\uffe5" + A.sprice;
						break;
					  case "2":
						z += "\u62a2\u8d2d\u4ef7\uff1a\uffe5" + A.sprice;
						break;
					  case "3":
						z += "\u6e05\u4ed3\u4ef7\uff1a\uffe5" + A.sprice;
						break;
					  default:
						z += "\u552e\u4ef7\uff1a\uffe5" + A.price;
					}
				}
			} else {
				switch (A.SalesFlag) {
				  case "1":
					z += "\u7279\u60e0\u4ef7\uff1a\uffe5";
					break;
				  case "2":
					z += "\u62a2\u8d2d\u4ef7\uff1a\uffe5";
					break;
				  case "3":
					z += "\u6e05\u4ed3\u4ef7\uff1a\uffe5";
					break;
				  default:
					z += "\u552e\u4ef7\uff1a\uffe5";
				}
				z += A.realprice;
			}
		}
		z += "</strong></p>";
		z += "<p class=\"jJ03\">\u5e02\u573a\u4ef7\uff1a<del>\uffe5" + A.vprice + "</del> <span>";
		if (t) {
			if (A.sprice != A.price) {
				z += "\u552e\u4ef7\uff1a\uffe5" + A.price;
			}
		}
		z += "</span></p>";
		z += "<p class=\"jJ04\">\u7528\u6237\u7efc\u5408\u8bc4\u5206\uff1a" + f(A.colligation) + "\u5171\u6709 <strong>" + A.commentcount + "</strong> \u6761\u8bc4\u8bba</p>";
		return z;
	};
	var h = {services:"/common/productpop", container:"body", elementcontainerid:"popup", arrowiconid:"arrowicon", elements:"", property:"pop", popupimageid:"popupimage", showzoom:false, delayhide:false, htmlConstruct:e};
	var y = {services:"http://vanclsearch.vjia.com/search.ashx?callback=?"};
	var u = 0;
	var x = 0;
	var q = 0;
	var c = [];
	var r = false;
	var t = true;
	var s = function () {
		if ($("#" + h.arrowiconid).length <= 0) {
			$(h.container).append("<div id=\"" + h.arrowiconid + "\" class=\"ico\" style=\"display:none;z-index:102\"></div>");
		}
		if ($("#" + h.elementcontainerid).length <= 0) {
			$(h.container).append("<div id=\"" + h.elementcontainerid + "\" style=\"position:absolute;z-index:101\"></div>");
		}
		$("#" + h.elementcontainerid).hover(function () {
			r = true;
		}, function () {
			r = false;
			k();
		});
		b();
	};
	var b = function (z) {
		if (!z) {
			z = document;
		}
		$(h.elements + "[" + h.property + "]", z).bind("mouseover", function () {
			var A = $(this);
			var B = A.attr(h.property);
			r = true;
			l(B, A);
		}).bind("mouseout", function () {
			r = false;
			k();
		});
	};
	var m = function (z) {
		if (!z) {
			z = document;
		}
		$(h.elements + "[" + h.property + "]", z).unbind();
	};
	var d = function () {
		c = [];
	};
	var l = function (A, z) {
		var B = ++u;
		q++;
		window.setTimeout(function () {
			w(A, B, z);
		}, 100);
	};
	var w = function (C, D, B) {
		if (D != u) {
			return false;
		}
		var z = undefined;
		if (typeof (c) != "undefined") {
			for (var A = 0; A < c.length; A++) {
				if (c[A].productcode == C) {
					z = c[A];
					break;
				}
			}
		}
		if (typeof (z) == "undefined") {
			if (C.substr(0, 1) != "v") {
				t = true;
				$.getJSON(h.services, {productcode:C}, function (F) {
					if (typeof (F) != "undefined" && F != null) {
						c.push(F);
						if (r) {
							v(F, B);
						}
					}
				});
			} else {
				t = false;
				var E = C.substr(1);
				$.getJSON(y.services, {productcode:E, start:0, rows:1}, function (G) {
					if (typeof (G) != "undefined" && G != null) {
						if (G.response.docs[0] == false) {
							return;
						}
						var F = g(G);
						c.push(F);
						if (r) {
							v(F, B);
						}
					}
				});
			}
		} else {
			v(z, B);
		}
	};
	var v = function (B, C) {
		var A = $("#" + h.elementcontainerid);
		var z = $("#" + h.arrowiconid);
		A.attr("class", "fc02");
		A.html("<div style=\"text-align:center;margin-top:50%;\"><img src=\"http://i.vanclimg.com/logo/loading.gif\"/></div>");
		a(B, C);
		A.show();
		z.show();
		var D = ++x;
		$("<img src=\"" + B.mainpath + "\">").load(function () {
			if (x != D || !r) {
				A.hide();
				z.hide();
				return;
			}
			var E = new Image();
			E.src = B.mainpath;
			if (E.width == "570") {
				$("#" + h.elementcontainerid).attr("class", "fc");
			} else {
				$("#" + h.elementcontainerid).attr("class", "fc02");
			}
			A.html(h.htmlConstruct(B, h));
			if (h.showzoom) {
				$(".jqzoom").jqzoom({zoomType:"innerzoom", title:"", preloadImages:false, alwaysOn:false});
			}
			a(B, C);
		});
	};
	var a = function (K, L) {
		var D = L;
		if (typeof (D) == "undefined") {
			D = $(h.elements + "[" + h.property + "=" + K.productcode + "]");
		}
		var O = 50;
		var z = $("#" + h.arrowiconid);
		var B = z.width();
		var A = z.height();
		var G = $("#" + h.elementcontainerid);
		var J = G.width();
		var H = G.height();
		var E = n(D);
		var F = o(D);
		var M = o(L);
		var N = document.documentElement.scrollTop + document.body.scrollTop;
		var I = $(window).height() - (M - N) - H;
		if (I < 0) {
			I = M + F - 10;
			if (I < 0) {
				I = scrollTop;
			}
		} else {
			if (M < N) {
				I = N;
			} else {
				if (H > 90) {
					I = M - N < 30 ? N : M - 30;
				} else {
					I = M;
				}
			}
		}
		G.css("top", I);
		G.css("left", E + D.width() + B);
		if (parseInt(G.css("left")) > $("body").width() - (J + O)) {
			G.css("left", E - J - B);
			z.css("left", E - B);
			z.css("background-position", "0 -25px");
		} else {
			z.css("background-position", "0 0");
			z.css("left", E + D.width() + 1);
		}
		if (M < N) {
			M = N;
		} else {
			if (M + $(L).height() > N + $(window).height()) {
				M = M;
			} else {
				M = M + $(L).height() * 0.25;
			}
		}
		z.css("top", M);
		var C = I + H - ($(window).height() + N);
		if (C > 0) {
			if ($(window).height() + N - M > 30) {
				C += 5;
			}
			G.css("top", I - C);
		}
	};
	var n = function (z) {
		var A = 0;
		if (z.length > 0) {
			object = z[0];
			do {
				A += object.offsetLeft;
				object = object.offsetParent;
			} while (!(object == null || object.tagName == "BODY"));
		}
		return A;
	};
	var o = function (z) {
		var A = 0;
		if (z.length > 0) {
			object = z[0];
			do {
				A += object.offsetTop;
				object = object.offsetParent;
			} while (!(object == null || object.tagName == "BODY"));
		}
		return A;
	};
	var g = function (B) {
		var A = B.response.docs[0];
		var z = {};
		z.imgbigurl = A.photodomain + A.photourl.replace("mid", "big");
		z.mainpath = A.photodomain + A.photourl;
		z.productname = A.productname;
		z.productcode = A.productcode;
		z.SalesFlag = A.salesflag;
		var C = A.price;
		if (A.sprice < A.price) {
			C = A.sprice;
		}
		z.realprice = C;
		z.vprice = A.vprice;
		z.colligation = A.userrating;
		z.commentcount = A.assesscount;
		return z;
	};
	var f = function (B) {
		var z = "";
		for (var A = 1; A < 6; A++) {
			if (B >= 1) {
				B -= 1;
				z += "<span class=\"s_s1\"></span>";
			} else {
				if (B > 0) {
					B = 0;
					z += "<span class=\"s_s05\"></span>";
				} else {
					z += "<span class=\"s_s0\"></span>";
				}
			}
		}
		return z;
	};
	var k = function () {
		var z = ++q;
		x++;
		if (h.delayhide) {
			window.setTimeout(function () {
				p(z);
			}, 200);
		} else {
			p(z);
		}
	};
	var p = function (z) {
		if ((z != q) || r) {
			return false;
		}
		$("#" + h.arrowiconid).hide();
		$("#" + h.elementcontainerid).hide();
	};
	return {init:function (z) {
		$.extend(h, z);
		s();
	}, load:function (z) {
		b(z);
	}, unload:function (z) {
		d();
		m(z);
	}};
})();
$(function () {
	var b = function () {
		return $(window).scrollTop() + $(window).height() - 29;
	};
	var c = false;
	if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
		c = true;
	}
	var a = $("<div style=\"right:85px;POSITION: absolute;z-index:9999\"><a href=\"#\"><div style=\"cursor: pointer;background-image:url(//i4.vanclimg.com/others/2012/4/25/gotop2.png);background-color:transparent;background-repeat:no-repeat;width:34px;height:24px\"></div></a></div>").hide();
	var d = function () {
		if ($(window).scrollTop() == 0) {
			a.fadeOut();
		} else {
			a.fadeIn();
			if (c) {
				a.css({top:b()});
			}
		}
	};
	if (!c) {
		a.css({position:"fixed", bottom:5});
	} else {
		if ($(window).scrollTop() > 0) {
			a.css({top:b()}).show();
		}
		$(window).resize(d);
	}
	$(window).scroll(d);
	$("body").prepend(a);
});

