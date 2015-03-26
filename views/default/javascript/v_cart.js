(function(a, c, b) {
    a(function() {
        var f = {},
        e = vancl.dialog.alert,
        k = vancl.dialog.confirm,
        r = a("#recom-browse-collect"),
        s = a("#recom-browse-collect ul.tab>li:eq(0)"),
        q = r.find("ul.tab>li:eq(1)"),
        m = a("#recom-browse-collect ul.tab>li:eq(2)"),
        u = a("#tj-product"),
        p = a("#recent-browse"),
        l = a("#favorite"),
        h = cartGift = a("#cart-gift"),
        i = a("#collocate-list"),
        j = a(".coudan-title"),
        n = a("#gift");
        var o = {
            add2FavoriteMsg: "确定要移除到收藏夹吗？",
            delMsg: "确定要删除此商品吗？",
            emptyCartMsg: "确定要清空购物车吗？",
            batchCheckOutTip: "请先勾选您要购买的商品后，再去结算",
            noPresentTitle: "提示",
            tipStr: "提示",
            updateQtyMsg: "商品数量不能少于一件。",
            noPresentMsg: "您还没有选择特惠品，确定要去结算吗？",
            collocateLoadHtml: "<span class='collocate-popup-load'></span>",
            collocateListLoadingHtml: "<div id='collocate-list-loading' class='cart-loading'>正在为您加载凑单品,请稍候...</div>",
            removedProducts: {},
            itemsPerPage: 6
        };
        var t = {
            noLoginFavoriteHtml: "<div class='product-list-tip'>请点击此处<a class='login' href='http://login.vancl.com/login/login.aspx?" + document.location.protocol + "//" + document.location.host + "/mycart'>登录</a>以方便查看你的收藏夹。</div>",
            modalLoadHtml: "<span class='modal-loading'></span>",
            add2FavHtml: "|<a href='#add-faverate-url#' class='addfav'>移入收藏夹</a>",
            emptyRecommendHtml: '<div class="product-list-tip">抱歉，没有任何推荐的商品。</div>',
            delItemHtml: '<tr><td class="product"><a target="_blank" href="#product-url#"><img alt="" src="#img-url#" /></a></td><td class="name"><a target="_blank" href="#product-url#">#name#</a></td><td class="size">#size#</td><td class="price">#price#</td><td class="amount">#amount#</td><td class="operate"><a href="#add-item-url#" class="rebuy">重新购买</a>#add-fav-html#</td></tr>',
            popupProductHtml: '<div class="choose"><div class="choose-inner"><div class="title clearfix">    <h4>        请确定商品信息</h4>    <a class="close" href="javascript:;"></a></div><a target="_blank" class="choose-gallery" title="#name#" href="#product-url#"><img src="#gallery-image#" alt="#name#" /></a><div class="content clearfix">    <label>        选择：</label>    <div class="shangpin#yanse#">#colors#   </div>   <label>       尺码：</label>   <div class="chima">#sizes#    </div></div><div class="choose-it">    <label>        您选择了：</label>    <span>#selected-color#</span><span></span></div><div class="btn">    <input type="button" class="sure track" name="sp_cart_mycart_present_sure_add_to_cart" value="确定" /></div><div class="arrow"></div></div></div>',
            superPresentPopupHtml: '<div class="left choose"><div class="choose-inner"><div class="title clearfix">    <h4>        #title#</h4>    <a class="super-present-close" href="javascript:;"></a></div><div class="content clearfix">    <label>        #popuplabel#：</label>    <div class="#classname#">   </div></div><div class="btn">    <input type="button" class="super-present-sure" value="确定" /></div><div class="arrow"></div></div></div>',
            colorHtml: '<a class="color track" href="http://item.vancl.com/#product-code#.html?ref=#ref#" data-gallery-image="#gallery-image#" name="sp_cart_mycart_present_color"><img src="#icon-image#" alt="#name#" title="#color#" /></a>',
            sizeHtml: "<a href='/mycart/addpresent?promoteeid=#promotee-id#&promoteeindex=#promotee-index#&sku=#sku#&ref=#ref#' class='size track' title='#size#' name='sp_cart_mycart_present_size' >#size#</a>",
            colorHtml4Collocate: '<a class="color track" href="http://item.vancl.com/#product-code#.html?ref=#ref#" data-gallery-image="#gallery-image#" name="sp_cart_mycart_collocate_color"><img src="#icon-image#" alt="#name#" title="#color#" /></a>',
            sizeHtml4Collocate: "<a href='/mycart/additem?sku=#sku#&ref=#ref#' class='size track' title='#size#' name='sp_cart_mycart_present_size' >#size#</a>",
            superPresentSizeHtml: "<a href='#url#' class='super-present-size track' title='#size#' name='sp_cart_mycart_present_size' >#size#</a>",
            superPresentMoreHtml: "<a href='#' class='super-present-more'>更多</a>",
            color4RBCHtml: "<a class='color' href='javascript:;'>#color#</a>",
            size4RBCHtml: "<a href='/mycart/additem?sku=#sku#&ref=#ref#&qty=1' title='#size#' class='size'>#size#</a>",
            noSizeHtml: "<span class='no-size'>没有可选尺码</span>",
            delPresentTipHtml: '<div class="del-present-tip-panel"><div class="del-present-tip"><p class="del-present-msg">由于您本次暂不结算此商品,#tip-message# 已被移除</p><div class="del-present-btns"><a class="del-present-btn-sure">确定</a></div><div class="del-present-arrow"></div></div></div>',
            tipStr: "提示",
            sureTxt: "确定",
            cancelTxt: "取消",
            loadingTip: "请稍候...",
            defaultMsg: "好像出现了点小意外，请您稍后再试一次，或者请您与客服坐席400-650-7099联系。",
            checkOutLoading: "正在处理...",
            ellipseTxt: "...",
            checkOutTxt: "去结算",
            batchDelTip: "您确定要删除选中的商品吗？",
            batchDelAllTip: "您确定要删除全部商品吗？",
            noCheckedDelTip: "请先选择要删除的商品。",
            superPresentPopupColorTitle: "颜色选择",
            superPresentPopupColorLabel: "颜色",
            maxItem: 12,
            recent: 4,
            favorite: 3,
            recommend: 2,
            generalProduct: 1,
            pointProduct: 2,
            numDisplayEntries: 3,
            numEdgeEntries: 1,
            fractionDigits: 2,
            thousandsSeparator: ",",
            superPresentInitCount: 11,
            loginCallBackUrl: document.location.protocol + "//" + document.location.host + "/callback?fn=account.LoginCallBack",
            loginInfoUrl: "/logininfo",
            logoutUrl: document.location.protocol + "//login.vancl.com/login/userloginout.aspx",
            loadCartUrl: "/mycart/items",
            loadCollocate: "/mycart/collocate",
            addItemUrl: "/mycart/additem",
            recommendUrl: "/mycart/recommended",
            recentUrl: "/mycart/recent",
            favoriteUrl: "/mycart/favorites",
            homeUrl: "http://www.vancl.com/",
            updateQtyUrl: "/mycart/updateqty",
            batchdelcartUrl: "/mycart/batchdelcart",
            updateSettlementStatusUrl: "/mycart/updatesettlementstatus",
            updateAllSettlementStatusUrl: "/mycart/BatchUpdateSettlementStatus"
        };
        var d = {
            isCheckOut: false,
            add2Favorite: null,
            LoginOnCart: function(v) {
                showLoginDialog(t.loginCallBackUrl, v)
            },
            LoginOutOnCart: function() {
                a.cookie("ShoppingCarInfo", "0$0", {
                    expires: 15,
                    domain: ".vancl.com"
                });
                location.href = t.logoutUrl
            },
            refresh: function() {
                a.get(t.loginInfoUrl,
                function(w) {
                    if (g.valid(w)) {
                        var v = a("#header .account");
                        v.html(w)
                    }
                })
            },
            LoginCallBack: function() {
                closeLoginDialog();
                if (this.isCheckOut) {
                    this.refresh();
                    g.checkOut();
                    a("body").data("is-login-status", true);
                    this.isCheckOut = false
                } else {
                    if (typeof this.add2Favorite === "function") {
                        this.refresh();
                        this.add2Favorite();
                        this.add2Favorite = null
                    } else {
                        if (m.is(".selected")) {
                            this.refresh();
                            //g.loadCart();
                            m.click()
                        } else {
                            c.location.reload()
                        }
                    }
                }
            }
        };
        var g = {
            go2TopWithAnimate: function() {
                var w = (document.documentElement.scrollTop === 0 ? document.body: document.documentElement);
                try {
                    a(w).animate({
                        scrollTop: 0
                    },
                    1000)
                } catch(v) {
                    a(c).scrollTop(0)
                }
            },
            setGlobalLoadTip: function(v) {
                if (v) {
                    a(".loading").hide()
                } else {
                    if (a(".loading").length < 1) {
                        a("body").append("<div class='loading'><span></span><b></b></div>")
                    }
                    var x = a(".loading");
                    x.children("b").text(t.loadingTip);
                    x.show();
                    if (a.browser.msie && a.browser.version < 7) {
                        var y = a(c).height() / 2 + a(document).scrollTop(),
                        w = a(c).width() / 2 + a(document).scrollLeft();
                        x.css({
                            top: y,
                            left: w
                        })
                    }
                }
            },
            setAnimateTip: function(w) {
                if (a(".cart-tip").length < 1) {
                    a("body").append("<div class='cart-tip'><h4><span>提示</span><a class='cart-tip-arrow'></a></h4><div><span class='content-icon'></span><span class='content-msg'>由于商品变化，您已不能享有该赠品，赠品已被移除。</span></div></div>")
                }
                var x = a(".cart-tip");
                if (typeof w === "string") {
                    x.find(".content-msg").text(w)
                }
                var y = a(c).height() / 2 - x.outerHeight() / 2 + a(document).scrollTop(),
                v = a(c).width() / 2 - x.outerWidth() / 2 + a(document).scrollLeft();
                x.css({
                    left: v,
                    top: y
                });
                x.animate({
                    top: y - 200,
                    opacity: 1
                },
                1500);
                setTimeout(function() {
                    x.animate({
                        top: y,
                        opacity: 0
                    },
                    1500,
                    function() {
                        x.css({
                            left: 0,
                            top: 0
                        })
                    })
                },
                3000);
                return x
            },
            setmodalLoadTip: function(w, v) {
                if (w.length > 0) {
                    if (typeof v === "undefined") {
                        w.empty().append(t.modalLoadHtml)
                    } else {
                        if (typeof v === "string") {
                            w.empty().append(v)
                        }
                    }
                }
            },
            setTrStyle: function(w) {
                var y = w.parent(),
                z = w.closest("tr"),
                x = y.attr("rowspan"),
                v = w[0].checked;
                if (v) {
                    z.addClass("selected");
                    if (x > 1) {
                        z.next().addClass("selected")
                    }
                } else {
                    z.removeClass("selected");
                    if (x > 1) {
                        z.next().removeClass("selected")
                    }
                }
            },
            setAllTrStyle: function(w) {
                var v = w[0].checked,
                x = w.closest("#batchdelcart").find("table tr");
                if (v) {
                    x.addClass("selected")
                } else {
                    x.removeClass("selected")
                }
            },
            setTdStyle: function(w, v) {
                w.each(function() {
                    var A = a(this),
                    x = A.children("td");
                    if (v) {
                        x.addClass("bd-bottom");
                        return true
                    } else {
                        var z = A.find("td[rowspan]"),
                        y = A.find("td[colspan]");
                        if ((z.length > 0 && z.attr("rowspan") > 1) || (y.length > 0 && y.attr("colspan") > 1)) {
                            x.filter("td[rowspan][rowspan!=1],td[colspan][colspan!=1]").addClass("bd-bottom");
                            return true
                        } else {
                            x.addClass("bd-bottom")
                        }
                    }
                })
            },
            allCbxClick: function(w, x, v) {
                if (w.length > 0 && x.length > 0) {
                    var y = w[0].checked;
                    x.each(function() {
                        var z = a(this);
                        z.attr("checked", y)
                    });
                    if (typeof v === "function") {
                        v()
                    }
                }
            },
            ifAllCbxsChecked: function(v, w) {
                if (v.length > 0 && w.length > 0) {
                    var x = 0;
                    w.each(function() {
                        var z = a(this),
                        y = z[0].checked;
                        if (!y) {
                            return false
                        }
                        x++
                    });
                    if (x === w.length) {
                        v.attr("checked", "checked")
                    } else {
                        v.attr("checked", "")
                    }
                }
            },
            singleCbxClick: function(w, x, v) {
                this.ifAllCbxsChecked(w, x);
                if (typeof v === "function") {
                    v()
                }
            },
            setDelPresentTip: function(w, y, A) {
                if (!w && typeof A === "string" && A !== "") {
                    var z = y.find(".del-present-tip-panel");
                    if (z.length < 1) {
                        y.prepend(t.delPresentTipHtml);
                        y.find(".del-present-btn-sure").click(function() {
                            a(this).closest(".del-present-tip-panel").hide()
                        })
                    }
                    var v = y.find(".del-present-tip-panel");
                    var x = v.find(".del-present-msg");
                    x.text(x.text().replace(/#tip-message#/gi, A));
                    v.show()
                } else {
                    y.find(".del-present-tip-panel").hide()
                }
            },
            setAllDelPresentTip: function(w, v) {
                v.each(function() {
                    var x = a(this),
                    z = x.attr("data-del-tip"),
                    y = x.closest("tr").children(".name");
                    g.setDelPresentTip(w, y, z)
                })
            },
            hasChecked: function(v) {
                for (var w = 0; len = v.length, w < len; w++) {
                    if (v[w].checked) {
                        return true
                    }
                }
                return false
            },
            hideChooseDialogFixIe: function() {
                a(".choose").hide().closest("li").removeClass("selected").closest("ul").removeClass("selected")
            },
            pageCallback: function(z, x) {
                var w = o.itemsPerPage,
                y = z.length;
                z.hide();
                var A = x * w,
                v = Math.min(y - 1, (x + 1) * w - 1);
                g.hideChooseDialogFixIe();
                z.each(function(C, B) {
                    if (C < A) {
                        return true
                    }
                    if (C > v) {
                        return false
                    }
                    a(this).show()
                });
                a(c).triggerHandler("scroll")
            },
            commonPagination: function(v, w) {
                v.pagination(w.length, {
                    callback: function(x) {
                        g.pageCallback(w, x);
                        return false
                    },
                    num_display_entries: t.numDisplayEntries,
                    num_edge_entries: t.numEdgeEntries,
                    items_per_page: o.itemsPerPage,
                    link_to: "",
                    load_first_page: true,
                    ellipse_text: t.ellipseTxt,
                    prev_text: " ",
                    next_text: " "
                })
            },
            goToPage: function(x, y, v) {
                if (parseInt(x) && x < 2) {
                    return
                }
                var w = y.find(".next"),
                z = y.find(".prev");
                if (v) {
                    if (w.data("page_id") === y.data("current_page")) {
                        z.data("page_id", 0);
                        z.click()
                    } else {
                        w.click()
                    }
                } else {
                    if (y.data("current_page") === 0) {
                        w.data("page_id", x - 1);
                        w.click()
                    } else {
                        z.click()
                    }
                }
            },
            getRemovedList: function(w, v) {
                w.each(function() {
                    var A = {};
                    var z = a(this),
                    y = z.find("input[name='sku']").val(),
                    x = z.find("input[name='qty']").val();
                    if (typeof y != "undefined" && typeof x != "undefined") {
                        A.clothesCode = y;
                        A.productUrl = z.find(".name:first").children().attr("href");
                        A.productName = z.find(".name:first").children().text();
                        A.imgUrl = z.find("td.image img:eq(0)").attr("src");
                        A.amount = x;
                        A.size = z.children("td.size").text();
                        A.price = z.children(".td.price").text();
                        A.isPoint = v;
                        if (!v) {
                            A.addFaverateUrl = z.find(".add-faverate").attr("href")
                        }
                        A.addItemUrl = t.addItemUrl + "?sku=" + y + "&qty=" + x + "&ispoint=" + v;
                        o.removedProducts[y] = A
                    }
                })
            },
            setPointTip: function() {
                var v = a("#point-tip");
                if (v.length > 0) {
                    g.go2TopWithAnimate();
                    v.fadeTo(500, 0.2,
                    function() {
                        a(this).fadeTo(500, 1)
                    });
                    return true
                } else {
                    return false
                }
            },
            valid: function(v) {
                if (typeof v === "string") {
                    return true
                }
                var x, w, z, y;
                if (v !== null && typeof v === "object") {
                    x = v.Title;
                    w = v.Content;
                    z = v.LinkUrl;
                    y = v.Type
                }
                if (y == "Authorize") {
                    a("#cart-product").find(".btn-panel .checkout").removeClass("checkout-loading").text(t.checkOutTxt);
                    if (m.is(".selected")) {
                        l.html(t.noLoginFavoriteHtml)
                    }
                    if (!m.data("is-quiet")) {
                        d.LoginOnCart()
                    } else {
                        m.data("is-quiet", false)
                    }
                } else {
                    if (y == "Redirect") {
                        location.href = z;
                        return true
                    } else {
                        e({
                            title: x || t.tipStr,
                            msg: w || t.defaultMsg,
                            fn: function() {
                                a(this).dialog("close");
                                if (z && (document.location.protocol + "//" + document.location.host + z) !== location.href) {
                                    location.href = z
                                }
                            }
                        })
                    }
                }
                return false
            },
            loadCart: function(v) {
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: t.loadCartUrl,
                    beforeSend: function() {},
                    success: function(w) {
                        if (g.valid(w)) {
                            cartGift.html(w);
                            g.changed(false, v)
                        } else {
                            cartGift.find(".cart-loading").empty();
                            a(c).triggerHandler("scroll")
                        }
                    },
                    complete: function() {}
                })
            },
            loadGift: function(v) {
                var w = v.data("present-url");
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: vancl.addQueryString(w, "async", "true"),
                    beforeSend: function() {
                        g.setmodalLoadTip(n)
                    },
                    success: function(x) {
                        if (g.valid(x)) {
                            n.html(x);
                            g.superPresentColorInit();
                            n.find(".tab>li:eq(0)").click();
                            a("#gift .pager-panel").each(function() {
                                var y = a(this),
                                z = y.prevAll("ul.product-list").children();
                                g.commonPagination(y, z)
                            })
                        }
                    },
                    error: function(z, y) {
                        var x = y
                    },
                    complete: function() {}
                })
            },
            superPresentInit: function(w, v) {
                w.each(function(x, z) {
                    z = a(z);
                    var y = z.find("a");
                    y.filter(":lt(" + v + ")").show();
                    if (y.length > v) {
                        z.append(t.superPresentMoreHtml)
                    }
                })
            },
            superPresentColorInit: function() {
                var v = a("#super-present").find(".super-present-shangpin");
                this.superPresentInit(v, t.superPresentInitCount);
                v.find("a:eq(0)").click()
            },
            cartInit: function() {
                var x = a("#promotion-group");
                if (x.find("tr").length > 0) {
                    var w = x.find(".cart-split");
                    w.addClass("bd-top");
                    if (x.nextAll("tbody").find("tr").length > 0) {
                        w.addClass("bd-bottom")
                    }
                    x.find(".promotion-group-title:gt(0)").addClass("bd-top")
                }
                this.setTdStyle(a("#general-product").children());
                this.setTdStyle(a("#point-product").children());
                this.setTdStyle(a("#present-product").children(), true);
                var v = h.find("#batchdelcart input[name='all-products']"),
                y = h.find("#batchdelcart input[name='p-item']");
                this.ifAllCbxsChecked(v, y);
                if (v.length > 0 && y.length > 0) {
                    this.setAllDelPresentTip(v[0].checked, y)
                }
            },
            changed: function(w, x) {
                g.cartInit();
                i.hide();
                j.hide();
                if (!x) {
                    u[0].loaded = false;
                    l[0].loaded = false;
                    n[0].loaded = false
                }
                if (m.is(".selected")) {
                    m.data("is-quiet", true)
                }
                this.add2RemovedList(o.removedProducts);
                if (w) {
                    p[0].loaded = false;
                    var v = a("#cart-product");
                    if (v.length > 0 && v.data("promotion").toLowerCase() == "true") {
                        this.setAnimateTip()
                    }
                }
                a(c).triggerHandler("scroll")
            },
            createSuperPresentPopup: function(C, x) {
                var v = x.find(".choose");
                if (v.length > 0) {
                    v.show();
                    return
                }
                var B, A, w, z, y;
                switch (C.toLowerCase()) {
                case "color":
                    B = t.superPresentPopupColorTitle;
                    A = t.superPresentPopupColorLabel;
                    w = "shangpin";
                    z = x.parent().find(".super-present-color").clone();
                    break
                }
                y = t.superPresentPopupHtml.replace(/#title#/gi, B).replace(/#popuplabel#/gi, A).replace(/#classname#/gi, w);
                x.append(y);
                x.find(".choose ." + w).append(z).closest(".choose").show().find(".super-present-color").show()
            },
            createPopupProduct: function(B, x) {
                var A = x.closest("li").find(".list-img-panel"),
                C = A.data("href");
                if (a.isPlainObject(B)) {
                    if (a.isPlainObject(B.present)) {
                        var v = B.present.colors,
                        w = new stringBuilder();
                        a.each(v,
                        function(F, G) {
                            w.append(t.colorHtml.replace(/#product-code#/gi, G.productCode).replace(/#ref#/gi, G.ref).replace(/#gallery-image#/gi, G.galleryImage).replace(/#icon-image#/gi, G.iconImage).replace(/#name#/gi, G.name).replace(/#color#/gi, G.color))
                        });
                        var y = v[0];
                        return t.popupProductHtml.replace(/#name#/gi, y.name).replace(/#product-url#/gi, C).replace(/#gallery-image#/gi, y.galleryImage).replace(/#yanse#/gi, "").replace(/#selected-color#/gi, "").replace(/#colors#/gi, w.toString())
                    } else {
                        if (a.isPlainObject(B.collocate)) {
                            if (B.collocate.empty) {
                                return t.popupProductHtml
                            } else {
                                var v = B.collocate.colors.colors,
                                w = new stringBuilder();
                                var y = v[0];
                                a.each(v,
                                function(G, H) {
                                    var F = t.colorHtml4Collocate.replace(/#product-code#/gi, H.productCode).replace(/#ref#/gi, H.ref).replace(/#gallery-image#/gi, H.galleryImage).replace(/#icon-image#/gi, H.iconImage).replace(/#name#/gi, H.name).replace(/#color#/gi, H.color);
                                    if (H.productCode == B.collocate.productCode) {
                                        y = H;
                                        F = F.replace("track", "selected track")
                                    }
                                    w.append(F)
                                });
                                var D = B.collocate.sizes["p" + B.collocate.productCode],
                                E = new stringBuilder();
                                a.each(D,
                                function(G, H) {
                                    var F = t.sizeHtml4Collocate.replace(/#sku#/gi, H.sku).replace(/#ref#/gi, H.ref).replace(/#size#/gi, H.size);
                                    E.append(F)
                                });
                                return t.popupProductHtml.replace(/#name#/gi, y.name).replace(/#product-url#/gi, C).replace(/#gallery-image#/gi, y.galleryImage).replace(/#yanse#/gi, "").replace(/#selected-color#/gi, "").replace(/#sizes#/gi, D.length > 0 ? E.toString() : t.noSizeHtml).replace(/#colors#/gi, w.toString()).replace(/sp_cart_mycart_present_sure_add_to_cart/, "sp_cart_mycart_collocate_sure_add_to_cart")
                            }
                        } else {
                            if (a.isPlainObject(B.RBC)) {
                                var D = B.RBC.sizes.sizes,
                                E = new stringBuilder();
                                a.each(D,
                                function(F, G) {
                                    E.append(t.size4RBCHtml.replace(/#sku#/gi, G.sku).replace(/#ref#/gi, G.ref).replace(/#size#/gi, G.size))
                                });
                                var z = A.find("img").attr("alt");
                                return t.popupProductHtml.replace(/#name#/gi, z).replace(/#product-url#/gi, C).replace(/#gallery-image#/gi, A.data("galleryImage")).replace(/#yanse#/gi, " yanse").replace(/#colors#/gi, t.color4RBCHtml.replace(/#color#/gi, B.RBC.color)).replace(/#selected-color#/gi, B.RBC.color).replace(/#sizes#/gi, D.length > 0 ? E.toString() : t.noSizeHtml)
                            }
                        }
                    }
                }
            },
            addItem: function(w, v) {
                var x = w.attr("href");
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: vancl.addQueryString(x, "async", "true"),
                    beforeSend: function() {
                        g.setGlobalLoadTip(false)
                    },
                    success: function(y) {
                        if (g.valid(y)) {
                            a("#cart-gift").html(y);
                            if (v) {
                                delete o.removedProducts[vancl.getUrlValByName(x, "sku")]
                            }
                            g.changed()
                        }
                    },
                    complete: function() {
                        g.setGlobalLoadTip(true)
                    }
                })
            },
            add2Favorite: function(x, w, v) {
                var y = x.attr("href");
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: vancl.addQueryString(y, "async", "true"),
                    beforeSend: function() {
                        if (w) {
                            g.setGlobalLoadTip(false)
                        }
                    },
                    success: function(z) {
                        if (g.valid(z)) {
                            a("#cart-gift").html(z);
                            if (v) {
                                delete o.removedProducts[vancl.getUrlValByName(y, "sku")]
                            }
                            if (w) {
                                g.changed()
                            } else {
                                g.cartInit();
                                g.add2RemovedList(o.removedProducts);
                                l[0].loaded = false;
                                a(c).triggerHandler("scroll")
                            }
                        } else {
                            d.add2Favorite = function() {
                                g.add2Favorite(x, w)
                            }
                        }
                    },
                    complete: function() {
                        g.setGlobalLoadTip(true)
                    }
                })
            },
            add2RemovedList: function(y) {
                var z = a("#remove-product"),
                w = t.delItemHtml,
                v = null,
                x = new stringBuilder();
                a.each(y,
                function(A, C) {
                    if (C === null || typeof C !== "object") {
                        return true
                    }
                    var B = C;
                    if (!B.isPoint) {
                        v = t.add2FavHtml.replace(/#add-faverate-url#/gi, B.addFaverateUrl)
                    } else {
                        v = null
                    }
                    x.append(w.replace(/#product-url#/gi, B.productUrl).replace(/#img-url#/gi, B.imgUrl).replace(/#name#/gi, B.productName).replace(/#size#/gi, B.size).replace(/#price#/gi, B.price).replace(/#amount#/gi, B.amount).replace(/#is-point#/gi, B.isPoint).replace(/#clothes-code#/gi, B.clothesCode).replace(/#add-item-url#/gi, B.addItemUrl).replace(/#add-fav-html#/gi, v || ""))
                });
                z.find("tbody").html(x.toString());
                if (z.find("tbody>tr").length > 0) {
                    z.show()
                } else {
                    z.hide()
                }
            },
            del: function(x) {
                var y = x.attr("href"),
                w = x.closest("tbody").is("#present-product"),
                v = vancl.getUrlValByName(y, "ispoint") === "true" ? true: false;
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: vancl.addQueryString(y, "async", "true"),
                    beforeSend: function() {
                        g.setGlobalLoadTip(false)
                    },
                    success: function(z) {
                        /*if (g.valid(z)) {
                            if (!w) {
                                g.getRemovedList(x.closest("tr"), v)
                            }
                            a("#cart-gift").html(z);
                            g.changed(!w)
                        }*/
						window.location.reload();
                    },
                    complete: function() {
                        g.setGlobalLoadTip(true);
                        g.loadMediaVIframe()
                    }
                })
            },
            emptyOfflineProduct: function() {
                a.ajax({
                    type: "GET",
                    dataType: "text",
                    url: vancl.addQueryString(a("#offline-product").find("thead .clear-offline-product").attr("href"), "async", "true"),
                    success: function(v) {},
                    complete: function() {
                        a("#offline-product").empty().hide()
                    }
                })
            },
            batchDelCart: function(v, w) {
                if (!this.hasChecked(w)) {
                    e({
                        title: t.tipStr,
                        msg: t.noCheckedDelTip
                    });
                    return
                } else {
                    k({
                        title: t.tipStr,
                        msg: v[0].checked ? t.batchDelAllTip: t.batchDelTip,
                        fn: function() {
                            a.ajax({
                                type: "GET",
                                url: t.batchdelcartUrl,
                                beforeSend: function() {
                                    g.setGlobalLoadTip(false)
                                },
                                success: function(x) {
                                    if (g.valid(x)) {
                                        var y = a("#general-product").children(".selected"),
                                        z = a("#point-product").children(".selected");
                                        g.getRemovedList(y, false);
                                        g.getRemovedList(z, true);
                                        a("#cart-gift").html(x);
                                        g.changed()
                                    }
                                },
                                complete: function() {
                                    g.setGlobalLoadTip(true);
                                    g.loadMediaVIframe()
                                }
                            })
                        }
                    })
                }
            },
            updateAllSettlementStatus: function(v) {
                var w = t.updateAllSettlementStatusUrl + "?settlementStatus=" + v + "&async=true";
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: w,
                    beforeSend: function() {
                        g.setGlobalLoadTip(false)
                    },
                    success: function(x) {
                        if (g.valid(x)) {
                            a("#cart-gift").html(x);
                            g.changed()
                        }
                    },
                    complete: function() {
                        g.setGlobalLoadTip(true)
                    }
                })
            },
            updateSettlementStatus: function(v) {
                var z = v;
                var w = z.nextAll("input[name='promotionId']").val();
                var x = z.nextAll("input[name='promotionIndex']").val();
                var y = t.updateSettlementStatusUrl + "?sku=" + z.closest("tr").find("input[name='sku']").val() + "&isPoint=" + z.closest("tr").find("input[name='ispoint']").val() + "&settlementStatus=" + z.attr("checked");
                if (typeof w != "undefined" && w.length > 0) {
                    y = y + "&promotionId=" + w + "&promotionIndex=" + x
                }
                y = y + "&async=true";
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: y,
                    beforeSend: function() {
                        g.setGlobalLoadTip(false)
                    },
                    success: function(A) {
                        if (g.valid(A)) {
                            a("#cart-gift").html(A);
                            g.changed()
                        }
                    },
                    complete: function() {
                        g.setGlobalLoadTip(true)
                    }
                })
            },
            decrease: function(w) {
                var v = a(w);
                if (v.is(".decrease-disable")) {
                    return false
                }
                this.submitUpdateQty(vancl.addQueryString(v.attr("href"), "async", "true"))
            },
            increase: function(w) {
                var v = a(w);
                if (v.is(".increase-disable")) {
                    return false
                }
                this.submitUpdateQty(vancl.addQueryString(v.attr("href"), "async", "true"))
            },
            updateQty: function(v) {
                var w = v;
                var x = w.parent().attr("action") + "?sku=" + w.nextAll("input[name='sku']").val() + "&qty=" + w.val() + "&isPoint=" + w.nextAll("input[name='ispoint']").val() + "&async=true";
                this.submitUpdateQty(x, w)
            },
            submitUpdateQty: function(w, v) {
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: w,
                    beforeSend: function() {
                        g.setGlobalLoadTip(false)
                    },
                    success: function(x) {
                        if (g.valid(x)) {
                            a("#cart-gift").html(x);
                            g.changed()
                        } else {
                            if (typeof v !== "undefined") {
                                v.val(v.nextAll("input[name='product-qty']").val())
                            }
                        }
                    },
                    complete: function() {
                        g.setGlobalLoadTip(true)
                    }
                })
            },
            updateSize: function(B, H) {
                var y = B.closest("li"),
                v = y.find("input.add-to-cart"),
                D = v.data("product-colors").colors[B.data("index")];
                var x = B.closest(".choose").find(".choose-gallery"),
                A = B.find("img").attr("alt");
                x.attr({
                    href: B.attr("href"),
                    title: A
                });
                x.find("img").attr({
                    src: B.data("gallery-image"),
                    alt: A
                });
                B.siblings().removeClass("selected");
                B.addClass("selected");
                var J = B.attr("href"),
                C = D.productCode,
                E = D.promoteeId,
                F = D.promoteeIndex,
                G = vancl.getUrlValByName(J, "ref", true),
                z = v.data("product-sizes")["p" + C],
                I = new stringBuilder();
                a.each(z,
                function(K, L) {
                    I.append(H.replace(/#promotee-id#/gi, E).replace(/#promotee-index#/gi, F).replace(/#sku#/gi, L.sku).replace(/#ref#/gi, G).replace(/#size#/gi, L.size))
                });
                var w = B.closest(".shangpin").nextAll(".chima");
                w.html(I.toString());
                w.children("a:eq(0)").click()
            },
            updateSuperPresentSize: function(w) {
                var v = w.closest(".super-present-shangpin").nextAll(".super-present-chima"),
                B = w.closest(".super-present-content"),
                C = B.prevAll(".super-present-gallery"),
                y = B.find(".choose-it").find("span:eq(0)"),
                D = B.find("div.title:eq(0)>.super-present-name"),
                z = w.data("product-sizes")["sizes"],
                x = w.find("img"),
                A = new stringBuilder();
                D.attr({
                    href: w.attr("href"),
                    title: x.attr("alt")
                }).text(x.attr("alt"));
                y.text(x.attr("title"));
                C.attr("src", w.data("bigimg-url"));
                a.each(z,
                function(E, F) {
                    A.append(t.superPresentSizeHtml.replace(/#url#/gi, F.url).replace(/#size#/gi, F.size))
                });
                v.html(A.toString());
                v.children("a:eq(0)").click()
            },
            checkOut: function() {
                var v = a("#cart-product").find(".btn-panel .checkout");
                if (v.is(".checkout-loading")) {
                    return
                }
                var w = v.attr("href");
                v.addClass("checkout-loading");
                g.setmodalLoadTip(v, t.checkOutLoading);
                d.isCheckOut = true;
                a.ajax({
                    type: "GET",
                    cache: false,
                    url: vancl.addQueryString(w, "async", "true"),
                    beforeSend: function() {},
                    success: function(x) {
                        if (g.valid(x)) {
                            if (a("body").data("is-login-status")) {
                                a("body").data("is-login-status", false)
                            }
                        } else {
                            v.removeClass("checkout-loading").text(t.checkOutTxt)
                        }
                    },
                    error: function() {
                        v.removeClass("checkout-loading").text(t.checkOutTxt)
                    },
                    complete: function() {}
                })
            },
            recommendRecentFavoriteCallback: function(w) {
                var v = w.find(".pager-panel"),
                x = v.prevAll("ul.product-list").children();
                g.commonPagination(v, x)
            },
            loadMediaVIframe: function() {
                try {
                    var x = new Date().getTime();
                    var w = a("#MediaV");
                    w.attr("src", "http://pagex.vancl.com.cn/shopping/iframe.MediaV.htm?=" + x)
                } catch(v) {}
            },
            loadRecentFavorite: function(v) {
                var w;
                switch (v) {
                case t.recent:
                    p[0].loaded = true;
                    w = t.recentUrl;
                    this.setmodalLoadTip(p);
                    break;
                case t.favorite:
                    l[0].loaded = true;
                    w = t.favoriteUrl;
                    this.setmodalLoadTip(l);
                    break;
                default:
                    break
                }
                a.ajax({
                    type:
                    "GET",
                    url: w,
                    cache: false,
                    global: false,
                    beforeSend: function() {},
                    success: function(x) {
                        if (g.valid(x)) {
                            switch (v) {
                            case t.recent:
                                p.html(x);
                                g.recommendRecentFavoriteCallback(p);
                                break;
                            case t.favorite:
                                l.html(x);
                                g.recommendRecentFavoriteCallback(l);
                                break;
                            default:
                                break
                            }
                        }
                    },
                    error: function() {
                        switch (v) {
                        case t.recent:
                            p.html("");
                            break;
                        case t.favorite:
                            l.html("");
                            break;
                        default:
                            break
                        }
                    }
                })
            },
            loadRecommend: function() {
                u[0].loaded = true;
                this.setmodalLoadTip(u);
                var v = [];
                a("#general-product").find("input[name='product-code']").each(function(w) {
                    if (w < 10) {
                        v.push(a(this).val())
                    } else {
                        return false
                    }
                });
                a.ajax({
                    type: "GET",
                    url: t.recommendUrl,
                    data: {
                        productCodes: v.join(",")
                    },
                    cache: false,
                    global: false,
                    beforeSend: function() {},
                    success: function(w) {
                        if (g.valid(w)) {
                            u.html(w);
                            g.recommendRecentFavoriteCallback(u)
                        }
                    },
                    error: function() {
                        u.html(t.emptyRecommendHtml)
                    }
                })
            },
            loadRecent: function() {
                this.loadRecentFavorite(t.recent)
            },
            loadFavorite: function() {
                this.loadRecentFavorite(t.favorite)
            },
            loadCollocate: function() {
                j.show();
                g.setmodalLoadTip(i, o.collocateListLoadingHtml);
                i.show();
                a.ajax({
                    type: "GET",
                    url: t.loadCollocate,
                    cache: false,
                    global: false,
                    beforeSend: function() {},
                    success: function(v) {
                        if (g.valid(v)) {
                            i.html(v);
                            var w = i.find(".pager-panel"),
                            x = w.prevAll("ul.product-list").children();
                            g.commonPagination(w, x);
                            w.hide()
                        }
                    },
                    error: function() {
                        i.html("")
                    }
                })
            },
            loadCollocateColors: function(w, v) {
                a.ajax({
                    type: "GET",
                    url: w,
                    cache: false,
                    global: false,
                    async: true,
                    success: function(x) {
                        v(x)
                    },
                    error: function() {
                        i.html("")
                    }
                })
            }
        };
        c.cart = g;
        c.cartSetting = t;
        c.account = d;
        c.globalSetting = o
    })
})(jQuery, window);
$(function() {
    var e = $("#header"),
    g = $("#point-tip"),
    d = $("#gift"),
    h = $("#recom-browse-collect"),
    c = $("#content"),
    i = vancl.simpleDialog,
    a = vancl.dialog.alert,
    b = vancl.dialog.confirm;
    //cart.loadCart(true);
    $("body").delegate("#favorite .login", "click",
    function() {
        account.LoginOnCart(false);
        return false
    });
    $("body").click(function(j) {});
    e.bind("click",
    function(j) {
        var k = $(j.target);
        if (k.is(".login,.switch")) {
            account.LoginOnCart(false);
            return false
        } else {
            if (k.is(".reg")) {
                account.LoginOnCart(true);
                return false
            } else {
                if (k.is(".logout")) {
                    account.LoginOutOnCart();
                    return false
                }
            }
        }
    });
    c.bind("click",
    function(j) {
        var k = $(j.target),
        l = $("#cart>.tip");
        if (k.is(".login")) {
            account.LoginOnCart(false);
            return false
        } else {
            if (k.is(".gwqd")) {
                l.show();
                return false
            } else {
                if (k.is("#cart>.tip>.close")) {
                    l.hide();
                    return false
                }
            }
        }
    });
    c.delegate("#offline-product thead a", "click",
    function(j) {
        cart.emptyOfflineProduct();
        return false
    });
    c.delegate("#offline-product tbody .add-faverate", "click",
    function(j) {
        i(j, {
            sure: function() {
                cart.add2Favorite($(j.target), false)
            },
            msg: globalSetting.add2FavoriteMsg
        });
        return false
    });
    c.delegate("#point-tip .close", "click",
    function(j) {
        $("#point-tip").slideUp();
        return false
    });
    c.delegate("#cart-product tbody .decrease,#cart-product tbody .increase,#cart-product tbody .add-faverate,#cart-product tbody .del, #cart-product .checkout", "click",
    function(l) {
        var m = $(this);
        if (m.is(".decrease")) {
            cart.decrease(this)
        } else {
            if (m.is(".increase")) {
                cart.increase(this)
            } else {
                if (m.is(".add-faverate")) {
                    var j = i(l, {
                        sure: function() {
                            cart.add2Favorite(m, true)
                        },
                        msg: globalSetting.add2FavoriteMsg
                    });
                    j.find(".sure,.cancel,.cancel-icon").toggleClass("track", true);
                    j.find(".sure").attr("name", "sp_cart_mycart_addfaverate");
                    j.find(".cancel,.cancel-icon").attr("name", "sp_cart_mycart_canclfaverate")
                } else {
                    if (m.is(".del")) {
                        var k = i(l, {
                            sure: function() {
                                cart.del(m)
                            },
                            msg: globalSetting.delMsg
                        });
                        k.find(".sure,.cancel,.cancel-icon").toggleClass("track", true);
                        k.find(".sure").attr("name", "sp_cart_mycart_delok");
                        k.find(".cancel,.cancel-icon").attr("name", "sp_cart_mycart_delcancl")
                    } else {
                        if (m.is(".checkout")) {
                            if (!cart.hasChecked($("#batchdelcart input[name='p-item']"))) {
                                a({
                                    title: globalSetting.tipStr,
                                    msg: globalSetting.batchCheckOutTip
                                });
                                return false
                            }
                            if (cart.setPointTip()) {
                                return false
                            }
                            if ($("#cart-product").data("jobs-alert") === "true" || $("#present-product").children().length < 1) {
                                b({
                                    title: globalSetting.noPresentTitle,
                                    msg: globalSetting.noPresentMsg,
                                    fn: cart.checkOut
                                })
                            } else {
                                cart.checkOut()
                            }
                        }
                    }
                }
            }
        }
        return false
    });
    c.delegate("#cart-product input[name='all-products'], #cart-product input[name='p-item']", "click",
    function(m) {
        var q = $(this),
        k = q.closest("#cart-product"),
        j = k.find("input[name='all-products']"),
        p = k.find("input[name='p-item']");
        if (q.is("input[name = 'all-products']")) {
            var n = q[0].checked;
            var o = q.attr("data-del-tip");
            if (n || o == 0) {
                q.attr("checked", n);
                var l = k.find("input[type='checkbox']");
                cart.allCbxClick(q, l,
                function() {
                    cart.setAllTrStyle(q)
                });
                cart.updateAllSettlementStatus(q[0].checked)
            } else {
                m.preventDefault();
                b({
                    title: globalSetting.tipStr,
                    msg: o,
                    fn: function() {
                        q.attr("checked", n);
                        var r = k.find("input[type='checkbox']");
                        cart.allCbxClick(q, r,
                        function() {
                            cart.setAllTrStyle(q)
                        });
                        cart.updateAllSettlementStatus(q[0].checked)
                    }
                })
            }
        } else {
            if (q.is("input[name = 'p-item']")) {
                cart.updateSettlementStatus(q);
                cart.singleCbxClick(j, p,
                function() {
                    var r = q.attr("data-del-tip");
                    cart.setTrStyle(q)
                })
            }
        }
    });
    c.delegate(".batch-del-cart", "click",
    function(l) {
        var k = $(this).closest("#batchdelcart").find("table td.bar input[name = 'p-item']"),
        j = $(this).prevAll("input[name='all-products']");
        cart.batchDelCart(j, k);
        return false
    });
    c.delegate("#collocate", "click",
    function(j) {
        j.preventDefault();
        cart.loadCollocate()
    });
    c.delegate("#cart-product input[name='qty']", "keydown change",
    function(j) {
        var k = $(this),
        l = j.which;
        if ((j.type === "keydown" && l === 13) || j.type === "change") {
            if (parseInt(k.val()) < 1) {
                vancl.dialog.alert({
                    title: globalSetting.tipStr,
                    msg: globalSetting.updateQtyMsg,
                    modal: true,
                    fn: function() {
                        $(this).dialog("close");
                        k.val(1);
                        cart.updateQty(k);
                        k.focus()
                    }
                })
            } else {
                cart.updateQty(k)
            }
            return false
        }
    });
    c.delegate("#cart-product .discount-logo", "mouseenter mouseleave",
    function(l) {
        var m = l.type,
        j = $(this),
        k = j.next(".discount-dialog");
        if (m === "mouseenter") {
            k.show()
        } else {
            if (m === "mouseleave") {
                k.hide()
            }
        }
        return false
    });
    c.delegate("#remove-product .rebuy,#remove-product .addfav", "click",
    function(j) {
        var k = $(this);
        if (k.is(".rebuy")) {
            cart.addItem(k, true)
        } else {
            if (k.is(".addfav")) {
                i(j, {
                    sure: function() {
                        cart.add2Favorite(k, false, true)
                    },
                    msg: globalSetting.add2FavoriteMsg
                })
            }
        }
        return false
    });
    c.delegate("#super-present .super-present-more, #super-present .super-present-add2cart,#super-present .super-present-color,#super-present .super-present-size, #super-present .super-present-sure,#super-present .super-present-close", "click",
    function(k) {
        k.preventDefault();
        var j = $(this);
        if (j.is(".super-present-more")) {
            var m = j.parent(),
            n;
            if (m.is(".super-present-shangpin")) {
                n = "color"
            } else {}
            cart.hideChooseDialogFixIe();
            cart.createSuperPresentPopup(n, j)
        } else {
            if (j.is(".super-present-add2cart")) {
                cart.addItem(j.closest(".super-present-content").find(".super-present-chima .selected"))
            } else {
                k.stopPropagation();
                if (j.is(".super-present-close") || j.is(".super-present-sure")) {
                    j.closest(".choose").hide()
                } else {
                    var l;
                    if (j.is(".super-present-color")) {
                        l = j.closest(".super-present-shangpin").find(".super-present-color");
                        if (!j.is(".selected")) {
                            cart.updateSuperPresentSize(j)
                        }
                    } else {
                        l = j.closest(".super-present-chima").find(".super-present-size");
                        j.closest(".content").nextAll(".choose-it").find("span:eq(1)").text(j.text())
                    }
                    l.removeClass("selected");
                    j.addClass("selected")
                }
            }
        }
    });
    c.delegate("#gift-item-panel .tab>li,#gift .list-img-panel,#gift .name,#gift .add-to-cart,#gift .close,#gift .sure,#gift .color,#gift .size,#collocate-list .list-img-panel,#collocate-list .name,#collocate-list .color,#collocate-list .add-to-cart,#collocate-list .close,#collocate-list .sure,#collocate-list .size", "click",
    function(n) {
        n.preventDefault();
        var j = $(".choose"),
        t = $(this),
        q = $(".product-list"),
        p = $(".product-list").children("li"),
        m = t.closest("li");
        if (t.is(".tab>li")) {
            var s = t.parent(),
            q = $("#gift-item-panel .product-list-panel"),
            o = s.children("li").index(t);
            cart.hideChooseDialogFixIe();
            s.children("li").removeClass("selected");
            t.addClass("selected");
            q.hide().eq(o).show();
            $(window).triggerHandler("scroll")
        } else {
            if (t.is(".add-to-cart")) {
                if (m.find(".choose").length < 1) {
                    if (t.attr("name") === "sp_cart_mycar_collocate-add") {
                        var u = m.find("form").attr("action");
                        /*m.append(cart.createPopupProduct({
                            collocate: {
                                productCode: u.substr(38, 7),
                                empty: true
                            }
                        },
                        t));*/
                        var l = m.find(".choose");
                        cart.setmodalLoadTip(l, globalSetting.collocateLoadHtml);
                        cart.loadCollocateColors(u,
                        function(x) {
                            t.attr("data-product-sizes", x.sizes);
                            t.attr("data-product-colors", x.colors);
                            /*var y = cart.createPopupProduct({
                                collocate: {
                                    productCode: u.substr(38, 7),
                                    empty: false,
                                    sizes: t.data("product-sizes"),
                                    colors: t.data("product-colors")
                                }
                            },
                            t);*/
                            var w = $(y).find(".choose-inner");
                            l.html(w);
                            l.find(".content>.shangpin>a.selected").removeClass("selected").click()
                        })
                    } else {
                        var k = t.data("product-colors");
                        /*m.append(cart.createPopupProduct({
                            present: k
                        },
                        t))*/
                    }
                }
                if (!m.is(".selected")) {
                    j.hide();
                    q.removeClass("selected");
                    p.removeClass("selected");
                    m.addClass("selected").closest("ul").addClass("selected");
                    m.find(".content>.shangpin>a:eq(0)").click()
                }
                m.closest("ul").children().filter(":visible:gt(2)").find(".choose").toggleClass("left", true);
                m.find(".choose").show()
            } else {
                if (t.is(".list-img-panel") || t.is(".name")) {
                    m.find(".add-to-cart").click()
                } else {
                    if (t.is(".close")) {
                        t.closest(".choose").hide()
                    } else {
                        if (t.is(".sure")) {
                            var v = t.closest(".choose").find(".content .chima>.selected");
                            if (v.length <= 0) {
                                return
                            }
                            cart.addItem(v)
                        } else {
                            if (t.is(".color")) {
                                if (!t.is(".selected")) {
                                    t.siblings().removeClass("selected");
                                    t.addClass("selected");
                                    t.closest(".content").next().children("span:eq(0)").text(t.children("img").attr("title"));
                                    t.data("index", t.parent().children().index(t));
                                    var r = cartSetting.sizeHtml;
                                    if (t.attr("name") == "sp_cart_mycart_collocate_color") {
                                        r = cartSetting.sizeHtml4Collocate
                                    }
                                    cart.updateSize(t, r)
                                }
                            } else {
                                if (t.is(".size")) {
                                    t.siblings().removeClass("selected");
                                    t.addClass("selected");
                                    t.closest(".content").next().children("span:eq(1)").text(t.text())
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    c.delegate("#recom-browse-collect .list-img-panel,#recom-browse-collect .name,#recom-browse-collect .add-to-cart,#recom-browse-collect .close,#recom-browse-collect .sure,#recom-browse-collect .size", "click",
    function(m) {
        m.preventDefault();
        var j = $(".choose"),
        q = $(this),
        n = $(".product-list").children("li"),
        l = q.closest("li");
        if (q.is(".add-to-cart")) {
            if (l.find(".choose").length < 1) {
                var p = q.data("product-sizes"),
                k = q.data("product-color");
                /*l.append(cart.createPopupProduct({
                    RBC: {
                        sizes: p,
                        color: k
                    }
                },
                q))*/
            }
            if (!l.is(".selected")) {
                j.hide();
                n.removeClass("selected");
                l.addClass("selected");
                l.find(".content>.chima>a:eq(0)").click()
            }
            l.closest("ul").children().filter(":visible:gt(2)").find(".choose").toggleClass("left", true);
            l.find(".choose").show()
        } else {
            if (q.is(".list-img-panel") || q.is(".name")) {
                l.find(".add-to-cart").click()
            } else {
                if (q.is(".close")) {
                    q.closest(".choose").hide()
                } else {
                    if (q.is(".sure")) {
                        var o = q.closest(".choose").find(".content .chima>.selected");
                        cart.addItem(o);
                        if (q.closest(".product-list-panel").is("#favorite")) {
                            q.closest("li.selected").remove()
                        }
                    } else {
                        if (q.is(".size")) {
                            q.siblings().removeClass("selected");
                            q.addClass("selected");
                            q.closest(".content").next().children("span:eq(1)").text(q.text())
                        }
                    }
                }
            }
        }
    });
    c.delegate("#recom-browse-collect .tab>li", "click",
    function(j) {
        j.preventDefault();
        var l = h.find(".product-list-panel"),
        n = $(this),
        m = n.parent(),
        k = m.children("li").index(n);
        cart.hideChooseDialogFixIe();
        m.children("li").removeClass("selected");
        n.addClass("selected");
        l.filter(":not(:eq(" + k + "))").hide();
        h.children("div:eq(" + k + ")").show();
        if (!l.eq(k)[0].loaded) {
            switch (k) {
            case 0:
                cart.loadRecent();
                break;
            case 1:
                cart.loadRecommend();
                break;
            case 2:
                cart.loadFavorite();
                break;
            default:
                break
            }
        }
    });
    var f = null;
    $(window).bind("scroll",
    function() {
        clearTimeout(f);
        /*f = setTimeout(function() {
            if (!d[0].loaded && !$.belowthefold(d[0], {
                threshold: 0,
                container: window
            })) {
                cart.loadGift(d);
                d[0].loaded = true
            }
            var l = h.filter(":above-the-fold").length > 0;
            if (l) {
                var n = h.find(".tab"),
                j = n.find("li").index(n.find(".selected"));
                var m = h.find(".product-list-panel");
                if (!m.eq(j)[0].loaded) {
                    h.find(".tab>li:eq(" + j + ")").click()
                }
            }
            var k = (location.protocol === "http:");
            $("img.lazy:visible").each(function() {
                var p = $(this);
                if (p.filter(":above-the-fold").length > 0 && !this.loaded) {
                    var o = p.data("origin");
                    o = (k ? o.replace(staticResourcePath.sslimg, staticResourcePath.img) : o);
                    p.attr("src", o);
                    this.loaded = true
                }
            })
        },
        500)*/
    });
    $(window).resize(function() {
        $(window).triggerHandler("scroll")
    });
    c.delegate(".product-list-panel>div.prev,.product-list-panel>div.next", "click",
    function(j) {
        var l = $(this);
        var k = Math.ceil(l.siblings("ul.product-list").children().length / globalSetting.itemsPerPage);
        if (l.is(".prev")) {
            cart.goToPage(k, l.nextAll(".pager-panel"), false)
        } else {
            if (l.is(".next")) {
                cart.goToPage(k, l.nextAll(".pager-panel"), true)
            }
        }
    })
});