
(function ($) {
	$.fn.extend({autocomplete:function (urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {url:isUrl ? urlOrData : null, data:isUrl ? null : urlOrData, delay:isUrl ? $.Autocompleter.defaults.delay : 10, max:options && !options.scroll ? 10 : 150}, options);
		options.highlight = options.highlight || function (value) {
			return value;
		};
		options.formatMatch = options.formatMatch || options.formatItem;
		return this.each(function () {
			new $.Autocompleter(this, options);
		});
	}, result:function (handler) {
		return this.bind("result", handler);
	}, search:function (handler) {
		return this.trigger("search", [handler]);
	}, flushCache:function () {
		return this.trigger("flushCache");
	}, setOptions:function (options) {
		return this.trigger("setOptions", [options]);
	}, unautocomplete:function () {
		return this.trigger("unautocomplete");
	}, noresult:function (handler) {
		return this.bind("noresult", handler);
	}});
	$.Autocompleter = function (input, options) {
		var KEY = {UP:38, DOWN:40, DEL:46, TAB:9, RETURN:13, ESC:27, COMMA:188, PAGEUP:33, PAGEDOWN:34, BACKSPACE:8};
		var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);
		var timeout;
		var previousValue = "";
		var cache = $.Autocompleter.Cache(options);
		var hasFocus = 0;
		var lastKeyPressCode;
		var config = {mouseDownOnSelect:false};
		var select = $.Autocompleter.Select(options, input, selectCurrent, config);
		var blockSubmit;
		$.browser.opera && $(input.form).bind("submit.autocomplete", function () {
			if (blockSubmit) {
				blockSubmit = false;
				return false;
			}
		});
		$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function (event) {
			hasFocus = 1;
			lastKeyPressCode = event.keyCode;
			switch (event.keyCode) {
			  case KEY.UP:
				event.preventDefault();
				if (select.visible()) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
			  case KEY.DOWN:
				event.preventDefault();
				if (select.visible()) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
			  case KEY.PAGEUP:
				event.preventDefault();
				if (select.visible()) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
			  case KEY.PAGEDOWN:
				event.preventDefault();
				if (select.visible()) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			  case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			  case KEY.TAB:
			  case KEY.RETURN:
				if (selectCurrent()) {
					event.preventDefault();
					blockSubmit = true;
					return false;
				} else {
					$input.trigger("noresult");
				}
				break;
			  case KEY.ESC:
				select.hide();
				break;
			  default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
			}
		}).focus(function () {
			hasFocus++;
		}).blur(function () {
			hasFocus = 0;
			if (!config.mouseDownOnSelect) {
				hideResults();
			}
		}).click(function () {
			if (hasFocus++ > 1 && !select.visible()) {
				onChange(0, true);
			}
		}).bind("search", function () {
			var fn = (arguments.length > 1) ? arguments[1] : null;
			function findValueCallback(q, data) {
				var result;
				if (data && data.length) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].result.toLowerCase() == q.toLowerCase()) {
							result = data[i];
							break;
						}
					}
				}
				if (typeof fn == "function") {
					fn(result);
				} else {
					$input.trigger("result", result && [result.data, result.value]);
				}
			}
			$.each(trimWords($input.val()), function (i, value) {
				request(value, findValueCallback, findValueCallback);
			});
		}).bind("flushCache", function () {
			cache.flush();
		}).bind("setOptions", function () {
			$.extend(options, arguments[1]);
			if ("data" in arguments[1]) {
				cache.populate();
			}
		}).bind("unautocomplete", function () {
			select.unbind();
			$input.unbind();
			$(input.form).unbind(".autocomplete");
		}).bind("input", function () {
			onChange(0, true);
		});
		function selectCurrent() {
			var selected = select.selected();
			if (!selected) {
				return false;
			}
			var v = selected.result;
			previousValue = v;
			if (options.multiple) {
				var words = trimWords($input.val());
				if (words.length > 1) {
					var seperator = options.multipleSeparator.length;
					var cursorAt = $(input).selection().start;
					var wordAt, progress = 0;
					$.each(words, function (i, word) {
						progress += word.length;
						if (cursorAt <= progress) {
							wordAt = i;
							return false;
						}
						progress += seperator;
					});
					words[wordAt] = v;
					v = words.join(options.multipleSeparator);
				}
				v += options.multipleSeparator;
			}
			$input.val(v);
			hideResultsNow();
			$input.trigger("result", [selected.data, selected.value, selected.idx]);
			return true;
		}
		function onChange(crap, skipPrevCheck) {
			if (lastKeyPressCode == KEY.DEL) {
				select.hide();
				return;
			}
			var currentValue = $input.val();
			if (!skipPrevCheck && currentValue == previousValue) {
				return;
			}
			previousValue = currentValue;
			currentValue = lastWord(currentValue);
			if (currentValue.length >= options.minChars) {
				$input.addClass(options.loadingClass);
				if (!options.matchCase) {
					currentValue = currentValue.toLowerCase();
				}
				request(currentValue, receiveData, hideResultsNow);
			} else {
				stopLoading();
				select.hide();
			}
		}
		function trimWords(value) {
			if (!value) {
				return [""];
			}
			if (!options.multiple) {
				return [$.trim(value)];
			}
			return $.map(value.split(options.multipleSeparator), function (word) {
				return $.trim(value).length ? $.trim(word) : null;
			});
		}
		function lastWord(value) {
			if (!options.multiple) {
				return value;
			}
			var words = trimWords(value);
			if (words.length == 1) {
				return words[0];
			}
			var cursorAt = $(input).selection().start;
			if (cursorAt == value.length) {
				words = trimWords(value);
			} else {
				words = trimWords(value.replace(value.substring(cursorAt), ""));
			}
			return words[words.length - 1];
		}
		function autoFill(q, sValue) {
			if (options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE) {
				$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
				$(input).selection(previousValue.length, previousValue.length + sValue.length);
			}
		}
		function hideResults() {
			clearTimeout(timeout);
			timeout = setTimeout(hideResultsNow, 200);
		}
		function hideResultsNow() {
			var wasVisible = select.visible();
			select.hide();
			clearTimeout(timeout);
			stopLoading();
			if (options.mustMatch) {
				$input.search(function (result) {
					if (!result) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : ""));
						} else {
							$input.val("");
							$input.trigger("result", null);
						}
					}
				});
			}
		}
		function receiveData(q, data) {
			if (data && data.length && hasFocus) {
				stopLoading();
				select.display(data, q);
				autoFill(q, data[0].value);
				select.show();
			} else {
				hideResultsNow();
			}
		}
		function request(term, success, failure) {
			if (!options.matchCase) {
				term = term.toLowerCase();
			}
			var data = cache.load(term);
			if (data && data.length) {
				success(term, data);
			} else {
				if ((typeof options.url == "string") && (options.url.length > 0)) {
					var extraParams = {};
					$.each(options.extraParams, function (key, param) {
						extraParams[key] = typeof param == "function" ? param() : param;
					});
					$.ajax({mode:"abort", port:"autocomplete" + input.name, dataType:options.dataType, jsonpCallback:"jqautocompletecallback", cache:true, url:options.url, data:$.extend({k:lastWord(term), limit:options.max}, extraParams), success:function (data) {
						var parsed = options.parse && options.parse(data) || parse(data);
						cache.add(term, parsed);
						success(term, parsed);
					}});
				} else {
					select.emptyList();
					failure(term);
				}
			}
		}
		function parse(data) {
			var parsed = [];
			var json = eval(data);
			if (json.length > 0) {
				for (var i = 0; i < json.length; i++) {
					parsed.push({data:json[i], value:json[i], result:json[i].name, idx:i});
				}
			}
			return parsed;
		}
		function stopLoading() {
			$input.removeClass(options.loadingClass);
		}
	};
	$.Autocompleter.defaults = {inputClass:"ac_input", resultsClass:"ac_results", loadingClass:"ac_loading", minChars:1, delay:400, matchCase:false, matchSubset:false, matchContains:false, cacheLength:10, max:100, mustMatch:false, extraParams:{}, selectFirst:true, formatItem:function (row) {
		return row[0];
	}, formatMatch:null, autoFill:false, width:0, multiple:false, multipleSeparator:", ", highlight:function (value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	}, scroll:false, scrollHeight:180};
	$.Autocompleter.Cache = function (options) {
		var data = {};
		var length = 0;
		function matchSubset(s, sub) {
			if (!options.matchCase) {
				s = s.toLowerCase();
			}
			var i = s.indexOf(sub);
			if (options.matchContains == "word") {
				i = s.toLowerCase().search("\\b" + sub.toLowerCase());
			}
			if (i == -1) {
				return false;
			}
			return i == 0 || options.matchContains;
		}
		function add(q, value) {
			if (length > options.cacheLength) {
				flush();
			}
			if (!data[q]) {
				length++;
			}
			data[q] = value;
		}
		function populate() {
			if (!options.data) {
				return false;
			}
			var stMatchSets = {}, nullData = 0;
			if (!options.url) {
				options.cacheLength = 1;
			}
			stMatchSets[""] = [];
			for (var i = 0, ol = options.data.length; i < ol; i++) {
				var rawValue = options.data[i];
				rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
				var value = options.formatMatch(rawValue, i + 1, options.data.length);
				if (value === false) {
					continue;
				}
				var firstChar = value.charAt(0).toLowerCase();
				if (!stMatchSets[firstChar]) {
					stMatchSets[firstChar] = [];
				}
				var row = {value:value, data:rawValue, result:options.formatResult && options.formatResult(rawValue) || value};
				stMatchSets[firstChar].push(row);
				if (nullData++ < options.max) {
					stMatchSets[""].push(row);
				}
			}
			$.each(stMatchSets, function (i, value) {
				options.cacheLength++;
				add(i, value);
			});
		}
		setTimeout(populate, 25);
		function flush() {
			data = {};
			length = 0;
		}
		return {flush:flush, add:add, populate:populate, load:function (q) {
			if (!options.cacheLength || !length) {
				return null;
			}
			if (!options.url && options.matchContains) {
				var csub = [];
				for (var k in data) {
					if (k.length > 0) {
						var c = data[k];
						$.each(c, function (i, x) {
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}
				return csub;
			} else {
				if (data[q]) {
					return data[q];
				} else {
					if (options.matchSubset) {
						for (var i = q.length - 1; i >= options.minChars; i--) {
							var c = data[q.substr(0, i)];
							if (c) {
								var csub = [];
								$.each(c, function (i, x) {
									if (matchSubset(x.value, q)) {
										csub[csub.length] = x;
									}
								});
								return csub;
							}
						}
					}
				}
			}
			return null;
		}};
	};
	$.Autocompleter.Select = function (options, input, select, config) {
		var CLASSES = {ACTIVE:"ac_over"};
		var listItems, active = -1, data, term = "", needsInit = true, element, list;
		function init() {
			if (!needsInit) {
				return;
			}
			element = $("<div/>").hide().addClass(options.resultsClass).css("position", "absolute").appendTo(document.body);
			list = $("<ul/>").appendTo(element).mouseover(function (event) {
				if (target(event).nodeName && target(event).nodeName.toUpperCase() == "LI") {
					active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
					$(target(event)).addClass(CLASSES.ACTIVE);
				}
			}).click(function (event) {
				$(target(event)).addClass(CLASSES.ACTIVE);
				select();
				input.focus();
				return false;
			}).mousedown(function () {
				config.mouseDownOnSelect = true;
			}).mouseup(function () {
				config.mouseDownOnSelect = false;
			});
			if (options.width > 0) {
				element.css("width", options.width);
			}
			needsInit = false;
		}
		function target(event) {
			var element = event.target;
			while (element && element.tagName != "LI") {
				element = element.parentNode;
			}
			if (!element) {
				return [];
			}
			return element;
		}
		function moveSelect(step) {
			listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
			movePosition(step);
			var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
			if (options.scroll) {
				var offset = 0;
				listItems.slice(0, active).each(function () {
					offset += this.offsetHeight;
				});
				if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
					list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
				} else {
					if (offset < list.scrollTop()) {
						list.scrollTop(offset);
					}
				}
			}
		}
		function movePosition(step) {
			active += step;
			if (active < 0) {
				active = listItems.size() - 1;
			} else {
				if (active >= listItems.size()) {
					active = 0;
				}
			}
		}
		function limitNumberOfItems(available) {
			return options.max && options.max < available ? options.max : available;
		}
		function fillList() {
			list.empty();
			var max = limitNumberOfItems(data.length);
			for (var i = 0; i < max; i++) {
				if (!data[i]) {
					continue;
				}
				var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
				if (formatted === false) {
					continue;
				}
				var li = $("<li/>").html(options.highlight(formatted, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
				$.data(li, "ac_data", data[i]);
			}
			listItems = list.find("li");
			if (options.selectFirst) {
				listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
				active = 0;
			}
			if ($.fn.bgiframe) {
				list.bgiframe();
			}
		}
		return {display:function (d, q) {
			init();
			data = d;
			term = q;
			fillList();
		}, next:function () {
			moveSelect(1);
		}, prev:function () {
			moveSelect(-1);
		}, pageUp:function () {
			if (active != 0 && active - 8 < 0) {
				moveSelect(-active);
			} else {
				moveSelect(-8);
			}
		}, pageDown:function () {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect(listItems.size() - 1 - active);
			} else {
				moveSelect(8);
			}
		}, hide:function () {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		}, visible:function () {
			return element && element.is(":visible");
		}, current:function () {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		}, show:function () {
			var offset = $(input).offset();
			var offsetleft = offset.left;
			var bodyleft = $("#Head").offset().left;
			if ($(document.body).css("position") == "relative") {
				offsetleft = offsetleft - bodyleft;
			}
			element.css({width:typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(), top:offset.top + input.offsetHeight, left:offsetleft}).show();
			if (options.scroll) {
				list.scrollTop(0);
				list.css({maxHeight:options.scrollHeight, overflow:"auto"});
				if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function () {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
					list.css("height", scrollbarsVisible ? options.scrollHeight : listHeight);
					if (!scrollbarsVisible) {
						listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")));
					}
				}
			}
		}, selected:function () {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		}, emptyList:function () {
			list && list.empty();
		}, unbind:function () {
			element && element.remove();
		}};
	};
	$.fn.selection = function (start, end) {
		if (start !== undefined) {
			return this.each(function () {
				if (this.createTextRange) {
					var selRange = this.createTextRange();
					if (end === undefined || start == end) {
						selRange.move("character", start);
						selRange.select();
					} else {
						selRange.collapse(true);
						selRange.moveStart("character", start);
						selRange.moveEnd("character", end);
						selRange.select();
					}
				} else {
					if (this.setSelectionRange) {
						this.setSelectionRange(start, end);
					} else {
						if (this.selectionStart) {
							this.selectionStart = start;
							this.selectionEnd = end;
						}
					}
				}
			});
		}
		var field = this[0];
		if (field.createTextRange) {
			var range = document.selection.createRange(), orig = field.value, teststring = "<->", textLength = range.text.length;
			range.text = teststring;
			var caretAt = field.value.indexOf(teststring);
			field.value = orig;
			this.selection(caretAt, caretAt + textLength);
			return {start:caretAt, end:caretAt + textLength};
		} else {
			if (field.selectionStart !== undefined) {
				return {start:field.selectionStart, end:field.selectionEnd};
			}
		}
	};
})(jQuery);
function showDropMenu(a) {
	a.className = "hover";
}
function hideDropMenu(a) {
	a.className = "active";
}
function bookmarksite(a, b) {
	if (document.all) {
		window.external.AddFavorite(b, a);
	} else {
		if (window.sidebar) {
			window.sidebar.addPanel(a, b, "");
		}
	}
}
function OnEnter(b) {
	var a = $.trim($("#skey").attr("defaultkey"));
	if (typeof (a) != "undefined" && a != "") {
		if ($.trim(b.value) == $.trim(b.defaultValue)) {
			b.value = "";
		}
	}
}
function OnExit(a) {
}
function OnKeyUp(a) {
}
function Search(e, b, f, d) {
	e = $.trim(e);
	var g = "";
	if (typeof (d) != "undefined" && d != null) {
		g = "s-hp_s-0_keyword_auto-";
		if (typeof (b) != "undefined" && b != null) {
			g += b;
		} else {
			g += "0";
		}
		g += "-" + d;
	} else {
		g = "s-hp_s-0_keyword-0";
	}
	trackurl(g);
	var c = $.trim($("#skey").attr("defaultkey"));
	if (typeof (c) != "undefined" && c != "") {
		if (e == "\u641c " + c + " \u8bd5\u8bd5") {
			e = c;
		}
	}
	var h = "search";
	if (typeof (b) != "undefined" && b != null) {
		h = b + ".html";
	}
	var a = "";
	if (typeof (f) != "undefined" && f != null) {
		a = "&orig=" + f;
	}
	//window.location.href = "http://s.vancl.com/" + h + "?k=" + encodeURIComponent(e) + a;
	window.location.href = webroot+"site/search_list/word/" + encodeURIComponent(e) ;
}
var VANCL = VANCL || {};
VANCL.Global = {setLoginInfo:function () {
	var c = this.getCookie("UserLogin");
	if (c != "") {
		if (c != null && c != "" && c.length > 0) {
			var a = c.split("&");
			for (var b = 0; b < a.length; b++) {
				if (a[b].indexOf("NewUserName=") == 0) {
					var d = a[b].substring(12);
					d = decodeURIComponent(d);
					d = this._sub(d, 10);
					$("#welcome").html("\u60a8\u597d, <a href='http://my.vancl.com' class='top track' name='head-denglu' style='color: rgb(51, 51, 51);'>" + d + "</a> <span style='color: #a10000'><a class='top track' style='color: #a10000'  href='https://login.vancl.com/Login/UserLoginOut.aspx' target='_parent' name='head-tcdl' >\u9000\u51fa\u767b\u5f55</a>&nbsp;|&nbsp;<a class='track' name='head-ghyh' href=\"javascript:location.href='https://login.vancl.com/login/login.aspx?'+location.href\" style='color: #a10000'>\u66f4\u6362\u7528\u6237</a></span>");
					break;
				}
			}
		}
	}
}, getCookie:function (b) {
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
			a = document.cookie.substring(offset, end);
		}
	}
	return a;
}, _sub:function (e, c) {
	var d = /[^\x00-\xff]/g;
	if (e.replace(d, "mm").length <= c) {
		return e;
	}
	var b = Math.floor(c / 2);
	for (var a = b; a < e.length; a++) {
		if (e.substr(0, a).replace(d, "mm").length >= c) {
			return e.substr(0, a) + "...";
		}
	}
	return e;
}};
var VANCL = VANCL || {};
VANCL.MiniCart = {config:{mcCountId:"shoppingcar_product_totalcount", mcProductWrapperId:"minishoppingcar_have_product", mcNoProductWrapperId:"minishoppingcar_no_product", mcShoppingCartUrl:"http://shopping.vancl.com/mycart", gettting:0}, setCartNum:function () {
	var e = this, a = this.config, d = 0;
	var c = e._getCartCookie();
	if (c) {
		var b = c.split("$");
		if (b.length > 1 && b[1] != null) {
			d = b[1];
		}
	}
	$("#" + a.mcCountId).html(d + "");
}, getCart:function () {
	var b = this, a = this.config;
	if (a.gettting) {
		return;
	}
	b._ajaxProductJsonData();
	b.trackSBU();
}, _showLoading:function () {
	var b = this, a = this.config;
	$("#" + a.mcNoProductWrapperId).hide();
	$("#" + a.mcProductWrapperId).html("<div style=\"text-align:center; vertical-align:middle;\"><img src=\"http://i.vanclimg.com/alterorder/loading.gif\" alt=\"\u8d2d\u7269\u8f66\u6570\u636e\u52a0\u8f7d\u4e2d\" /></div>");
}, _ajaxProductJsonData:function () {
	var c = this, a = this.config;
	c._showLoading();
	c._log("_ajaxProductJsonData");
	var b = {userId:c._getEncryptUserIdFromCookie(), indexPage:1, pageSize:7, shoppingcart:"", shoppingpointcart:"", shoppingPresent:""};
	var d = "http://minicart.vancl.com/DealMiniShoppingServer.asmx/GetMiniJsonDataByPage?callback=?";
	$.ajax({contentType:"application/json;utf-8", url:d, data:b, dataType:"json", success:function (e) {
		c._callbackProductJsonData(e);
		c._setCartCookie(e);
	}, error:function (e) {
		$("#" + a.mcProductWrapperId).hide();
		$("#" + a.mcNoProductWrapperId).show();
		$("#" + a.mcCountId).html("0");
	}});
}, _callbackProductJsonData:function (d, f, e) {
	var k = 0, g = this, a = this.config, c = [], h = "http://i.vanclimg.com/36";
	g._log("_callbackProductJsonData");
	if (d && d.data && d.data.length > 0) {
		k = d.TotalCount;
		c.push("<h2>\u6700\u8fd1\u52a0\u5165\u7684\u5546\u54c1\uff1a</h2>");
		c.push("<ul>");
		$.each(d.data, function (m) {
			var n = this["productImageUrl"], s = this["ProductUrl"], o = this["ProductName"], q = this["ProductPrice"], v = this["Qty"], l = this["clothesCode"], r = this["productType"], t = this["PromoteeId"], u = this["PromoteeIndex"], p = o;
			if (o.length > 14) {
				p = o.substring(0, 14) + "\u2026";
			}
			if ("https:" == document.location.protocol) {
				h = "https://sslimg.vancl.com/36";
			}
			if (n.indexOf("https://sslimg.vancl.com")) {
				n = h + n.substring(23);
			} else {
				if (n.indexOf("https://sslimg.vanclimg.com")) {
					n = h + n.substring(26);
				} else {
					if (n.indexOf("http://images.vancl.com")) {
						n = h + n.substring(22);
					} else {
						if (n.indexOf("http://i.vanclimg.com")) {
							n = h + n.substring(20);
						}
					}
				}
			}
			c.push("<li>");
			c.push("<div class=\"carListLeft\">");
			c.push("    <a href=\"" + s + "\"><img src=\"" + n + "\" alt=\"" + o + "\" width=\"36\" heigth=\"36\" /></a>");
			c.push("</div>");
			c.push("<div class=\"carListRight\">");
			c.push("    <h3><a href=\"" + s + "\" title=\"" + o + "\">" + p + "</a></h3>");
			c.push("    <span class=\"blank0\"></span>");
			c.push("    <div class=\"priceArea\">");
			c.push("        <span><a class=\"track\" name=\"head-minicart-delproduct\" href=\"javascript:void(0);\" onclick=\"VANCL.MiniCart.deleteProduct('" + l + "','" + r + "','" + t + "','" + u + "','" + v + "','" + q + "')\">\u5220\u9664</a></span>");
			c.push("        <strong>\uffe5" + q + "</strong><em>\xd7" + v + "</em>");
			c.push("    </div>");
			c.push("</div>");
			c.push("<span class=\"blank0\"></span>");
			c.push("</li>");
		});
		c.push("</ul>");
		c.push("<span class=\"blank10\"></span>");
		$("#" + a.mcNoProductWrapperId).hide();
		var b = function (l) {
			g._log("defaultCallcack:" + l);
			c.push("<div class=\"ShopCarPage\">");
			c.push("    <div class=\"SCtotalpage\">");
			c.push("        <div>\u8d2d\u7269\u8f66\u4e2d\u5171\u6709 <span car_product_total=\"shoppingCar_product_totalcount\" id=\"shoppingcar_product_totalcount\">" + k + "</span> \u4ef6\u5546\u54c1</div>");
			c.push("        <strong><a class=\"track\" name=\"head-minicart-shopping\" href=\"" + a.mcShoppingCartUrl + "\" rel=\"nofollow\"></a></strong>");
			c.push("    </div>");
			c.push("</div>");
			c.push("<span class=\"blank5\"></span>");
			$("#" + a.mcProductWrapperId).show().html(c.join(""));
		};
		var j = function (l) {
			g._log("successCallback" + l);
			c.push("<div class=\"ShopCarPage\">");
			c.push("    <div class=\"SCtotalpage\">");
			c.push("        <div>\u8d2d\u7269\u8f66\u4e2d\u5171\u6709 <span car_product_total=\"shoppingCar_product_totalcount\" id=\"shoppingcar_product_totalcount\">" + k + "</span> \u4ef6\u5546\u54c1</div>");
			c.push("        <div class=\"buymini_topBtn buymini_paybtn\" >");
			c.push("            <a class=\"track\" name=\"head-minicart-buynow\" href=\"//buy.vancl.com/?from=minicart\" rel=\"nofollow\"></a>");
			c.push("            <strong><a class=\"track\" name=\"head-minicart-gocart\" href=\"" + a.mcShoppingCartUrl + "\" rel=\"nofollow\"></a></strong>");
			c.push("        </div>");
			c.push("    </div>");
			c.push("</div>");
			c.push("<span class=\"blank5\"></span>");
			$("#" + a.mcProductWrapperId).show().html(c.join(""));
		};
		g._ajaxCheckoutNowJsonData(b, j, function () {
		});
		a.gettting = !0;
	} else {
		$("#" + a.mcNoProductWrapperId).show();
		$("#" + a.mcProductWrapperId).hide();
	}
	$("#" + a.mcCountId).html(k + "");
}, _ajaxCheckoutNowJsonData:function (b, e, c) {
	var d = this, a = this.config;
	d._log("_ajaxCheckoutNowJsonData");
	$.ajax({url:"http://item.vancl.com/api/buynow.aspx", dataType:"jsonp", success:function (f) {
		if (f && f.msg) {
			if (f.msg.toLowerCase() === "y") {
				d.statisticsCheckoutNowPV();
				e(f.msg.toLowerCase());
			} else {
				b(f.msg.toLowerCase());
			}
		} else {
			b();
		}
	}, error:function () {
		b();
	}});
}, deleteProduct:function (b, e, f, g, h, d) {
	var j = this, a = this.config;
	j._showLoading();
	var c = {userId:j._getEncryptUserIdFromCookie(), indexPage:1, pageSize:7, clotheCode:b, productType:e, PromoteeId:f, PromoteeIdIndex:g, shoppingcart:"", shoppingpointcart:"", shoppingPresent:""};
	var k = "http://minicart.vancl.com/DealMiniShoppingServer.asmx/DelMiniJsonProduct?callback=?";
	$.ajax({contentType:"application/json;utf-8", data:c, dataType:"json", url:k, success:function (l) {
		j._callbackProductJsonData(l);
		j._setCartCookie(l, h, d);
	}, error:function (l) {
		$("#" + a.mcProductWrapperId).hide();
		$("#" + a.mcNoProductWrapperId).show();
		$("#" + a.mcCountId).html("0");
	}});
}, _setCartCookie:function (f, h, g) {
	var k = 0, j = this, a = this.config, b = [];
	j._log("_setCartCookie");
	if (f && f.data) {
		k = f.TotalCount;
		var d = f.delStaues;
		var c = j._getCartCookie();
		if (c) {
			b = c.split("$");
		}
		if (b.length > 1) {
			if (parseInt(b[1]) == k) {
				return;
			}
			if (d == "ok" && h != null && g != null) {
				h = h == null ? 1 : h;
				g = g == null ? 0 : parseFloat(g);
				b[1] = parseInt(b[1]) - h;
				b[0] = parseInt(b[0]) - h * g;
			}
			if (parseInt(b[1]) != k) {
				b[1] = k;
			}
			var e = new Date();
			if (k == 0) {
				e.setTime(e.getTime() - 15 * 24 * 60 * 60 * 1000);
			} else {
				e.setTime(e.getTime() + 15 * 24 * 60 * 60 * 1000);
			}
			j._setShoppingCookie("ShoppingCarInfo", b[0] + "$" + b[1], e, false);
		}
	}
	$("#" + a.mcCountId).html(k + "");
}, _getCartCookie:function () {
	this._log("_getCartCookie");
	return this._getShoppingCookie("ShoppingCarInfo", false);
}, _getShoppingCookie:function (a, b) {
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
}, _setShoppingCookie:function (a, d, c, b) {
	document.cookie = a + "=" + (b ? escape(d) : d) + ((c == null) ? ";" : ";expires=" + c + ";") + "path=/;domain=.vancl.com;";
}, _getEncryptUserIdFromCookie:function () {
	var e = VANCL.Global.getCookie("UserLogin");
	if (e != null && e != "" && e.length > 0) {
		var c = e.split("&");
		if (c.length > 0) {
			var a = c[0].replace("UserID=", "");
			return a;
		}
	}
	var d = VANCL.Global.getCookie("_vuca");
	if (d != null && d != "" && d.length > 0) {
		var b = d.split("@");
		if (b.length > 0) {
			return b[0];
		}
	}
	return "0";
}, trackSBU:function () {
	this._log("trackSBU");
	var j = VANCL.Global.getCookie("_vuca");
	if (j != null) {
		var h = document.location.href;
		var d = ["ref=", "source="];
		for (var b = 0; b < d.length; b++) {
			var f = h.indexOf(d[b]);
			if (f > -1) {
				var g = h.substring(f, h.length);
				h = h.substring(0, f);
				if (g.indexOf("&") > -1) {
					h += g.substring(g.indexOf("&") + 1);
				}
			}
		}
		var c = h.length - 1;
		if (h[c] == "&") {
			h = h.substring(0, c);
			c = h.length - 1;
		}
		if (h[c] == "?") {
			h = h.replace(h[c], "");
		}
		try {
			$.getScript("http://counter.vanclimg.com/kv/sbu_" + j + "/?value=" + encodeURIComponent(h));
		}
		catch (a) {
		}
	}
}, statisticsCheckoutNowPV:function () {
	this._log("statisticsCheckoutNowPV");
	var b = function () {
		var f = function (j) {
			if (j < 10) {
				return "0" + j;
			}
			return j;
		};
		var c = new Date();
		var h = c.getFullYear();
		var g = f(c.getMonth() + 1);
		var e = f(c.getDate());
		var d = h + "" + g + "" + e;
		return d;
	};
	try {
		$.getScript("http://counter.vanclimg.com/counter?key=head_minicart_pv_" + b());
	}
	catch (a) {
	}
}, _log:function (a) {
}};
$.fn.extend({renderVanclHeadView:function () {
	var g = {viewId:"sub_floor_menus", hideDelay:0.2};
	g.container = this;
	function h() {
		var j = $("li.MenuItem", g.container);
		j.each(function (k) {
			$(this).mouseenter(function () {
				var l = k;
				g.index = l;
				g.status = "visiable";
				if (!g.viewer) {
					if (!g.viewerHtml) {
						a();
						return;
					}
					d();
				}
				g.showTimer && clearTimeout(g.showTimer);
				g.showTimer = setTimeout(function () {
					f(g.index);
					e();
				}, g.hideDelay * 1000);
				g.hideTimer = clearTimeout(g.hideTimer);
			}).mouseleave(function () {
				g.status = "hidden";
				g.showTimer && clearTimeout(g.showTimer);
				if (g.hideTimer) {
					return;
				}
				g.hideTimer = setTimeout(function () {
					b();
					g.hideTimer = clearTimeout(g.hideTimer);
				}, g.hideDelay * 1000);
			});
		});
	}
	function d() {
		g.viewer || $("#" + g.viewId).length || (g.viewer = $("<div></div>"), $(g.viewer).attr({id:g.viewId, "class":"sub-floor-menus"}).css({position:"absolute", left:"0px", top:"0px"}).hide(), $(g.viewer).html(g.viewerHtml), g.container.append(g.viewer), c());
	}
	function c() {
		g.subViews = $("div.menu", g.container);
		g.subViews.each(function () {
			var j = this;
			$(j).mouseenter(function () {
				g.hideTimer = clearTimeout(g.hideTimer);
				g.selectedSubView = j;
			}).mouseleave(function () {
				g.hideTimer = setTimeout(function () {
					b();
					g.hideTimer = clearTimeout(g.hideTimer);
				}, g.hideDelay * 1000);
			});
		});
	}
	function f(k) {
		var j = g.subViews;
		j.each(function () {
			$(this).hide();
		});
		if (k >= 6) {
			j.eq(k).css({left:"359px"});
		}
		j.eq(k).show();
	}
	function e() {
		g.viewer.show();
	}
	function b() {
		if (g.viewer) {
			g.viewer.hide();
		}
	}
	function a() {
		if ($("#" + g.viewId).length > 0 && $("#" + g.viewId).html() !== "") {
			g.viewer = $("#" + g.viewId);
			c();
			if ("hidden" == g.status) {
				return;
			}
			f(g.index);
			e();
			g.getting = !0;
		}
		if (g.getting) {
			return;
		}
		var j = ("https:" == document.location.protocol ? "https://shopping.vancl.com" : "http://page.vanclimg.com") + "/all_sub_cat_asyn.ashx";
		$.ajax({cache:true, url:j, dataType:"JSONP", data:jQuery.param({area:(window.area || ""), timespan:"20121206112658"}), jsonp:"jsoncallback", jsonpCallback:"_subCatCallback", success:function (k) {
			if (k && k.subcats) {
				g.viewerHtml = k.subcats;
				d();
				if ("hidden" == g.status) {
					return;
				}
				f(g.index);
				e();
				g.getting = !0;
			}
		}});
	}
	h();
}});
$(function () {
	function b(d) {
		if ($("#searchWordsAllbody", d).length == 0) {
			//var e = "http://page.vanclimg.com/getmorehotkeywords.ashx";
			var e = document.location.protocol + "//" + domain + "site/keywords";
			$.ajax({cache:true, url:e, dataType:"jsonp", data:jQuery.param({area:(window.area || ""), timespan:"20121206112658"}), jsonp:"jsoncallback", jsonpCallback:"_hotkeywordCallback", success:function (f) {
				if (f && f.keywords) {
					$(d).append(f.keywords);
					d.className = "hover";
				}
			}, error:function (f) {
			}});
		} else {
			d.className = "hover";
		}
	}
	function a() {
		VANCL.MiniCart.setCartNum();
		$("#shoppingCarNone").mouseenter(function () {
			//VANCL.MiniCart.getCart();
			VANCL.MiniCart._showLoading();
			mycartLateCall.start();
			this.className = "hover";
		}).mouseleave(function () {
		mycartLateCall.stop();
			this.className = "active";
		});
		$("#myVancl").mouseenter(function () {
			this.className = "hover";
		}).mouseleave(function () {
			this.className = "active";
		});
		$("#vanclMap").mouseenter(function () {
			this.className = "hover";
		}).mouseleave(function () {
			this.className = "active";
		});
		$(".hotLine span a").attr("href", "javascript:bookmarksite('\u9f50\u7231\u6dd8: \u4e92\u8054\u7f51\u4f18\u54c1\u8d28\u5546\u57ce', 'http://www.qiaitao.com');");
		$("#skey").click(function () {
			OnEnter(this);
		});
		$("#skey").blur(function () {
			OnExit(this);
		});
		$("#skey").keyup(function (d) {
			OnKeyUp(d, this);
		});
		$("input.searchBtn").click(function () {
			Search($("#skey").val(), null, 3);
		});
		$("#searchWordsMore").mouseenter(function () {
			b(this);
		}).mouseleave(function () {
			this.className = "active";
		});
	}
	function c() {
		VANCL.Global.setLoginInfo();
		a();
		if ($.fn.renderVanclHeadView) {
			$("#subNav").renderVanclHeadView();
		}
		if ($.fn.autocomplete) {
			$("#skey").autocomplete("http://s.vancl.com/common/autocompletes", {delay:10, dataType:"jsonp", minChars:1, max:13, width:300, matchContains:false, selectFirst:false, formatItem:function (g, d, f) {
				var e = "<span class=\"ks-suggest-key\">" + g.name;
				if (g.categoryname) {
					e += " \u5728 <font color=\"#A10000\"><b>" + g.categoryname + "</b></font> \u4e2d\u641c\u7d22";
				}
				e += "</span>";
				if (g.count && parseInt(g.count) > 0) {
					e += "<span class=\"ks-suggest-result\">\u7ea6" + g.count + "\u6761</span>";
				}
				return e;
			}, formatMatch:function (f, d, e) {
				return f.name;
			}, highlight:null}).result(function (e, d, g, f) {
				Search(d.name, d.categoryid, 3, f);
			}).noresult(function (d) {
				Search($("#skey").val(), null, 3);
			});
		}
	}
	if ($("#Head").html() === "") {
		$.ajax({dataType:"text", url:"/public/common.aspx", success:function (g) {
			var f = document.createElement("DIV");
			f.innerHTML = g;
			var d = $(f);
			var e = d.find("#Head");
			$("#Head").html(e.children());
			$("#footer").html(d.find("#bottom"));
			c();
		}, error:function (d) {
		}});
	} else {
		if ($("#welcome").length > 0) {
			c();
		}
	}
});
var VA_GLOBAL = {};
VA_GLOBAL.namespace = function (c) {
	var a = c.split("."), b = VA_GLOBAL;
	for (i = (a[0] == "VA_GLOBAL") ? 1 : 0; i < a.length; i++) {
		b[a[i]] = b[a[i]] || {};
		b = b[a[i]];
	}
};
VA_GLOBAL.namespace("Lang");
VA_GLOBAL.Lang.trim = function (a) {
	return a.replace(/^\s+|\s+$/g, "");
};
VA_GLOBAL.Lang.isEmpty = function (a) {
	return /^\s*$/.test(a);
};
VA_GLOBAL.Lang.isNone = function (a) {
	return ((typeof a == "undefined") || a == null || ((typeof a == "string") && VA_GLOBAL.Lang.trim(a) == "") || a == "undefined");
};
VA_GLOBAL.Lang.isNumber = function (a) {
	return !isNaN(a);
};
VA_GLOBAL.Lang.random = function (b, c) {
	var a = c - b + 1;
	return Math.floor(Math.random() * a + b);
};
VA_GLOBAL.Lang.dateTimeStrWms0 = function (b) {
	try {
		var b = new Date();
		var j = b.getFullYear();
	}
	catch (c) {
		b = new Date();
	}
	var f = b.getMonth() + 1;
	f = f < 10 ? "0" + f : "" + f;
	var a = b.getDate();
	a = a < 10 ? "0" + a : "" + a;
	var d = b.getHours();
	d = d < 10 ? "0" + d : "" + d;
	var e = b.getMinutes();
	e = e < 10 ? "0" + e : "" + e;
	var h = b.getSeconds();
	h = h < 10 ? "0" + h : "" + h;
	var g = b.getMilliseconds();
	if (g < 10) {
		g = "00" + g;
	} else {
		if (g < 100) {
			g = "0" + g;
		}
	}
	return b.getFullYear() + f + a + d + e + h + g;
};
VA_GLOBAL.Lang.timeSeq32 = function () {
	return VA_GLOBAL.Lang.dateTimeStrWms0() + VA_GLOBAL.Lang.random(100000000000000, 999999999999999);
};
VA_GLOBAL.namespace("Http");
VA_GLOBAL.Http = {isIp:function (a) {
	var b = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
	return (b.test(a));
}, getQueryStringArgs:function () {
	var g = (location.search.length > 0 ? location.search.substring(1) : "");
	var a = {};
	var e = g.split("&");
	var d = null, f = null, j = null;
	for (var c = 0; c < e.length; c++) {
		d = e[c].split("=");
		if (d.length > 1) {
			try {
				f = decodeURIComponent(d[0]);
				j = decodeURIComponent(d[1]);
				a[f] = j;
			}
			catch (h) {
			}
		}
	}
	var b = (window.location.hash.length > 0 ? window.location.hash.substring(1) : "");
	e = b.split("&");
	for (var c = 0; c < e.length; c++) {
		d = e[c].split("=");
		if (d.length > 1) {
			try {
				f = decodeURIComponent(d[0]);
				j = decodeURIComponent(d[1]);
				a[f] = j;
			}
			catch (h) {
			}
		}
	}
	return a;
}};
VA_GLOBAL.namespace("Dom");
VA_GLOBAL.Dom.loadScriptURL = function (b) {
	var a = document.createElement("script");
	a.type = "text/javascript";
	a.src = b;
	document.body.appendChild(a);
};
VA_GLOBAL.Dom.loadImageBeacon = function (b) {
	var a = document.createElement("img");
	a.type = "image/png";
	a.src = b;
	a.border = 0;
	a.height = 1;
	a.width = 1;
	document.body.appendChild(a);
};
VA_GLOBAL.namespace("Event");
VA_GLOBAL.Event = {getEvent:function (a) {
	return a ? a : window.event;
}, getTarget:function (a) {
	a = a ? a : window.event;
	return a.target || a.srcElement;
}, stopPropagation:function (a) {
	a = a ? a : window.event;
	if (a.stopPropagation) {
		a.stopPropagation();
	} else {
		a.cancelBubble = true;
	}
}, preventDefault:function (a) {
	a = a ? a : window.event;
	if (a.preventDefault) {
		a.preventDefault();
	} else {
		a.returnValue = false;
	}
}, addHandler:function (a, c, b) {
	a = typeof a == "string" ? document.getElementById(a) : a;
	if (a.addEventListener) {
		a.addEventListener(c, b, false);
	} else {
		if (a.attachEvent) {
			a.attachEvent("on" + c, b);
		} else {
			a["on" + c] = b;
		}
	}
}};
VA_GLOBAL.namespace("Cookie");
VA_GLOBAL.Cookie = {get:function (e) {
	var b = null;
	var a = document.cookie.split("; ");
	for (var c = 0, d = a.length; c < d; c++) {
		var f = a[c].split("=");
		if (f != null && f != "undefined") {
			if (f[0] === e) {
				if (f[1] != null && f[1] != "undefined") {
					b = f[1];
				}
			}
		}
	}
	return b;
}, set:function (d, g, c, e, b, f) {
	var a = encodeURIComponent(d) + "=" + encodeURIComponent(g);
	if (c instanceof Date) {
		a += "; expires=" + c.toGMTString();
	}
	if (e) {
		a += "; path=" + e;
	}
	if (b) {
		a += "; domain=" + b;
	}
	if (f) {
		a += "; secure";
	}
	document.cookie = a;
}, unset:function (b, c, a, d) {
	this.set(b, "", new Date(0), c, a, d);
}};
VA_GLOBAL.namespace("SubCookie");
VA_GLOBAL.SubCookie = {get:function (a, c) {
	var b = this.getAll(a);
	if (b) {
		return b[c];
	} else {
		return null;
	}
}, getAll:function (g) {
	var b = encodeURIComponent(g) + "=", c = document.cookie.indexOf(b), d = null, j = {};
	if (c > -1) {
		var a = document.cookie.indexOf(";", c);
		if (a == -1) {
			a = document.cookie.length;
		}
		d = document.cookie.substring(c + b.length, a);
		if (d.length > 0) {
			var k = d.split("&");
			for (var e = 0, f = k.length; e < f; e++) {
				var h = k[e].split("=");
				j[decodeURIComponent(h[0])] = decodeURIComponent(h[1]);
			}
			return j;
		}
	}
	return j;
}, set:function (c, g, h, b, d, a, e) {
	var f = this.getAll(c) || {};
	f[g] = h;
	this.setAll(c, f, b, d, a, e);
}, setAll:function (d, h, c, e, b, f) {
	var a = encodeURIComponent(d) + "=";
	var g = new Array();
	for (var j in h) {
		if (j.length > 0 && h.hasOwnProperty(j)) {
			g.push(encodeURIComponent(j) + "=" + encodeURIComponent(h[j]));
		}
	}
	if (g.length > 0) {
		a += g.join("&");
		if (c instanceof Date) {
			a += "; expires=" + c.toGMTString();
		}
		if (e) {
			a += "; path=" + e;
		}
		if (b) {
			a += "; domain=" + b;
		}
		if (f) {
			a += "; secure";
		}
	} else {
		a += "; expires=" + (new Date(0)).toGMTString();
	}
	document.cookie = a;
}, unset:function (b, f, c, a, d) {
	var e = this.getAll(b);
	if (e) {
		delete e[f];
		this.setAll(b, e, null, c, a, d);
	}
}, unsetAll:function (b, c, a, d) {
	this.setAll(b, null, new Date(0), c, a, d);
}};
VA_GLOBAL.namespace("va");
VA_GLOBAL.va = {start:function () {
	try {
		if (typeof VA_GLOBAL.start != "undefined") {
			return;
		}
		VA_GLOBAL.start = "1";
		var c = new Date().getTime();
		VA_GLOBAL.begintime = c;
		VA_GLOBAL.pvid = VA_GLOBAL.Lang.timeSeq32();
		var n = window.location.href;
		var m = window.location.hash;
		var p = n.indexOf("//", 0);
		var q = n.indexOf("/", p + 2);
		VA_GLOBAL.urlHost = n.substring(p, q > 0 ? q : n.length);
		var w = window.location.protocol.toLowerCase();
		var e = "//vamt.vancl.com:";
		var f = w == "https:" ? 443 : 80;
		VA_GLOBAL.server = w + e + f;
		var g = window.location.hostname.toLowerCase();
		var s = VA_GLOBAL.Http.isIp(g);
		var o = g.lastIndexOf(".");
		if (o > 0) {
			o = g.lastIndexOf(".", o - 1);
		}
		var h = s ? g : (o == -1 ? ("." + g) : g.substring(o));
		VA_GLOBAL.domain1 = h;
		var z = "-";
		var A = window.location.port;
		var M = window.location.pathname;
		if (VA_GLOBAL.Lang.isEmpty(M)) {
			M = "/";
		}
		var x = window.location.search;
		if (x.length > 0) {
			x = x.substring(1);
		}
		var L = navigator.userAgent;
		var d = document.cookie;
		var y = document.referrer;
		var v = VA_GLOBAL.Http.getQueryStringArgs();
		var C = v.source;
		if (VA_GLOBAL.Lang.isNone(C)) {
			C = null;
		}
		var K = VA_GLOBAL.SubCookie.getAll("va_track");
		var G = "-";
		var H = "-";
		var J = "-";
		var F = "-";
		var I = (typeof K.url == "undefined") ? "-" : K.url;
		var E = null;
		if (/^https?:\/\/./i.test(I)) {
			E = n;
		} else {
			var r = n.indexOf("//", 0);
			E = n.substring(r);
		}
		var t = (typeof K.extras == "undefined") ? "" : K.extras;
		if (decodeURI(I) == decodeURI(E)) {
			G = (typeof K.ppvid == "undefined") ? "-" : K.ppvid;
			H = (typeof K.tid == "undefined") ? "-" : K.tid;
			J = (typeof K.tr == "undefined") ? "-" : K.tr;
			F = (typeof K.lb == "undefined") ? "-" : K.lb;
			VA_GLOBAL.Cookie.unset("va_track", "/", h, null);
		}
		var T = null;
		var P = VA_GLOBAL.Cookie.get("va_opened");
		var Q = VA_GLOBAL.Cookie.get("va_sid");
		if (Q == null || P == null) {
			Q = VA_GLOBAL.Lang.timeSeq32();
			T = "l";
			VA_GLOBAL.Cookie.set("va_opened", "1", "", "/", h, null);
		} else {
			T = "g";
		}
		VA_GLOBAL.sid = Q;
		var j = new Date();
		j.setTime(c + 30 * 60 * 1000);
		var b = j;
		VA_GLOBAL.Cookie.set("va_sid", Q, b, "/", h, null);
		var N = VA_GLOBAL.SubCookie.getAll("va_user");
		var R = N.uid;
		var S = N.uvc;
		if (VA_GLOBAL.Lang.isNone(R)) {
			R = VA_GLOBAL.Lang.timeSeq32();
			S = 1;
			N.uid = R;
			N.uvc = S;
			N.ft = c;
			N.lt = c;
			N.tt = c;
		} else {
			if (T == "l") {
				try {
					S = Number(S) + 1;
					if (Number(S) > 999) {
						S = 999;
					}
				}
				catch (O) {
					S = 1;
				}
				N.uvc = S;
				N.lt = N.tt;
				N.tt = c;
			} else {
				try {
					S = Number(S);
					if (Number(S) > 999) {
						S = 999;
					}
				}
				catch (O) {
					S = 1;
				}
				N.uvc = S;
			}
		}
		if (C != null) {
			VA_GLOBAL.Cookie.set("va_src", C, "", "/", h, null);
		} else {
			C = VA_GLOBAL.Cookie.get("va_src");
			if (VA_GLOBAL.Lang.isNone(C)) {
				C = null;
			}
		}
		VA_GLOBAL.uid = R;
		var k = new Date();
		k.setTime(c + 730 * 24 * 3600 * 1000);
		var a = k;
		VA_GLOBAL.SubCookie.setAll("va_user", N, a, "/", h, null);
		var u = "";
		if ((typeof track_sinput != "undefined") && track_sinput != null && track_sinput != "") {
			u = "iswv=" + track_sinput;
		}
		var U = Q;
		U += "\t" + R;
		U += "\t" + VA_GLOBAL.pvid;
		U += "\t" + G;
		U += "\t" + T;
		U += "\t" + S;
		U += "\tj";
		U += "\t" + w.substring(0, w.length - 1) + "/1.1";
		U += "\t" + g;
		U += "\t" + z;
		U += "\t" + ((A + "") == "" ? "-" : A);
		U += "\t" + M;
		U += "\t" + (x == "" ? "-" : encodeURIComponent(x).substring(0, 400));
		U += "\t-";
		U += "\t-";
		U += "\tGET";
		U += "\t-";
		U += "\t-";
		U += "\t-";
		U += "\t-";
		U += "\t-";
		U += "\t" + (y == "" ? "-" : encodeURIComponent(y.replace(/[\r\n\t]/g, " ").substring(0, 400)));
		U += "\tva_rt=p";
		if (C != null) {
			U += "&va_src=" + C;
		}
		U += "&va_uft=" + N.ft;
		U += "&va_ult=" + N.lt;
		U += "&va_utt=" + N.tt;
		if (u != "") {
			U += "&" + u;
		}
		if (t != "") {
			U += "&" + t;
		}
		U += "&va_tid=" + H;
		U += "&va_track=" + J;
		U += "&va_label=" + F;
		U += "\t" + (L == "" ? "-" : encodeURIComponent(L.replace(/[\r\n\t\'\"]/g, " ")));
		var B = VA_GLOBAL.Lang.isNone(VA_GLOBAL.Cookie.get("sid")) ? "00000000000000000000000000000000" : VA_GLOBAL.Cookie.get("sid");
		U += "\t" + (B == "" ? "-" : "sid=" + B.replace(/[\r\n\t]/g, " "));
		var D = w + e + f + "/mt/visit?ct=js&v=2&info=" + encodeURIComponent(U);
		VA_GLOBAL.PVURL = D;
	}
	catch (l) {
	}
}, send:function () {
	try {
		if (typeof VA_GLOBAL.send != "undefined") {
			return;
		}
		VA_GLOBAL.send = "1";
		if (typeof VA_GLOBAL.server != "undefined") {
			$.getScript(VA_GLOBAL.PVURL);
		}
	}
	catch (a) {
	}
}, loaded:function () {
	try {
		if (typeof VA_GLOBAL.loaded != "undefined") {
			return;
		}
		VA_GLOBAL.loaded = "1";
		if (typeof VA_GLOBAL.server != "undefined") {
			var b = new Date().getTime() - VA_GLOBAL.begintime;
			var d = VA_GLOBAL.sid + "\t" + VA_GLOBAL.uid + "\t" + VA_GLOBAL.pvid + "\t" + b;
			var c = VA_GLOBAL.server + "/mt/render?ct=js&v=2&info=" + encodeURIComponent(d);
			$.getScript(c);
		}
		VA_GLOBAL.Event.addHandler(document, "mousedown", function (e) {
			if (e.button == 0 || e.button == 1) {
				var g = VA_GLOBAL.Event.getTarget(e);
				if (g.nodeType == 1) {
					var f = VA_GLOBAL.va.trackNode(g);
					if (f == false) {
						VA_GLOBAL.va.trackNode(g.parentNode);
					}
				}
			}
		});
	}
	catch (a) {
	}
}, trackNode:function (j) {
	if (j.nodeType != 1) {
		return false;
	}
	var k = j.nodeName.toLowerCase();
	var a = false;
	var m = j.getAttribute("va_track");
	if ((typeof m == "undefined") || m == null || m == "") {
		var d = j.className;
		if (d == null || (typeof d == "undefined")) {
			d = "";
		}
		d = d.toLowerCase();
		var c = d.split(" ");
		for (var g = 0; g < c.length; g++) {
			if (c[g] == "track") {
				a = true;
				break;
			}
		}
		if (a == true) {
			m = j.name;
		}
		if (a == false || (typeof m == "undefined") || m == null || m == "") {
			m = "-";
		}
	} else {
		a = true;
	}
	if (a == true || k == "a") {
		var h = null;
		try {
			if (k == "a") {
				h = j.innerHTML;
			} else {
				h = j.value;
				if ((typeof h == "undefined") || h == null) {
					h = j.title;
					if ((typeof h == "undefined") || h == null) {
						h = j.data;
					}
				}
			}
		}
		catch (e) {
		}
		if ((typeof h == "undefined") || h == null) {
			h = "-";
		}
		var l = null;
		if (k == "a") {
			var f = j.href;
			if ((typeof f != "undefined") && f != null) {
				if (/^https?:\/\/./i.test(f)) {
					l = f;
				} else {
					if (/^\/\/./i.test(f)) {
						l = f;
					} else {
						if (/^\/./i.test(f)) {
							l = VA_GLOBAL.urlHost + f;
						}
					}
				}
			}
		}
		try {
			if (typeof h != "string") {
				h = "";
			} else {
				h = h.replace(/[\r\n\t\'\"]/g, " ");
			}
		}
		catch (e) {
		}
		if (h.length > 100) {
			h = encodeURIComponent(h.substring(0, 100));
		}
		VA_GLOBAL.va.track(l, m, h);
		a = true;
	}
	return a;
}, track:function (h, k, d) {
	var f = VA_GLOBAL.Lang.timeSeq32();
	if (k == null || (typeof k == "undefined") || k == "") {
		k = "-";
	}
	if (d == null || (typeof d == "undefined") || d == "") {
		d = "-";
	}
	var c = "";
	if ((typeof track_sinput == "undefined") || track_sinput == null || track_sinput == "") {
		c = "";
	} else {
		c = "isw=" + track_sinput;
	}
	if (h != null && (typeof h != "undefined") && h != "") {
		var g = {};
		g.ppvid = VA_GLOBAL.pvid;
		g.tid = f;
		g.url = h;
		g.tr = k;
		g.lb = d;
		g.extras = c;
		var b = new Date();
		b.setTime(new Date().getTime() + 3 * 60 * 1000);
		var a = b;
		VA_GLOBAL.SubCookie.setAll("va_track", g, a, "/", VA_GLOBAL.domain1, null);
	}
	h = c;
	if (typeof VA_GLOBAL.server != "undefined") {
		var j = VA_GLOBAL.sid + "\t" + VA_GLOBAL.uid + "\t" + VA_GLOBAL.pvid + "\t" + f + "\t" + h + "\t" + k + "\t" + d;
		var e = VA_GLOBAL.server + "/mt/click?ct=js&v=2&info=" + encodeURIComponent(j);
		$.getScript(e);
	}
}, saveInfo:function (d, a, f) {
	var c = VA_GLOBAL.Lang.timeSeq32();
	if (d == null || (typeof d == "undefined") || d == "") {
		d = "-";
	}
	if (a == null || (typeof a == "undefined") || a == "") {
		a = "-";
	}
	if (f == null || (typeof f == "undefined") || f == "") {
		f = "-";
	}
	if (d == "-" && a == "-" && f == "-") {
		return;
	}
	if (typeof VA_GLOBAL.server != "undefined") {
		var e = VA_GLOBAL.sid + "\t" + VA_GLOBAL.uid + "\t" + VA_GLOBAL.pvid + "\t" + c + "\t" + d + "\t" + a + "\t" + f;
		var b = VA_GLOBAL.server + "/mt/depot?ct=js&v=2&info=" + encodeURIComponent(e);
		$.getScript(b);
	}
}};
(function () {
})();
VA_GLOBAL.namespace("vanew");
VA_GLOBAL.vanew = {prepare:function () {
	var c = new Date().getTime();
	VA_GLOBAL.new_begintime = c;
	VA_GLOBAL.new_requestid = VA_GLOBAL.Lang.timeSeq32();
	var o = window.location.protocol.toLowerCase();
	VA_GLOBAL.new_protocol = o;
	var e = "//vamr.vancl.com:";
	var f = o == "https:" ? 443 : 80;
	VA_GLOBAL.new_server = o + e + f;
	var g = window.location.hostname.toLowerCase();
	VA_GLOBAL.new_domain = g;
	var l = VA_GLOBAL.Http.isIp(g);
	var j = g.lastIndexOf(".");
	if (j > 0) {
		j = g.lastIndexOf(".", j - 1);
	}
	var h = l ? g : (j == -1 ? ("." + g) : g.substring(j));
	VA_GLOBAL.new_domain1 = h;
	var u = window.location.pathname;
	if (VA_GLOBAL.Lang.isEmpty(u)) {
		u = "/";
	}
	VA_GLOBAL.uri = u;
	var p = window.location.search;
	if (p.length > 0) {
		p = p.substring(1);
	}
	VA_GLOBAL.new_query = p;
	var n = VA_GLOBAL.Http.getQueryStringArgs();
	var s = n.source;
	if (VA_GLOBAL.Lang.isNone(s)) {
		s = null;
	}
	VA_GLOBAL.new_source = s;
	var q = document.referrer;
	if (q == null || (typeof q == "undefined") || q == "") {
		VA_GLOBAL.Cookie.unset("va_click", "/", h, null);
	} else {
		if (q.indexOf(".vancl.com") == -1) {
			VA_GLOBAL.Cookie.unset("va_click", "/", h, null);
		}
	}
	VA_GLOBAL.new_referer = q;
	VA_GLOBAL.new_useragent = navigator.userAgent;
	var r = VA_GLOBAL.Cookie.get("sid");
	if ((typeof r == "undefined") || r == null || r == "") {
		r = "-";
	}
	VA_GLOBAL.new_sid = r;
	var y = VA_GLOBAL.Cookie.get("va_sid");
	var z = null;
	if (y != null && y == r) {
		z = "g";
	} else {
		z = "l";
		y = r;
		VA_GLOBAL.Cookie.unset("va_click", "/", h, null);
	}
	VA_GLOBAL.new_visitsequence = z;
	var b = new Date();
	b.setTime(c + 24 * 60 * 60 * 1000);
	VA_GLOBAL.Cookie.set("va_sid", y, b, "/", h, null);
	var d = VA_GLOBAL.SubCookie.getAll("va_click");
	VA_GLOBAL.new_parentrequestid = (typeof d.rid == "undefined") ? "-" : d.rid;
	VA_GLOBAL.new_clickid = (typeof d.cid == "undefined") ? "-" : d.cid;
	VA_GLOBAL.new_trackurl = (typeof d.turl == "undefined") ? "-" : d.turl;
	VA_GLOBAL.new_trackname = (typeof d.tname == "undefined") ? "-" : d.tname;
	VA_GLOBAL.new_tracklabel = VA_GLOBAL.Lang.trim((typeof d.tlabel == "undefined") ? "-" : d.tlabel);
	var v = VA_GLOBAL.SubCookie.getAll("va_visit");
	var t = v.uid;
	var w = v.uvc;
	if (VA_GLOBAL.Lang.isNone(t)) {
		t = VA_GLOBAL.Lang.timeSeq32();
		w = 1;
		v.uid = t;
		v.uvc = w;
		v.ft = c;
		v.lt = c;
		v.tt = c;
	} else {
		if (z == "l") {
			try {
				w = Number(w) + 1;
				if (Number(w) > 999) {
					w = 999;
				}
			}
			catch (x) {
				w = 1;
			}
			v.uvc = w;
			v.lt = v.tt;
			v.tt = c;
		} else {
			try {
				w = Number(w);
				if (Number(w) > 999) {
					w = 999;
				}
			}
			catch (x) {
				w = 1;
			}
			v.uvc = w;
		}
	}
	VA_GLOBAL.new_uid = v.uid;
	VA_GLOBAL.new_uservisitcount = v.uvc;
	VA_GLOBAL.new_firsttime = v.ft;
	VA_GLOBAL.new_lasttime = v.lt;
	VA_GLOBAL.new_thistime = v.tt;
	var a = new Date();
	a.setTime(c + 365 * 24 * 60 * 60 * 1000);
	VA_GLOBAL.SubCookie.setAll("va_visit", v, a, "/", h, null);
	var k = "-";
	if ((typeof track_sinput != "undefined") && track_sinput != null && track_sinput != "") {
		k = track_sinput;
	}
	VA_GLOBAL.new_insitesearchway = k;
	var m = getPageLab();
	if (m != "") {
		VA_GLOBAL.new_pagelab = m;
	} else {
		VA_GLOBAL.new_pagelab = "-";
	}
}, request:function () {
	try {
		if (typeof VA_GLOBAL.new_server != "undefined") {
			var b = VA_GLOBAL.new_referer;
			var e = VA_GLOBAL.new_trackname;
			var d = VA_GLOBAL.new_tracklabel;
			var c = VA_GLOBAL.new_server + "/visit.ashx?";
			c += "version=1.0";
			c += "&requestid=" + VA_GLOBAL.new_requestid;
			c += "&parentrequestid=" + VA_GLOBAL.new_parentrequestid;
			c += "&sid=" + VA_GLOBAL.new_sid;
			c += "&uid=" + VA_GLOBAL.new_uid;
			c += "&referer=" + (b == "" ? "-" : encodeURIComponent(b.replace(/[\r\n\t]/g, " ").substring(0, 400)));
			c += "&visitsequence=" + VA_GLOBAL.new_visitsequence;
			c += "&uservisitcount=" + VA_GLOBAL.new_uservisitcount;
			c += "&firsttime=" + VA_GLOBAL.new_firsttime;
			c += "&lasttime=" + VA_GLOBAL.new_lasttime;
			c += "&thistime=" + VA_GLOBAL.new_thistime;
			c += "&insitesearchway=" + VA_GLOBAL.new_insitesearchway;
			c += "&pagelab=" + VA_GLOBAL.new_pagelab;
			c += "&clickid=" + VA_GLOBAL.new_clickid;
			c += "&trackname=" + (e == "" ? "-" : encodeURIComponent(e.replace(/[\r\n\t\'\"]/g, " ")));
			c += "&tracklabel=" + (d == "" ? "-" : encodeURIComponent(d.replace(/[\r\n\t\'\"]/g, " ")));
			$.getScript(c);
		}
	}
	catch (a) {
	}
}, loadtime:function () {
	try {
		if (typeof VA_GLOBAL.new_server != "undefined") {
			var c = new Date().getTime() - VA_GLOBAL.new_begintime;
			var b = VA_GLOBAL.new_referer;
			var d = VA_GLOBAL.new_server + "/render.ashx?";
			d += "version=1.0";
			d += "&requestid=" + VA_GLOBAL.new_requestid;
			d += "&parentrequestid=" + VA_GLOBAL.new_parentrequestid;
			d += "&sid=" + VA_GLOBAL.new_sid;
			d += "&uid=" + VA_GLOBAL.new_uid;
			d += "&rendertime=" + c;
			d += "&referer=" + (b == "" ? "-" : encodeURIComponent(b.replace(/[\r\n\t]/g, " ").substring(0, 400)));
			$.getScript(d);
		}
	}
	catch (a) {
	}
}, listenclick:function () {
	try {
		VA_GLOBAL.Event.addHandler(document, "mousedown", function (b) {
			if (b.button == 0 || b.button == 1) {
				var d = VA_GLOBAL.Event.getTarget(b);
				if (d.nodeType == 1) {
					var c = VA_GLOBAL.vanew.elementclicked(d);
					if (c == false) {
						VA_GLOBAL.vanew.elementclicked(d.parentNode);
					}
				}
			}
		});
	}
	catch (a) {
	}
}, elementclicked:function (h) {
	if (h.nodeType != 1) {
		return false;
	}
	var g = false;
	var c = h.className;
	if (c == null || (typeof c == "undefined")) {
		c = "";
	}
	c = c.toLowerCase();
	var b = c.split(" ");
	for (var f = 0; f < b.length; f++) {
		if (b[f] == "track") {
			g = true;
			break;
		}
	}
	var l = null;
	if (g) {
		l = h.attributes.name.value;
	}
	if (g == false || (typeof l == "undefined") || l == null || l == "") {
		l = "-";
	}
	var j = h.nodeName.toLowerCase();
	var k = null;
	var m = null;
	if (j == "a") {
		try {
			k = h.innerHTML;
			var e = h.href;
			if ((typeof e != "undefined") && e != null) {
				if (/^https?:\/\/./i.test(e)) {
					m = e;
				} else {
					if (/^\/\/./i.test(e)) {
						m = e;
					} else {
						if (/^\/./i.test(e)) {
							m = e;
						}
					}
				}
			}
		}
		catch (d) {
		}
	} else {
		try {
			k = h.value;
			if ((typeof k == "undefined") || k == null) {
				k = h.title;
				if ((typeof k == "undefined") || k == null) {
					k = h.data;
				}
			}
		}
		catch (d) {
		}
	}
	if ((typeof k == "undefined") || k == null) {
		k = "-";
	}
	try {
		if (typeof k != "string") {
			k = "";
		} else {
			k = k.replace(/[\r\n\t\'\"]/g, " ");
		}
	}
	catch (d) {
	}
	k = VA_GLOBAL.Lang.trim(k);
	if (k.length > 100) {
		k = encodeURIComponent(k.substring(0, 100));
	}
	var a = VA_GLOBAL.Lang.timeSeq32();
	if (g) {
		VA_GLOBAL.vanew.recordtrackclick(a, l, m, k);
	}
	if (j == "a") {
		VA_GLOBAL.vanew.recordaclick(a, l, m, k);
	}
	return g || j == "a";
}, recordaclick:function (b, e, f, d) {
	if (e == null || (typeof e == "undefined") || e == "") {
		e = "-";
	}
	if (d == null || (typeof d == "undefined") || d == "") {
		d = "-";
	}
	if (f == null || (typeof f == "undefined") || f == "") {
		f = "-";
	}
	var c = {};
	c.rid = VA_GLOBAL.new_requestid;
	c.cid = b;
	c.turl = f;
	c.tname = e;
	c.tlabel = d;
	var a = new Date();
	a.setTime(new Date().getTime() + 60 * 1000);
	VA_GLOBAL.SubCookie.setAll("va_click", c, a, "/", VA_GLOBAL.domain1, null);
}, recordtrackclick:function (a, e, f, d) {
	if (e == null || (typeof e == "undefined") || e == "") {
		e = "-";
	}
	if (d == null || (typeof d == "undefined") || d == "") {
		d = "-";
	}
	if (f == null || (typeof f == "undefined") || f == "") {
		f = "-";
	}
	if (typeof VA_GLOBAL.new_server != "undefined") {
		var b = VA_GLOBAL.new_referer;
		var c = VA_GLOBAL.new_server + "/click.ashx?";
		c += "version=1.0";
		c += "&clickid=" + a;
		c += "&trackurl=" + (f == "" ? "-" : encodeURIComponent(f.replace(/[\r\n\t]/g, " ").substring(0, 400)));
		c += "&trackname=" + (e == "" ? "-" : encodeURIComponent(e.replace(/[\r\n\t]/g, " ").substring(0, 400)));
		c += "&tracklabel=" + (d == "" ? "-" : encodeURIComponent(d.replace(/[\r\n\t]/g, " ").substring(0, 400)));
		c += "&requestid=" + VA_GLOBAL.new_requestid;
		c += "&sid=" + VA_GLOBAL.new_sid;
		c += "&uid=" + VA_GLOBAL.new_uid;
		c += "&referer=" + (b == "" ? "-" : encodeURIComponent(b.replace(/[\r\n\t]/g, " ").substring(0, 400)));
		$.getScript(c);
	}
}, send:function () {
	try {
		if (typeof VA_GLOBAL.v4sreadyed != "undefined") {
			return;
		}
		VA_GLOBAL.v4sreadyed = "1";
		VA_GLOBAL.vanew.prepare();
		VA_GLOBAL.vanew.request();
	}
	catch (a) {
	}
}, loaded:function () {
	try {
		if (typeof VA_GLOBAL.v4sloaded != "undefined") {
			return;
		}
		VA_GLOBAL.v4sloaded = "1";
		VA_GLOBAL.vanew.loadtime();
		VA_GLOBAL.vanew.listenclick();
	}
	catch (a) {
	}
}};
var PAGELAB_PATTERN = /^(PageLab_PLE[0-9]{4})=([^;]*)$/;
var weblog_loadtime = new Date();
try {
	$(document).ready(function () {
		VA_GLOBAL.va.start();
		VA_GLOBAL.va.send();
		VA_GLOBAL.vanew.send();
		if (typeof VA_GLOBAL.v3start != "undefined") {
			return;
		}
		VA_GLOBAL.v3start = "1";
		var c = [];
		var b = getPageLab();
		c.push(document.location.protocol);
		c.push("//vamr.vancl.com/trace.ashx?ref=");
		c.push(escape(window.document.referrer));
		if (typeof (track_sinput) != "undefined") {
			c.push("&trace_sib=" + track_sinput);
		}
		if (b != "") {
			c.push("&gather_cookies=" + b);
		}
		var d = c.join("");
		try {
			$.getScript(d);
		}
		catch (a) {
		}
	});
}
catch (err) {
}
function getPageLab() {
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
try {
	$(window).load(function () {
		VA_GLOBAL.va.loaded();
		VA_GLOBAL.vanew.loaded();
		if (typeof VA_GLOBAL.v3loaded != "undefined") {
			return;
		}
		VA_GLOBAL.v3loaded = "1";
		var d = [];
		d.push(document.location.protocol);
		d.push("//vamr.vancl.com/trace_loadtime.ashx?ref=");
		d.push(escape(window.document.referrer));
		var b = Math.floor(Math.random() * 10);
		if (typeof (weblog_loadtime) != "undefined" && b == 0) {
			var g = (new Date()) - weblog_loadtime;
			d.push("&loadtime=" + g);
		} else {
			return;
		}
		var c = d.join("");
		try {
			var f = document.createElement("script");
			f.setAttribute("src", c);
			document.getElementsByTagName("head")[0].appendChild(f);
		}
		catch (a) {
		}
	});
}
catch (err) {
}

