
$.fn.tabs = function (b, a) {
	var c = $(this);
	b = $(b);
	c.on("mouseover", function (d) {
		var f = $(this).index();
		c.removeClass("hover");
		$(this).addClass("hover");
		b.hide();
		b.eq(f).show();
		if (typeof a == "function") {
			a(b, f);
		}
	});
	return $(this);
};
$(function () {
	$(".fbListOrder .tab-title li").tabs(".fbListOrder .Hot_Ranking > div", function (a, b) {
		a.eq(b).find("img[src!=original]").trigger("appear");
	});
	$(".fbListComment .tab-title li").tabs(".fbListComment .Hot_Comment > div", function (a, b) {
		a.eq(b).find("img[src!=original]").trigger("appear");
	});
});
$(document).ready(function () {
	$("#history").css("display", "block");
});
function clearhistory() {
	$("#history").css("display", "none");
	$.cookie('recentlyviewedproducts',null);
	/*var b = "/common/clearhistory?" + Math.random();
	$.getJSON(b);
	var a = new Date((new Date()).getTime() + 30 * 86400000);
	a = "; expires=" + a.toGMTString();
	document.cookie = "_vuca=" + escape("") + ";path=/" + a + ";domain=.vancl.com";*/
}
$(window).load(function () {
	$(window).one("scroll", function () {
		var c = "channel";
		var b = $("#recommend").html();
		if (b != null) {
			var a = $("#recommend").val().split(",");
			c = a[0];
		}
		loadvjiaAd(c);
	});
});
function loadvjiaAd(f) {
	try {
		var i = $("#vjiaAd");
		var h = vjiaAd;
		if (h != null && i.length > 0 && $.trim(i.html()) == "") {
			h.imageLink = $.trim(h.imageLink);
			h.imageUrl = $.trim(h.imageUrl);
			h.source = $.trim(h.source);
			h.track = $.trim(h.track);
			if (h.imageLink == "" || h.imageUrl == "") {
				return;
			}
			var d = h.imageLink;
			if (h.source != "") {
				if (d.indexOf("?") >= 0) {
					d = d + "&source=" + h.source;
				} else {
					d = d + "?source=" + h.source;
				}
			}
			var c = "";
			if (h.track != "") {
				if (f != "") {
					h.track = h.track.replace("{0}", f);
					c = " class=\"track\" name=\"" + h.track + "\" rel = \"vv_ch_" + f + "-0-ad-vjia\"";
				} else {
					c = " class=\"track\" name=\"" + h.track + "\" rel = \"vv_ch_" + f + "-0-ad-vjia\"";
				}
			}
			var b = $("<a" + c + " target=\"_blank\"></a>").attr("href", d);
			var a = $("<img></img>").attr("original", h.imageUrl).css({width:"200px", height:"220px"}).appendTo(b);
			i.append(b).show();
			a.lazyload();
		}
	}
	catch (g) {
	}
}
(function (a) {
	var b = {selectedFn:null, defaultNav:null, addCrumb:function (c) {
		if (c && c.length > 0) {
			a("#showpath").html("<span>&gt;</span><a href=\"" + c.attr("href") + "\" rel=\"\">" + c.text() + "</a>");
		}
	}};
	a.fn.crumbs = function (d) {
		d = a.extend({}, b, d || {});
		var j = a(this);
		var g = a(d.defaultNav);
		var e = d.addCrumb;
		var f = true;
		var h = location.search.indexOf("navtype=") == -1;
		var l = h ? /(n\d{1,2})(?=(\.html|-))/ig : /(navtype=\w+)(?=(&|#|$))/ig;
		var i = h ? location.pathname.match(l) : location.search.match(l);
		if (i != null && i.length == 1) {
			var k = i[0];
			l = h ? new RegExp(k + "(.html|-)", "i") : new RegExp(k + "(&|#|$)", "i");
			a.each(j, function (c, m) {
				if (f && a(m).attr("href").search(l) > -1) {
					e(a(m));
					if (d.selectedFn) {
						d.selectedFn.call(a(m));
					}
					f = false;
				}
			});
		}
		if (f) {
			e(g);
			if (d.selectedFn) {
				d.selectedFn.call(g);
			}
		}
	};
})(jQuery);
$(document).ready(function () {
	$("#sltOrderBy").change(function () {
		window.location.href = $(this).val() + location.hash;
	});
});
$(document).ready(function () {
	$("input[name='chkSalesAction']").change(function () {
		var b = window.location.href;
		var a = "";
		$("[name='chkSalesAction'][checked]").not(this).each(function () {
			a += $(this).val() + ",";
		});
		if (this.checked) {
			a += $(this).val();
		} else {
			if (a != "") {
				a = a.substring(0, a.length - 1);
			}
		}
		b = RemoveParameter("salesflag", b);
		b = RemoveParameter("isduanma", b);
		b = RemoveParameter("page", b);
		if (b.length > 1 && b.indexOf("?") > 0) {
			if ((b.length - 1) == b.indexOf("?")) {
				b = b.substring(0, b.length - 1);
			}
		}
		if (a != "") {
			b = AddParameter("salesflag", a, b);
		}
		window.location.href = b;
	});
});
$(document).ready(function () {
	var a = $("input[name='radioViewType']");
	if (a.length >= 2) {
		for (var c = 0; c < 2; c++) {
			if (!a[c].checked) {
				a[c].onclick = b;
			}
		}
	}
	function b() {
		var d = RemoveParameter("page", window.location.href);
		if (a[0].checked) {
			window.location.href = RemoveParameter("view", d);
		} else {
			window.location.href = AddParameter("view", "1", d);
		}
	}
});
$(document).ready(function () {
	$(".pageGGsub20111226").click(function () {
		var a = Number($(this).siblings("#vanclPageText").val());
		var c = Number($("#vanclPageCount:first").html());
		var b = Number($(".currentpage").text());
		if (a == b) {
			return false;
		}
		if (a < 1 || a > c) {
			return false;
		}
		if (a <= c) {
			var d = window.location.href;
			if (d.length > 1 && d.indexOf("?") > 0) {
				if ((d.length - 1) == d.indexOf("?")) {
					d = d.substring(0, d.length - 1);
				}
			}
			window.location.href = AddParameter("page", $(this).siblings("#vanclPageText").val(), d);
		}
	});
});
if (typeof setUpSource != "function") {
	setUpSource = function () {
		$("body").mousedown(function (a) {
			var d = $(a.target).closest("a");
			var c = d.attr("source");
			if (c != undefined && c != "") {
				var b = d.attr("href");
				if (b.indexOf("source=") > -1) {
					b = b.replace(/source=[\w|-]*/, "source=" + c);
				} else {
					if (b.indexOf("?") == -1) {
						b += "?source=" + c;
					} else {
						b += "&source=" + c;
					}
				}
				d.attr("href", b);
			}
		});
	};
}
(function (a) {
	a.fn.vjiaChangeColor = function () {
		a(this).each(function () {
			var e = a(this);
			a("a.changecolor", this).bind("click", function () {
				var f = a(this).attr("d");
				var g = a(this).attr("vjia");
				if (g == "1") {
					if (f == "0") {
						c(e, a("span", this).eq(0).text());
					} else {
						if (f == "1") {
							d(e, a("span", this).eq(0).text());
						}
					}
				}
			});
			a(".pic img:first", e).bind("mouseleave", function () {
			}).bind("mouseenter", function () {
			});
		});
	};
	function c(f, e) {
		a.getJSON("http://vanclsearch.vjia.com/search.ashx?callback=?", {productcode:e, start:0, rows:1}, function (j) {
			var i = j.response.docs[0];
			f.find(".pic").eq(0).attr("pop", "v" + i.productcode);
			f.find(".pic a").eq(0).attr("href", i.producturl);
			var h = f.find(".pic a img").eq(0);
			if (h.length > 0) {
				h.attr("src", b(i, h.width(), h.height()));
			}
			f.find(".productName a").eq(0).attr("href", i.producturl).html(i.productname);
			f.find(".productName a").eq(0).attr("title", i.productname);
			if (Math.ceil(i.sprice) < Math.ceil(i.price)) {
				f.find(".price .sc").eq(0).html("\u552e\u4ef7\uffe5<del>" + i.price + "</del>");
			} else {
				f.find(".price .sc").eq(0).html("\u552e\u4ef7\uffe5" + i.price);
			}
			f.find(".price strong del").eq(0).html(i.vprice);
			f.find(".productInfo .ProductName").eq(0).html(i.productname);
			f.find(".productInfo .prouctCode").eq(0).html(i.productcode);
			f.find(".productInfo .sprice").eq(0).html(i.sprice);
			f.find(".productInfo .vprice").eq(0).html(i.vprice);
			f.find(".productInfo .price").eq(0).html(i.price);
			f.find(".productInfo .pic").eq(0).html(i.photodomain + i.photourllist);
			f.find(".productInfo .salesFlag").eq(0).html(i.salesflag);
			f.find("dl dd").each(function (k) {
				if (a(this).attr("id") == "color_" + e) {
					if (k % 5 == 4) {
						a(this).attr("class", "currentColor2");
						a(this).find("a").blur();
					} else {
						a(this).attr("class", "currentColor");
						a(this).find("a").blur();
					}
				} else {
					if (k % 5 == 4) {
						a(this).attr("class", "otherColor2");
					} else {
						a(this).attr("class", "otherColor");
					}
				}
			});
			f.find(".pic .teshui").remove();
			f.find(".pic .qianggou").remove();
			f.find(".pic .duanma").remove();
			f.find(".pic .duanmasmall").remove();
			f.find(".pic .newview").remove();
			f.find(".pic .qingcang").remove();
			var g = "";
			if ((i.sprice + "").replace(".00", "").length > 3) {
				g += "font-size:13px;";
			}
			if (h.height() == 222) {
				g += "padding-bottom: 2px; text-indent: 5px; padding-left: 8px; padding-right: 0px; top: 171px; padding-top: 18px;";
			}
			if (g.length > 0) {
				g = "style=\"" + g + "\"";
			}
			if (i.salesflag == 1) {
				f.find(".price .sc").eq(0).html("\u7279\u60e0\u4ef7\uffe5<strong style=\"text-decoration:none;font-weight:bold;\">" + i.sprice + "</strong>");
			} else {
				if (i.salesflag == 2) {
					f.find(".price .sc").eq(0).html("\u62a2\u8d2d\u4ef7\uffe5<strong style=\"text-decoration:none;font-weight:bold;\">" + i.sprice + "</strong>");
				} else {
					if (i.salesflag == 3) {
						f.find(".price .sc").eq(0).html("\u6e05\u4ed3\u4ef7\uffe5<strong style=\"text-decoration:none;font-weight:bold;\">" + i.sprice + "</strong>");
					}
				}
			}
			if (i.isduanma == true) {
				f.find(".price .sc").eq(0).html("\u65ad\u7801\u4ef7\uffe5<strong style=\"text-decoration:none;font-weight:bold;\">" + i.sprice + "</strong>");
			}
		});
	}
	function d(f, e) {
		a.getJSON("http://vanclsearch.vjia.com/search.ashx?callback=?", {productcode:e, start:0, rows:1}, function (j) {
			var i = j.response.docs[0];
			i.vprice = (i.vprice + "").replace(".00", "");
			i.price = (i.price + "").replace(".00", "");
			i.sprice = (i.sprice + "").replace(".00", "");
			f.find(".pic").eq(0).attr("pop", "v" + i.productcode);
			f.find(".pic a").eq(0).attr("href", i.producturl);
			var h = f.find(".pic a img").eq(0);
			if (h.length > 0) {
				h.attr("src", b(i, h.width(), h.height()));
			}
			f.find(".productName a").eq(0).attr("href", i.producturl).attr("title", i.productname);
			f.find(".productName a h2").eq(0).html(i.productname);
			if (f.find(".productName a h2").length == 0) {
				f.find(".productName a").text(i.productname);
			}
			var k = "";
			if (i.salesflag == 1) {
				k = "\u7279\u60e0\u4ef7\uff1a\uffe5" + i.sprice;
			} else {
				if (i.salesflag == 2) {
					k = "\u62a2\u8d2d\u4ef7\uff1a\uffe5" + i.sprice;
				} else {
					if (i.salesflag == 3) {
						k = "\u6e05\u4ed3\u4ef7\uff1a\uffe5" + i.sprice;
					} else {
						k = "\u552e\u4ef7\uff1a\uffe5" + i.sprice;
					}
				}
			}
			f.find(".fontyj del").eq(0).html("\uffe5" + i.vprice);
			f.find(".fonthj").eq(0).html(k);
			if (i.sprice != i.price && i.salesflag != 0) {
				f.find(".fontsj").html("\u552e\u4ef7\uff1a\uffe5<del>" + i.price.replace(".00", "") + "</del>");
			} else {
				f.find(".fontsj").html("");
			}
			f.find(".productInfo .ProductName").eq(0).html(i.productname);
			f.find(".productInfo .prouctCode").eq(0).html(i.productcode);
			f.find(".productInfo .sprice").eq(0).html(i.sprice);
			f.find(".productInfo .vprice").eq(0).html(i.vprice);
			f.find(".productInfo .price").eq(0).html(i.price);
			f.find(".productInfo .pic").eq(0).html(i.photodomain + i.photourllist);
			f.find(".productInfo .salesFlag").eq(0).html(i.salesflag);
			f.find(".StyleColor dd").each(function () {
				a(this).removeClass("currentColor");
				a(this).removeClass("otherColor");
				if (a(this).attr("id") == "color_" + e) {
					a(this).attr("class", "currentColor");
					a(this).find("a").blur();
				} else {
					a(this).attr("class", "otherColor");
				}
			});
			f.find(".pic .teshui").remove();
			f.find(".pic .qianggou").remove();
			f.find(".pic .duanma").remove();
			f.find(".pic .duanmasmall").remove();
			f.find(".pic .newview").remove();
			f.find(".pic .qingcang").remove();
			var g = "";
			if ((i.sprice + "").replace(".00", "").length > 3) {
				g += "font-size:13px;";
			}
			if (h.height() == 222) {
				g += "padding-bottom: 2px; text-indent: 5px; padding-left: 8px; padding-right: 0px; top: 171px; padding-top: 18px;";
			}
			if (g.length > 0) {
				g = "style=\"" + g + "\"";
			}
			if (i.salesflag == 1) {
			} else {
				if (i.salesflag == 2) {
				} else {
					if (i.salesflag == 3) {
					}
				}
			}
			if (i.isduanma == true) {
			}
		});
	}
	function b(g, f, e) {
		if (f === 160 && e === 160) {
			return g.photodomain + g.photourllist;
		} else {
			return g.photodomain + "/" + f + "/" + e + g.photourl;
		}
	}
})(jQuery);
function TrimQueryString() {
	var c, f, b;
	var e = location.href;
	if (e.indexOf("#") >= 0) {
		e = e.slice(0, e.indexOf("#"));
	}
	var d = e.indexOf("?");
	e = e.substr(d + 1);
	var a = e.split("&");
	for (b = 0; b < a.length; b++) {
		d = a[b].indexOf("=");
		if (d > 0) {
			c = a[b].substring(0, d);
			f = a[b].substr(d + 1);
			this[c] = f;
		}
	}
}
var vancl = window.vancl || {};
vancl.search = vancl.search || {};
vancl.search.vjiaproducts = (function () {
	var g = {enabled:false, pcid:"", container:"vjiaproducts", vanclcontainer:"vanclproducts", displayType:0, browseType:0, vanclTotalPages:0, vanclRecords:0, serviceUrl:"http://vanclsearch.vjia.com/search.ashx?callback=?", refValue:"", sourceValue:"", trackValue:"", defaultsort:1, productImageWidth:170, productImageHeight:170, getVjiaRequest:i, rowNum:4, jsonIsComplete:true, anyMore:false, vjiaLoadComplete:function (k) {
	}};
	var f = function (k) {
		var l = typeof (k) == "undefined" ? $("#vjiaPage").val() : k;
		if (l == "-1") {
			l = $("li.currentpage20111226").text();
		}
		l = parseInt(l);
		if (isNaN(l)) {
			l = 1;
		}
		return l;
	};
	var j = function (q) {
		if (!g.enabled) {
			g.vjiaLoadComplete({totalCount:g.vanclRecords});
			return;
		}
		var o = $("#vjiaOversea").val();
		if (typeof (o) != "undefined" && o == "1") {
			g.vjiaLoadComplete({totalCount:g.vanclRecords});
			$("#noproducts").show();
			return;
		}
		var r = f(q);
		var u = i();
		var t = g.rowNum;
		if (r < g.vanclTotalPages) {
			u.start = (r - 1) * t * 2;
			if (u.start < 0) {
				u.start = 0;
			}
			u.rows = t * 2;
		} else {
			var s = g.rowNum * 10, k = g.rowNum;
			if (g.displayType == 1) {
				s = 10;
				k = 1;
			}
			var l = g.vanclRecords % s;
			if (g.vanclRecords != 0 && l == 0) {
				l = s;
			}
			var m = Math.ceil(l / k);
			var n = k * (12 - m);
			u.start = (r - 1) * t * 2;
			u.rows = n;
		}
		h(u);
	};
	var h = function (l, k) {
		if (!g.jsonIsComplete) {
			return;
		}
		g.jsonIsComplete = false;
		$.ajax({type:"POST", url:g.serviceUrl, dataType:"jsonp", data:l, error:function (o, n, m) {
			if (n == "timeout") {
			} else {
			}
		}, success:function (n) {
			if (n) {
				if (n.responseHeader && n.responseHeader.status == 0 && n.response.numFound > 0 && n.response.docs.length > 0) {
					b(n, l.browsetype, k);
					var p = f();
					var o = n.response.numFound - $("[pop^=v]").length - (p - 1) * g.rowNum * 2;
					if ($("#appendvjia").length == 0) {
						var q = "pruarea";
						if (g.displayType == 0) {
							if (l.browsetype == 0) {
								q = "pruarea";
							} else {
								q = "pruarea2";
							}
						} else {
							q = "pruarea1";
						}
						var m = "<div id=\"appendvjia\"  class=\"" + q + "\"></div>";
						if (g.displayType == 0) {
							$("#vanclProductList > .productList").append(m);
							$("#vjiaProductList > ." + q + " > ul").each(function (r) {
								$("#appendvjia").append("<span class=\"blank10\"></span>").append($(this));
							});
						} else {
							$("#vanclProductList > div.ie6-mr ").append(m);
							$("#vjiaProductList  > ." + q + " > div").each(function (r) {
								$("#appendvjia").append($(this));
							});
						}
						if (p >= g.vanclTotalPages || (p == 1 && g.vanclTotalPages == 0)) {
							if ($("#vjiaProductList:hidden").length > 0 && o > 0) {
								g.anyMore = true;
							}
						}
					}
					if (o <= 0) {
						$("#vjiamore").hide();
					} else {
						$("#vjiamorenum").text(o);
					}
					if (g.vanclRecords == 0) {
						$("#" + g.vanclcontainer).hide();
					}
					setUpSource();
					g.vjiaLoadComplete({totalCount:g.vanclRecords + n.response.numFound});
				} else {
					g.vjiaLoadComplete({totalCount:g.vanclRecords});
				}
			} else {
				g.vjiaLoadComplete({totalCount:g.vanclRecords});
			}
		}, complete:function (p, n) {
			g.jsonIsComplete = true;
			if ($(".pruarea").length == 0 && $(".pruarea1").length == 0 && $(".pruarea2").length == 0) {
				$("#noproducts").show();
			}
			if (g.anyMore) {
				var m = f();
				$("#vjiamore").show().css("cursor", "pointer");
				$("#vjiaProductList").show();
				var o = i();
				o.start = $("[pop^=v]").length + (m - 1) * g.rowNum * 2;
				o.rows = g.rowNum;
				h(o, true);
				$("#vjiamore").click(function () {
					var q = i();
					q.start = $("[pop^=v]").length + (m - 1) * g.rowNum * 2;
					q.rows = 40;
					h(q, true);
					return false;
				});
				g.anyMore = false;
			}
		}});
	};
	var i = function () {
		var r = {};
		if ($("#vjiaKeyword").length > 0) {
			r.key = $("#vjiaKeyword").val();
		}
		r.pcid = decodeURIComponent($("#hidCateId").val());
		r.sort = g.defaultsort;
		if ($("#attrItems").length == 0) {
			var l;
			var m = "";
			var k = ["", "\u4e0d\u9650"];
			if ($("span[class='kindsdel']").prev("a").length > 0) {
				l = $("span[class='kindsdel']").prev("a");
			} else {
				if ($(".fbListKind span[class='category-visited'] a").length > 0) {
					l = $(".fbListKind span[class='category-visited'] a");
				} else {
					if ($("span[class='kindsdel'] a").length > 0) {
						l = $("span[class='kindsdel'] a");
					} else {
						l = $("span[class='v2list_del'] a");
					}
				}
			}
			$.each(l, function (s, t) {
				if (k.indexOf($.trim($(t).text())) < 0) {
					k.push($(t).text());
				}
			});
			if (k.length > 2) {
				r.attributes = k.slice(2).join(",");
			}
		} else {
			r.attrid = $("#attrItems").val();
		}
		var n = $("#vjiaColor").val();
		if (n != "-1") {
			r.color = n;
		}
		var q = $("#vjiaSize").val();
		if (q != "-1") {
			r.size = q;
		}
		var p = $("#vjiaPriceLow").val();
		var o = $("#vjiaPriceHigh").val();
		if (p != "-1" && o != "-1") {
			r.pricefrom = p;
			r.priceto = o;
		}
		r.browsetype = g.browseType;
		return r;
	};
	var b = function (m, k, l) {
		var n = $(".productwrapper", $("#" + g.container));
		$("a.changecolor", n).unbind();
		$(".pic img:first", n).unbind();
		n.unbind();
		vancl.channel.productpop.unload($("#" + g.container));
		if (!l) {
			$("#" + g.container).html("<div class=\"lbyVjiaTitle\" ><h1>\u66f4\u591aV+\u9500\u552e\u5546\u54c1</h1></div>");
		}
		if (g.displayType == 1) {
			c(m, k, l);
		} else {
			if (k == 0) {
				a(m, l);
			} else {
				e(m, l);
			}
		}
		$("img[original]", $("#" + g.container)).lazyload();
		vancl.channel.productpop.load($("#" + g.container));
		$(".productwrapper", $("#" + g.container)).vjiaChangeColor();
	};
	var a = function (q, n) {
		var l = "";
		if (!n) {
			l += "<div class=\"pruarea\" id=\"pruarealistv2\">";
		}
		for (var m = 0; m < q.response.docs.length; m++) {
			var p = q.response.docs[m];
			if (m % g.rowNum == 0) {
				l += "<ul>";
			}
			l += "<li class=\"scListArea productwrapper border vpureList\"";
			if (m % g.rowNum == (g.rowNum - 1)) {
				l += " style=\"margin-right:0;\"";
			}
			l += "><div class=\"pic vpureList\" pop=\"v" + p.productcode + "\">";
			var o = (new Date().getTime() - new Date(p.createtime).getTime()) / 3600 / 1000 < 24 * 15;
			var s = p.photodomain + p.photourllist;
			if (g.productImageWidth != 160 || g.productImageHeight != 160) {
				s = p.photodomain + "/" + g.productImageWidth + "/" + g.productImageHeight + p.photourl;
			}
			l += "<div class=\"vjiaIcon\"></div>";
			l += "<a href=\"" + p.producturl + "\" class=\"track\"  name=\"" + g.trackValue + "\" rel=\"" + g.refValue + "\"  source=\"" + g.sourceValue + "\" title=\"" + p.productname + "\" target=\"_blank\"><img class=\"productPhoto productLazyLoad\" original=\"" + s + "\" alt=\"" + p.productname + "\" /></a>";
			var k = "", r = "\u552e\u4ef7", t = g.productImageHeight == 222 ? " style=\"padding-bottom: 2px; text-indent: 5px; padding-left: 8px; padding-right: 0px; top: 171px; padding-top: 18px;\" " : "";
			if (p.isduanma) {
				k = "duanma";
				r = "\u65ad\u7801\u4ef7";
				if (p.sprice % 1 != 0) {
					k = "duanmasmall";
				}
			} else {
				if (p.salesflag == 1) {
					k = "teshui";
					r = "\u7279\u60e0\u4ef7";
				} else {
					if (p.salesflag == 2) {
						k = "qianggou";
						r = "\u62a2\u8d2d\u4ef7";
					} else {
						if (p.salesflag == 3) {
							k = "qingcang";
							r = "\u6e05\u4ed3\u4ef7";
						}
					}
				}
			}
			if (p.salesflag != 0 || p.isduanma) {
			}
			l += "</div>";
			l += "<p><a href=\"" + p.producturl + "\" class=\"track\"  name=\"" + g.trackValue + "\" rel=\"" + g.refValue + "\"  source=\"" + g.sourceValue + "\" title=\"" + p.productname + "\" target=\"_blank\">" + p.productname + "</a></p>";
			l += "<div>";
			l += "<span class=\"Mprice\">\u5e02\u573a\u4ef7\uffe5<strong>" + Math.ceil(p.vprice) + "</strong></span>";
			l += "<span class=\"Sprice\">" + r + "\uffe5";
			if (p.sprice < p.price) {
				l += "<strong style=\"text-decoration:none;font-weight:bold;\">" + Math.ceil(p.sprice) + "</strong>";
			} else {
				l += Math.ceil(p.price);
			}
			l += "</span>";
			l += "</div></li>";
			if ((m + 1) % g.rowNum == 0 || (m + 1 == q.response.docs.length)) {
				l += "</ul>";
			}
		}
		if (!n) {
			l += "</div>";
			$("#" + g.container).append(l);
		} else {
			$("#pruarealistv2").append(l);
		}
	};
	var e = function (u, q) {
		var o = "";
		if (!q) {
			o += "<div class=\"pruarea2\" id=\"pruarea2listv2\">";
		}
		for (var p = 0; p < u.response.docs.length; p++) {
			var s = u.response.docs[p];
			if (p % g.rowNum == 0) {
				o += "<ul>";
			}
			o += "<li class=\"productwrapper\"";
			if (p % g.rowNum == (g.rowNum - 1)) {
				o += " style=\"margin-right:0;\"";
			}
			o += "><span class=\"blank8\"></span><div class=\"pic vpureList\" pop=\"v" + s.productcode + "\">";
			var r = (new Date().getTime() - new Date(s.createtime).getTime()) / 3600 / 1000 < 24 * 15;
			if (r) {
				o += "<div class=\"newview\"></div>";
			}
			var w = s.photodomain + s.photourllist;
			if (g.productImageWidth != 160 || g.productImageHeight != 160) {
				w = s.photodomain + "/" + g.productImageWidth + "/" + g.productImageHeight + s.photourl;
			}
			o += "<div class=\"vjiaIcon\"></div>";
			o += "<a href=\"" + s.producturl + "\" class=\"track\"  name=\"" + g.trackValue + "\" rel=\"" + g.refValue + "\"  source=\"" + g.sourceValue + "\" title=\"" + s.productname + "\" target=\"_blank\"><img class=\"productPhoto productLazyLoad\" original=\"" + w + "\" alt=\"" + s.productname + "\" /></a>";
			var k = "", v = "\u552e\u4ef7", y = g.productImageHeight == 222 ? " style=\"padding-bottom: 2px; text-indent: 5px; padding-left: 8px; padding-right: 0px; top: 171px; padding-top: 18px;\" " : "";
			if (s.isduanma) {
				k = "duanma";
				v = "\u65ad\u7801\u4ef7";
				if (s.sprice % 1 != 0) {
					k = "duanmasmall";
				}
			} else {
				if (s.salesflag == 1) {
					k = "teshui";
					v = "\u7279\u60e0\u4ef7";
				} else {
					if (s.salesflag == 2) {
						k = "qianggou";
						v = "\u62a2\u8d2d\u4ef7";
					} else {
						if (s.salesflag == 3) {
							k = "qingcang";
							v = "\u6e05\u4ed3\u4ef7";
						}
					}
				}
			}
			if (s.salesflag != 0 || s.isduanma) {
			}
			o += "</div>";
			if (s.colorphoto && s.colorphoto.length > 0) {
				o += "<dl class=\"StyleColor\">";
				for (var t = 0; t < s.colorphoto.length; t++) {
					var x = s.colorphoto[t].split("|");
					var l = s.photodomain + x[0];
					var m = x[1];
					var n = x[2];
					if (s.productcode == m) {
						o += "<dd id=\"color_" + m + "\" class=\"currentColor\">";
					} else {
						if ((t + 1) % 5 == 0) {
							o += "<dd id=\"color_" + m + "\" class=\"otherColor2\">";
						} else {
							o += "<dd id=\"color_" + m + "\" class=\"otherColor\">";
						}
					}
					o += "<a href=\"javascript:void(0);\" onclick=\"return false;\" class=\"changecolor\" d=\"0\" vjia=\"1\"><img original=\"" + l + "\" width=\"20\" height=\"20\" alt=\"" + n + "\" title=\"" + n + "\" /><span style=\"display:none;\">" + m + "</span></a></dd>";
				}
				o += "</dl>";
			}
			o += "<div class=\"productName\"><a href=\"" + s.producturl + "\" class=\"track\"  name=\"" + g.trackValue + "\" rel=\"" + g.refValue + "\"  source=\"" + g.sourceValue + "\" title=\"" + s.productname + "\" target=\"_blank\">" + s.productname + "</a></div>";
			o += "<div class=\"price\" style=\"width:160px;\">";
			o += "<strong class=\"hs\">\u5e02\u573a\u4ef7\uffe5<del>" + Math.ceil(s.vprice) + "</del></strong>";
			o += "<strong class=\"sc\">" + v + "\uffe5";
			if (s.sprice < s.price) {
				o += "<strong style=\"text-decoration:none;font-weight:bold;\">" + Math.ceil(s.sprice) + "</strong>";
			} else {
				o += Math.ceil(s.price);
			}
			o += "</strong>";
			o += "</div><span class=\"blank8\"></span></li>";
			if ((p + 1) % g.rowNum == 0 || (p + 1 == u.response.docs.length)) {
				o += "</ul>";
			}
		}
		if (!q) {
			o += "</div>";
			$("#" + g.container).append(o);
		} else {
			$("#pruarea2listv2").append(o);
		}
	};
	var c = function (v, k, r) {
		var p = "";
		if (!r) {
			p += "<div class=\"pruarea1\" id=\"pruarea1v2list\">";
		}
		for (var q = 0; q < v.response.docs.length; q++) {
			var t = v.response.docs[q];
			p += "<div class=\"pru1li productwrapper border vpureList\">";
			p += "<div class=\"pic vpureList\" pop=\"v" + t.productcode + "\">";
			var x = t.photodomain + t.photourllist;
			if (g.productImageWidth != 160 || g.productImageHeight != 160) {
				x = t.photodomain + "/" + g.productImageWidth + "/" + g.productImageHeight + t.photourl;
			}
			var s = (new Date().getTime() - new Date(t.createtime).getTime()) / 3600 / 1000 < 24 * 15;
			if (s) {
				p += "<div class=\"newview\"></div>";
			}
			p += "<div class=\"vjiaIcon\"></div>";
			p += "<a href=\"" + t.producturl + "\" class=\"track\"  name=\"" + g.trackValue + "\" rel=\"" + g.refValue + "\"  source=\"" + g.sourceValue + "\" title=\"" + t.productname + "\" target=\"_blank\"><img class=\"productPhoto productLazyLoad\" original=\"" + x + "\" alt=\"" + t.productname + "\" /></a>";
			var l = "", w = "\u552e\u4ef7", z = g.productImageHeight == 222 ? " style=\"padding-bottom: 2px; text-indent: 5px; padding-left: 8px; padding-right: 0px; top: 171px; padding-top: 18px;\" " : "";
			if (t.isduanma) {
				l = "duanma";
				w = "\u65ad\u7801\u4ef7";
				if (t.sprice % 1 != 0) {
					l = "duanmasmall";
				}
			} else {
				if (t.salesflag == 1) {
					l = "teshui";
					w = "\u7279\u60e0\u4ef7";
				} else {
					if (t.salesflag == 2) {
						l = "qianggou";
						w = "\u62a2\u8d2d\u4ef7";
					} else {
						if (t.salesflag == 3) {
							l = "qingcang";
							w = "\u6e05\u4ed3\u4ef7";
						}
					}
				}
			}
			if (t.salesflag != 0 || t.isduanma) {
			}
			p += "</div>";
			p += "<div class=\"pru1detail\">";
			p += "<p class=\"productName\"><a href=\"" + t.producturl + "\" class=\"track\"  name=\"" + g.trackValue + "\" rel=\"" + g.refValue + "\"  source=\"" + g.sourceValue + "\" title=\"" + t.productname + "\" target=\"_blank\">" + t.productname + "</a></p>";
			p += "<div class=\"divProp\">";
			if (k == 1) {
				if (t.colorphoto && t.colorphoto.length > 0) {
					p += "<p><dl class=\"StyleColor\">";
					for (var u = 0; u < t.colorphoto.length; u++) {
						var y = t.colorphoto[u].split("|");
						var m = t.photodomain + y[0];
						var n = y[1];
						var o = y[2];
						if (t.productcode == n) {
							p += "<dd id=\"color_" + n + "\" class=\"currentColor\">";
						} else {
							if ((u + 1) % 5 == 0) {
								p += "<dd id=\"color_" + n + "\" class=\"otherColor2\">";
							} else {
								p += "<dd id=\"color_" + n + "\" class=\"otherColor\">";
							}
						}
						p += "<a href=\"javascript:void(0);\" onclick=\"return false;\" class=\"changecolor\" d=\"1\" vjia=\"1\"><img original=\"" + m + "\" width=\"20\" height=\"20\" alt=\"" + o + "\" title=\"" + o + "\" /><span style=\"display:none;\">" + n + "</span></a></dd>";
					}
					p += "</dl></p>";
				}
			}
			p += "</div>";
			p += "</div>";
			p += "<div class=\"pru1price\"><div class=\"pru1pricearea\">";
			p += "<div class=\"fonthj\">";
			if (t.salesflag == 1) {
				p += "\u7279\u60e0\u4ef7";
			} else {
				if (t.salesflag == 2) {
					p += "\u62a2\u8d2d\u4ef7";
				} else {
					if (t.salesflag == 3) {
						p += "\u6e05\u4ed3\u4ef7";
					} else {
						p += "\u552e\u4ef7";
					}
				}
			}
			p += "\uff1a\uffe5" + Math.ceil(t.sprice) + "</div>";
			p += "<div class=\"fontyj\">\u5e02\u573a\u4ef7\uff1a<del>\uffe5" + Math.ceil(t.vprice) + "</del></div>";
			p += "<div class=\"fontsj\">";
			if (t.sprice != t.price && t.salesflag != 0) {
				p += "\u552e\u4ef7\uff1a\uffe5<del>" + Math.ceil(t.price) + "</del>";
			}
			p += "</div></div>";
			p += "<div class=\"fontpf\">\u8bc4\u5206\uff1a</div>";
			p += "<div class=\"starImg\">" + d(t.userrating) + "</div>";
			p += "<div style=\"clear:both;\">\u5171\u6709" + t.assesscount + "\u6761\u8bc4\u8bba</div>";
			p += "<span class=\"blank10\"></span><div class=\"fonttj\"><div></div></div>";
			p += "</div></div>";
		}
		if (!r) {
			p += "</div>";
			$("#" + g.container).append(p);
		} else {
			$("#pruarea1v2list").append(p);
		}
	};
	var d = function (m) {
		var k = "";
		for (var l = 1; l < 6; l++) {
			if (m >= 1) {
				m -= 1;
				k += "<span class=\"s_s1\"></span>";
			} else {
				if (m > 0) {
					m = 0;
					k += "<span class=\"s_s05\"></span>";
				} else {
					k += "<span class=\"s_s0\"></span>";
				}
			}
		}
		return k;
	};
	return {init:function (k) {
		$.extend(g, k);
		j();
	}};
})();
Array.indexOf || (Array.prototype.indexOf = function (b) {
	for (var a = this.length; a-- && this[a] !== b; ) {
	}
	return a;
});
$(document).ready(function () {
	$("#noproducts").hide();
	var e = function () {
		var f = $("#hidrowNum").val();
		var g = 0;
		if ($("#vanclListTotalRecords").length > 0) {
			g = isNaN(parseInt($("#vanclListTotalRecords").text())) ? 0 : parseInt($("#vanclListTotalRecords").text());
		} else {
			g = isNaN(parseInt($(".xgsp strong").text())) ? 0 : parseInt($(".xgsp strong").text());
		}
		var h = parseInt(Math.ceil(g / (f * 10)));
		vancl.search.vjiaproducts.init({enabled:true, vanclRecords:g, vanclTotalPages:h, container:"vjiaProductList", vanclcontainer:"vanclProductList", refValue:"ch_" + $("#hidChannelName").val() + "-" + $("#vjiaNavtype").val() + "-list-vjia", sourceValue:"vancl-" + $("#hidChannelName").val() + "-list", trackValue:$("#hidChannelName").val() + "-to-vjia", productImageWidth:170, productImageHeight:parseInt($("#hidImageHight").val()), pcid:$("#hidCateId").val(), displayType:$("#vjiaDisplayType").val(), browseType:$("#vjiaBrowsetype").val(), defaultsort:$("#vjiaOrderBy").val(), rowNum:f});
	};
	var b = function (h) {
		var f = h.offsetTop;
		var g = h.offsetParent;
		while (g !== null) {
			f += g.offsetTop;
			g = g.offsetParent;
		}
		return f;
	};
	var a = function () {
		var f;
		if (typeof f != "number") {
			if (document.compatMode == "CSS1Compat") {
				f = document.documentElement.clientHeight;
			} else {
				f = document.body.clientHeight;
			}
		}
		return f;
	};
	var c = b($("#vjiacheckout")[0]);
	var d = function () {
		var f = document.body.scrollTop | document.documentElement.scrollTop;
		if (c <= (a() + f)) {
			e();
			$(window).off("scroll", d);
		}
	};
	if (c <= (a() + (document.body.scrollTop | document.documentElement.scrollTop))) {
		$(window).load(e);
	} else {
		$(window).on("scroll", d);
	}
});
function AddParameter(c, k, f) {
	f = f.indexOf("#") >= 0 ? f.substr(0, f.indexOf("#")) : f;
	var h = decodeURIComponent(f);
	var e = h.indexOf("?");
	if (e < 0) {
		h = h + "?" + c + "=" + k;
	} else {
		var j = h.substr(0, e + 1);
		var g = h.substr(e + 1, h.length - e).split("&");
		var d;
		var a = false;
		for (var b = 0; b < g.length; b++) {
			d = g[b].split("=");
			if (d[0] == c) {
				g[b] = c + "=" + k;
				a = true;
				break;
			}
		}
		if (a) {
			h = j + g.join("&");
		} else {
			h = h + "&" + c + "=" + k;
		}
	}
	return h + location.hash;
}
function RemoveParameter(c, g) {
	g = g.indexOf("#") >= 0 ? g.substr(0, g.indexOf("#")) : g;
	g = decodeURIComponent(g);
	var e = g.indexOf("?");
	if (e > 0) {
		var h = g.substr(0, e + 1);
		var f = g.substr(e + 1, g.length - e).split("&");
		var d;
		var a = false;
		for (var b = 0; b < f.length; b++) {
			d = f[b].split("=");
			if (d[0] == c) {
				f.splice(b, 1);
				a = true;
				break;
			}
		}
		if (a) {
			g = h + f.join("&");
		}
	}
	return g + location.hash;
}
function QueryString() {
	var c, f, b;
	var e = location.href;
	e = e.indexOf("#") >= 0 ? e.substr(0, e.indexOf("#")) : e;
	var d = e.indexOf("?");
	e = e.substr(d + 1);
	var a = e.split("&");
	for (b = 0; b < a.length; b++) {
		d = a[b].indexOf("=");
		if (d > 0) {
			c = a[b].substring(0, d);
			f = a[b].substr(d + 1);
			this[c] = f;
		}
	}
}
var vjiaAd = {imageUrl:"http://i5.vanclimg.com/users/18/20130104/vancl-channeltwopag-jx_130104.jpg", imageLink:"http://mall.vjia.com/andostore", source:"vancl-Channeltwopag-jx", track:"ch_{0}-list-ad-vjia"};
stuHover = function () {
	var a;
	var d;
	for (var c = 0; c < document.styleSheets.length; c++) {
		for (var e = 0; e < document.styleSheets[c].rules.length; e++) {
			a = document.styleSheets[c].rules[e];
			if (a.selectorText.indexOf("LI:hover") != -1) {
				d = a.selectorText.replace(/LI:hover/gi, "LI.iehover");
				document.styleSheets[c].addRule(d, a.style.cssText);
			}
		}
	}
	var b = document.getElementById("w_nav").getElementsByTagName("LI");
	for (var c = 0; c < b.length; c++) {
		b[c].onmouseover = function () {
			this.className += " iehover";
		};
		b[c].onmouseout = function () {
			this.className = this.className.replace(new RegExp(" iehover\\b"), "");
		};
	}
};
if (window.attachEvent) {
	window.attachEvent("onload", stuHover);
}
$(document).ready(function () {
	$("#miookSearchBtn").click(function () {
		var a = 0;
		var c = document.getElementById("miookSearchTxt").value;
		if (c == "\u8bf7\u8f93\u5165\u5173\u952e\u8bcd") {
			document.getElementById("miookSearchTxt").value = "";
			c = "";
		} else {
			c = c.replace(">", "").replace("<", "");
		}
		var b = $(".awmiookLogo a").attr("href");
		if (b && b.charAt(b.length - 1) != "/") {
			b = b + "/";
		} else {
			if (b == null || b == "") {
				b = "http://miook.vancl.com/";
			}
		}
		window.location.href = b + "search?q=" + encodeURIComponent(c);
	});
	$("#miookSearchTxt").keydown(function (a) {
		if (a.keyCode == 13) {
			$("#miookSearchBtn").click();
		}
	}).focus(function () {
		var a = this.value;
		if (a == "\u8bf7\u8f93\u5165\u5173\u952e\u8bcd") {
			this.value = "";
		}
	}).blur(function () {
		var a = this.value;
		if (a.length == 0) {
			this.value = "\u8bf7\u8f93\u5165\u5173\u952e\u8bcd";
		}
	});
});
$(function () {
	$("#w_nav li").removeClass("topHover");
	$("#w_nav li a").crumbs({selectedFn:function () {
		this.parent().addClass("topHover");
	}, defaultNav:"#w_nav li a:last"});
	$("img[original]").lazyload();
	vancl.channel.productpop.init({showzoom:false, delayhide:false});
});

