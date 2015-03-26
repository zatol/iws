
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
$(function () {
	$("body").mousedown(function (a) {
		function g() {
			var o = document.location.href;
			if (o.indexOf("source=") > -1) {
				var m = o.indexOf("source=");
				var n = o.substring(m + 7, o.length);
				if (n == "") {
					return null;
				}
				if (n.indexOf("&") > -1) {
					n = n.substring(0, n.indexOf("&"));
				}
				return n;
			}
			return null;
		}
		function k(n) {
			var p = g();
			if (p == null) {
				return n;
			}
			var o = n + "|" + p;
			var m = o.split("|");
			if (m.length > 1 && m[0] == m[1]) {
				return p;
			}
			if (m.length >= 10) {
				m.splice(8, m.length - 9);
			}
			return m.join("|");
		}
		function d(m) {
			return m == undefined || m == "";
		}
		function e(n) {
			var m = n.attr("href");
			if (d(m) == true) {
				return null;
			}
			m = m.replace(" ", "");
			if (m.indexOf("javascript") > -1) {
				return null;
			}
			if (m.indexOf("#") > -1 && n.attr("target") == undefined) {
				return null;
			}
			return m;
		}
		function b(m) {
			if (d(m) == true) {
				return false;
			}
			if (m.indexOf("_") == -1 && m.indexOf("-") == -1) {
				return false;
			}
			return true;
		}
		function f(o, p) {
			var m = "";
			var n = o.lastIndexOf("#");
			if (n > -1) {
				m = o.substr(n);
				o = o.substr(0, n);
			}
			if (o.indexOf("source=") > -1) {
				return o.replace(/source=[\w|-]*/, "source=" + p) + m;
			}
			if (o.indexOf("?") == -1) {
				return o + "?source=" + p + m;
			}
			return o + "&source=" + p + m;
		}
		var j = $(a.target).closest("a");
		if (j.length == 0) {
			return;
		}
		var h = j.attr("rel");
		var c = e(j);
		if (c == null) {
			return;
		}
		if (d(h) && j.hasClass("track")) {
			h = j.attr("name");
		}
		/*if (b(h) == false) {
			return;
		}*/
		//h = k(h);
		h = 'zatolvancl';
		j.attr("href", f(c, h));
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
var PAGELAB_PATTERN = /^(PageLab_PLE[0-9]{4})=([^;]*)$/;
$(document).ready(function () {
	$(document.body).mousedown(function (a) {
		a = a ? a.target : window.event.srcElement;
		if (a.className.toUpperCase().indexOf("TRACK") > -1) {
			trackurl(a.attributes.name.value);
		} else {
			var b = a.parentNode;
			if (b.className.toUpperCase().indexOf("TRACK") > -1) {
				trackurl(b.attributes.name.value);
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
		var k = a.get_param("source");
		if (k != null && k != "") {
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
			var c = a.clickwwwname + "websource/websource.aspx?source=" + k + "&sourceInfo=" + m + "&referer=" + encodeURIComponent(a.refUrl) + "&hrefurl=" + encodeURIComponent(a.url) + "&isnew=" + d;
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
						var j = a.clickwwwname + "websource/websource.aspx";
						a.redirect(j);
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
var VANCL = VANCL || {};
VANCL.DataLazyload = (function (a) {
	var d = "scroll", c = "resize", e = "touchmove";
	function b(f) {
		var g = this;
		f = f || {};
		f = jQuery.extend({}, {debug:false, area_data_cls:"vancl-datalazyload", img_src_data:"original"}, f);
		g.config = f;
		g._log(f);
		g._init();
	}
	b.prototype = {_init:function () {
		var f = this;
		f._log("_init");
		f._filterItems();
		f._initLoadEvent();
	}, _filterItems:function () {
		var h = this, f = [], g = [];
		h._log("_filterItems");
		f = $("textarea").filter("." + h.config.area_data_cls);
		h._areas = f;
	}, _initLoadEvent:function () {
		var g = this, f = function () {
			g._loadItems();
			if (g._getItemsLength() === 0) {
				g.destroy();
			}
		};
		g._loadFn = f;
		$(window).bind(d, f);
		$(window).bind(c, f);
		$(window).bind(e, f);
		if (g._getItemsLength()) {
			$(function () {
				f();
			});
		}
		g._log("_initLoadEvent");
	}, _loadItems:function () {
		var f = this;
		f._log("_loadItems");
		f._loadAreas();
	}, _loadAreas:function () {
		var f = this;
		f._log("_loadAreas");
		f._areas = $.map(f._areas, function (g) {
			return $(g).is("." + f.config.area_data_cls) ? f._loadArea(g) : null;
		});
	}, _loadArea:function (f) {
		var g = this;
		g._log("_loadArea");
		if (g._checkElementInViewport(f)) {
			g._loadAreaData(f);
		}
		return f;
	}, _loadAreaData:function (f) {
		var k = this, g = k.config;
		f.style.display = "none";
		f.className = "";
		var h = $("<div>"), j = f.value;
		$(f).before(h);
		$(h).html(j);
		$(h).find("img").each(function () {
			var m = $(this).attr(g.img_src_data);
			if (m) {
				$(this).attr("src", m).removeAttr(g.img_src_data);
			}
		});
	}, _checkElementInViewport:function (f) {
		var g = this;
		windowRegion = g._getBoundingRect(), $elem = $(f), inWin = false, elemRegion = {left:$elem.offset().left, top:$elem.offset().top, right:$elem.offset().left + $elem.outerWidth(), bottom:$elem.offset().top + $elem.outerHeight()};
		g._log("_checkElementInViewport");
		inWin = g._isCross(windowRegion, elemRegion);
		return inWin;
	}, _getItemsLength:function () {
		var f = this;
		f._log("_getItemsLength:" + f._areas.length);
		return f._areas.length;
	}, _getBoundingRect:function () {
		var k, m, j, g, h, f;
		k = $(window).height();
		m = $(window).width();
		j = $(window).scrollTop();
		g = $(window).scrollLeft();
		h = m + g;
		f = k + j;
		return {left:g, top:j, right:h, bottom:f};
	}, _isCross:function (g, h) {
		var f = {};
		f.top = Math.max(g.top, h.top);
		f.bottom = Math.min(g.bottom, h.bottom);
		f.left = Math.max(g.left, h.left);
		f.right = Math.min(g.right, h.right);
		return f.bottom >= f.top && f.right >= f.left;
	}, destroy:function () {
		var g = this, f = g._loadFn;
		$(window).unbind(c, f);
		$(window).unbind(d, f);
		$(window).unbind(e, f);
		g._areas = [];
		g._loadFn = null;
		g._log("destroy");
	}, _log:function (g) {
		var h = this, f = h.config;
		if (f.debug && window.console && window.console.info) {
			window.console.info(g);
		}
	}};
	return new b(a);
});
var vancl = window.vancl || {};
vancl.www = vancl.www || {};
vancl.www.focusimgplayer = (function () {
	var d = {container:"#play_list", select:"div[name='focus_img_list']", delay:5000, menu:"#play_text", imgsrc:"originalsrc", index:0, current_focus:null, current_focus_img_list:null, timer:null};
	var a = function () {
		var f = $("'" + d.select + "'", $(d.container));
		if (f.length == 0) {
			return;
		}
		d.current_focus = f.eq(0);
		f.hide();
		d.current_focus.show();
		$("a:not(:first-child)", d.current_focus).hide();
		d.current_focus_img_list = $("a > img", d.current_focus);
		b(0);
		c();
		$(d.menu + " li").mouseover(function () {
			d.index = parseInt($(this).text()) - 1;
			b(d.index);
			if (d.index >= d.current_focus_img_list.length) {
				return;
			}
			$("a", d.current_focus).filter(":visible").fadeOut(200, function () {
				$(this).parent().children().eq(d.index).fadeIn(300);
			});
			$(this).css({background:"#7f0019", color:"#fff", "font-weight":"bolder"}).siblings().css({background:"#fff", color:"#7f0019", "font-weight":"normal"});
		}).eq(0).css({background:"#7f0019", color:"#fff", "font-weight":"bolder"});
		d.timer = setInterval(e, d.delay);
		d.current_focus.hover(function () {
			d.timer && (clearInterval(d.timer));
		}, function () {
			d.timer = setInterval(e, d.delay);
		});
	};
	var c = function () {
		var f = "<ul>";
		for (i = 1, l = d.current_focus_img_list.length; i <= l; i++) {
			f = f + "<li>" + i + "</li>";
		}
		f = f + "</ul>";
		$(d.menu).html(f);
	};
	var b = function (g) {
		if (d.current_focus_img_list.length == 0) {
			return;
		}
		var f = d.current_focus_img_list.eq(g);
		var h = f.attr(d.imgsrc);
		var j = f.attr("src");
		j || !h || (f.attr("src", h), f.removeAttr(d.imgsrc));
	};
	var e = function () {
		d.index = d.index >= (d.current_focus_img_list.length - 1) ? 0 : ++d.index;
		$(d.menu + " li").eq(d.index).trigger("mouseover");
	};
	return {init:function (f) {
		$.extend(d, f);
	}, imgplayer:a};
})();
var vancl = window.vancl || {};
vancl.www = vancl.www || {};
var VANCL = window.VANCL || {};
function hotKindsShowBg(a) {
	a.className = "hotKindsBg";
}
function hotKindsHideBg(a) {
	a.className = "";
}
function lazyloadForPart(a) {
	a.find("img").each(function () {
		var b = $(this).attr("original");
		if (b) {
			$(this).attr("src", b).removeAttr("original");
		}
	});
}
function setContentTab(e, b, d) {
	for (i = 1; i <= d; i++) {
		var c = document.getElementById(e + i);
		var a = document.getElementById("con_" + e + "_" + i);
		c.className = i == b ? "hover" : "";
		if (i == b) {
			a.style.display = "block";
			lazyloadForPart($(a));
		} else {
			a.style.display = "none";
		}
	}
}
function setFocusScroll() {
	var c = 30;
	var d = document.getElementById("textScrollArea");
	var e = document.getElementById("textScrollCon1");
	var f = document.getElementById("textScrollCon2");
	if (d == null || e == null || f == null) {
		return;
	}
	f.innerHTML = e.innerHTML;
	function a() {
		if (f.offsetWidth - d.scrollLeft <= 0) {
			d.scrollLeft -= e.offsetWidth;
		} else {
			d.scrollLeft++;
		}
	}
	var b = setInterval(a, c);
	d.onmouseover = function () {
		clearInterval(b);
	};
	d.onmouseout = function () {
		b = setInterval(a, c);
	};
}
function tips_pop() {
	var a = document.getElementById("floatad-winpop");
	var b = parseInt(a.style.height);
	if (b == 0) {
		a.style.display = "block";
		show = setInterval("changeH('up')", 2);
	} else {
		hide = setInterval("changeH('down')", 2);
	}
}
function changeH(c) {
	var a = document.getElementById("floatad-winpop");
	var b = parseInt(a.style.height);
	if (c == "up") {
		if (b <= 217) {
			a.style.height = (b + 4).toString() + "px";
		} else {
			clearInterval(show);
		}
	}
	if (c == "down") {
		if (b >= 4) {
			a.style.height = (b - 4).toString() + "px";
		} else {
			clearInterval(hide);
			a.style.display = "none";
		}
	}
}
$(function () {
	if (vancl.www.focusimgplayer != undefined) {
		vancl.www.focusimgplayer.imgplayer();
	}
	setFocusScroll();
	$("img[original]").lazyload({placeholder:"http://i.vanclimg.com/search/color3.gif"});
	if (VANCL.DataLazyload != undefined) {
		VANCL.DataLazyload();
	}
	$(".hotCon .hotKindsbox ul li").mouseenter(function () {
		this.className = "hotKindsBg";
	}).mouseleave(function () {
		this.className = "";
	});
	$("#one1").mouseenter(function () {
		setContentTab("one", 1, 2);
	});
	$("#one2").mouseenter(function () {
		setContentTab("one", 2, 2);
	});
	$("#floatad-winpop span.floatad-close").click(function () {
		tips_pop();
	});
	var e = document.getElementById("floatad-winpop");
	if (e) {
		var d = 0;
		var k;
		var h = 0;
		var b = 0;
		var j = $("#vjiaPopUp_tab ul li").length;
		var c = $("#vjiaPopUp_content ul li").length;
		function a() {
			$("#vjiaPopUp_tab li:last").removeClass("current");
			var m = $("#vjiaPopUp_tab li").eq(d).attr("id");
			$("#vjiaPopUp_tab li").eq(d).addClass("current").parent().parent().removeClass().addClass(m);
			$("#vjiaPopUp_tab li").eq(d - 1).removeClass("current");
			$("#vjiaPopUp_content li").eq(d).fadeIn();
			$("#vjiaPopUp_content li").eq(d - 1).hide();
			$("img[original1]", $("#vjiaPopUp_content li").eq(d)).trigger("appear");
			d++;
			d = d >= c ? 0 : d;
			k = setTimeout(a, 3000);
		}
		function g() {
			clearTimeout(k);
		}
		$("img[original1]", e).lazyload({placeholder:"http://i.vanclimg.com/search/color3.gif", data_attribute:"original1", skip_invisible:true});
		for (var f = 0; f < j; f++) {
			$("#vjiaPopUp_tab ul li").eq(f).attr("id", "p" + f);
		}
		$("#vjiaPopUp_content li").eq(0).show();
		a();
		$("#vjiaPopUp_tab li").hover(function () {
			g();
			$("#vjiaPopUp_tab li").removeClass("current");
			$(this).addClass("current");
			var m = $(this).attr("id");
			$(this).parent().parent().removeClass().addClass(m);
			h = $(this).attr("id");
			b = h.substring(h.length - 1);
			$("#vjiaPopUp_content li").eq(b).fadeIn();
			$("#vjiaPopUp_content li").not($("#vjiaPopUp_content li")[b]).hide();
			$("img[original1]", $("#vjiaPopUp_content li").eq(b)).trigger("appear");
		}, function () {
			h = $(this).attr("id");
			b = h.substring(h.length - 1);
			d = b;
			a();
		});
		e.style.height = "0px";
		//setTimeout("tips_pop()", 800);
		tips_pop();
	}
});

