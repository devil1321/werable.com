"use strict";
exports.__esModule = true;
var react_1 = require("react");
var product_component_1 = require("./product.component");
var useVariant_1 = require("@/app/hooks/useVariant");
var useInCart_1 = require("@/app/hooks/useInCart");
var useFavoruite_1 = require("@/app/hooks/useFavoruite");
var useSyncProduct_1 = require("@/app/hooks/useSyncProduct");
var useQuantity_1 = require("@/app/hooks/useQuantity");
var ShopActions = require("@/app/controller/action-creators/shop.action-creators");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var image_1 = require("next/image");
var useVariantIndex_1 = require("@/app/hooks/useVariantIndex");
var useTemplate_1 = require("@/app/hooks/useTemplate");
var gsap_1 = require("gsap");
var Item = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    var product = _a.product, id = _a.id;
    var dispatch = react_redux_1.useDispatch();
    var shopActions = redux_1.bindActionCreators(ShopActions, dispatch);
    var _3 = useSyncProduct_1["default"](id ? id : product === null || product === void 0 ? void 0 : product.id), item = _3[0], setItem = _3[1];
    var _4 = useVariant_1["default"](id ? id : product === null || product === void 0 ? void 0 : product.id), variant = _4[0], setVariant = _4[1];
    var _5 = useFavoruite_1["default"]((_c = (_b = item === null || item === void 0 ? void 0 : item.result) === null || _b === void 0 ? void 0 : _b.sync_product) === null || _c === void 0 ? void 0 : _c.id), isFavoruite = _5[0], setIsFavoruite = _5[1];
    var _6 = useVariantIndex_1["default"]((_e = (_d = item === null || item === void 0 ? void 0 : item.result) === null || _d === void 0 ? void 0 : _d.sync_product) === null || _e === void 0 ? void 0 : _e.id), variantIndex = _6[0], setVariantIndex = _6[1];
    var _7 = useInCart_1["default"]((_g = (_f = item === null || item === void 0 ? void 0 : item.result) === null || _f === void 0 ? void 0 : _f.sync_product) === null || _g === void 0 ? void 0 : _g.id), inCart = _7[0], setInCart = _7[1];
    var _8 = useQuantity_1["default"]((_j = (_h = item === null || item === void 0 ? void 0 : item.result) === null || _h === void 0 ? void 0 : _h.sync_product) === null || _j === void 0 ? void 0 : _j.id), quantity = _8[0], setQuantity = _8[1];
    var _9 = useTemplate_1["default"]((_l = (_k = item === null || item === void 0 ? void 0 : item.result) === null || _k === void 0 ? void 0 : _k.sync_product) === null || _l === void 0 ? void 0 : _l.id, 0, 100), template = _9[0], setTemplate = _9[1];
    var _10 = react_1.useState(null), size = _10[0], setSize = _10[1];
    var _11 = react_1.useState(null), color = _11[0], setColor = _11[1];
    var sizesMenuRef = react_1.useRef();
    var colorsMenuRef = react_1.useRef();
    var handleItem = function (size, color) {
        if (size && color) {
            var variants = item === null || item === void 0 ? void 0 : item.result.sync_variants.filter(function (v) { var _a; return ((_a = v === null || v === void 0 ? void 0 : v.size) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === size.toLowerCase(); });
            var variant_1 = variants.find(function (v) { var _a; return ((_a = v === null || v === void 0 ? void 0 : v.color) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === color.toLowerCase(); });
            var index = item === null || item === void 0 ? void 0 : item.result.sync_variants.indexOf(variant_1);
            // @ts-ignore
            setVariantIndex(index);
        }
    };
    var handleMenu = function (ref) {
        if (!ref.current.classList.contains('--open')) {
            ref.current.style.display = 'block';
            ref.current.classList.add('--open');
            gsap_1["default"].fromTo(ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
        }
        else {
            gsap_1["default"].fromTo(ref.current, { y: 0, opacity: 1 }, { y: 100, opacity: 0, duration: 1, onComplete: function () {
                    ref.current.classList.remove('--open');
                    ref.current.style.display = 'none';
                } });
        }
    };
    var handleInitMenus = function () {
        if (sizesMenuRef.current) {
            sizesMenuRef.current.style.display = 'none';
        }
        if (colorsMenuRef.current) {
            colorsMenuRef.current.style.display = 'none';
        }
    };
    react_1.useEffect(function () {
        setSize(template === null || template === void 0 ? void 0 : template.sizes[0]);
        setColor(template === null || template === void 0 ? void 0 : template.colors[0]);
        handleInitMenus();
    }, [template, sizesMenuRef.current, colorsMenuRef.current]);
    react_1.useEffect(function () {
        handleItem(size, color === null || color === void 0 ? void 0 : color.color_name);
    }, [size, color]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, ((_o = (_m = item === null || item === void 0 ? void 0 : item.result) === null || _m === void 0 ? void 0 : _m.sync_variants) === null || _o === void 0 ? void 0 : _o.length) > 0 && variant
        ? react_1["default"].createElement("div", { className: "item p-2 my-5 md:flex justify-center items-center" },
            ((_q = (_p = item === null || item === void 0 ? void 0 : item.result) === null || _p === void 0 ? void 0 : _p.sync_variants[variantIndex]) === null || _q === void 0 ? void 0 : _q.retail_price) && react_1["default"].createElement(product_component_1["default"], { product: product, id: id }),
            ((_s = (_r = item === null || item === void 0 ? void 0 : item.result) === null || _r === void 0 ? void 0 : _r.sync_variants[variantIndex]) === null || _s === void 0 ? void 0 : _s.retail_price) &&
                react_1["default"].createElement("div", { className: "item-details relative top-0 left-0 z-50 w-[100%] xl:w-[50%] md:w-[70%] rounded-md md:ml-12 py-3 px-2 md:px-12" },
                    react_1["default"].createElement("div", { className: "item-controls flex gap-3 items-center flex-wrap md:flex-nowrap" },
                        react_1["default"].createElement("button", { className: 'px-8 py-2 font-bold text-white min-w-fit rounded-md', onClick: function () {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                                if (!inCart) {
                                    shopActions.addToCart((_b = (_a = item === null || item === void 0 ? void 0 : item.result) === null || _a === void 0 ? void 0 : _a.sync_product) === null || _b === void 0 ? void 0 : _b.id, (_d = (_c = item === null || item === void 0 ? void 0 : item.result) === null || _c === void 0 ? void 0 : _c.sync_variants[variantIndex]) === null || _d === void 0 ? void 0 : _d.id, (_f = (_e = item === null || item === void 0 ? void 0 : item.result) === null || _e === void 0 ? void 0 : _e.sync_variants[variantIndex]) === null || _f === void 0 ? void 0 : _f.variant_id, (_h = (_g = item === null || item === void 0 ? void 0 : item.result) === null || _g === void 0 ? void 0 : _g.sync_variants[variantIndex]) === null || _h === void 0 ? void 0 : _h.warehouse_product_variant_id, (_k = (_j = item === null || item === void 0 ? void 0 : item.result) === null || _j === void 0 ? void 0 : _j.sync_variants[variantIndex]) === null || _k === void 0 ? void 0 : _k.external_id, 1, (_m = (_l = item === null || item === void 0 ? void 0 : item.result) === null || _l === void 0 ? void 0 : _l.sync_variants[variantIndex]) === null || _m === void 0 ? void 0 : _m.retail_price, (_p = (_o = item === null || item === void 0 ? void 0 : item.result) === null || _o === void 0 ? void 0 : _o.sync_variants[variantIndex]) === null || _p === void 0 ? void 0 : _p.currency, variantIndex);
                                }
                            } }, inCart ? 'In Cart' : 'Add To Cart'),
                        react_1["default"].createElement("button", { className: 'px-5 py-2 font-bold text-white rounded-md' }, (_u = (_t = item === null || item === void 0 ? void 0 : item.result) === null || _t === void 0 ? void 0 : _t.sync_variants[variantIndex]) === null || _u === void 0 ? void 0 :
                            _u.retail_price, (_w = (_v = item === null || item === void 0 ? void 0 : item.result) === null || _v === void 0 ? void 0 : _v.sync_variants[variantIndex]) === null || _w === void 0 ? void 0 :
                            _w.currency),
                        react_1["default"].createElement("div", { onClick: function () { return handleMenu(sizesMenuRef); }, className: "relative top-0 left-0" },
                            react_1["default"].createElement("button", { className: 'px-5 py-2 font-bold text-white rounded-md' }, size),
                            react_1["default"].createElement("button", { ref: sizesMenuRef, className: "details-sizes-menu absolute top-12 left-1/2 -translate-x-1/2 w-[70px] p-3 rounded-lg bg-white shadow-lg shadow-gray-300 font-bold" }, (_x = template === null || template === void 0 ? void 0 : template.sizes) === null || _x === void 0 ? void 0 : _x.map(function (s) { return react_1["default"].createElement("p", { onClick: function () {
                                    setSize(s);
                                }, className: 'p-2 cursor-pointer hover:bg-green-300 rounded-lg hover:text-white' }, s); }))),
                        react_1["default"].createElement("div", { className: "relative top-0 left-0", onClick: function () { return handleMenu(colorsMenuRef); } },
                            react_1["default"].createElement("button", { className: 'px-5 py-2 font-bold text-white rounded-md' }, color === null || color === void 0 ? void 0 : color.color_name),
                            react_1["default"].createElement("button", { ref: colorsMenuRef, className: "details-color-menu absolute top-12 left-1/2 -translate-x-1/2 w-[105px] font-bold p-3 rounded-lg bg-white shadow-lg shadow-gray-300" }, (_y = template === null || template === void 0 ? void 0 : template.colors) === null || _y === void 0 ? void 0 : _y.map(function (c) { return react_1["default"].createElement("p", { onClick: function () {
                                    setColor(c);
                                }, className: "p-2 cursor-pointer italic hover:bg-green-300 rounded-lg hover:text-white" }, c === null || c === void 0 ? void 0 : c.color_name); }))),
                        react_1["default"].createElement("div", { className: "item-quantity flex items-center" },
                            react_1["default"].createElement("button", { className: 'px-4 py-2 font-bold text-center text-white rounded-l-md', onClick: function () {
                                    var _a, _b, _c, _d;
                                    // @ts-ignore
                                    setQuantity(quantity - 1);
                                    if (quantity < 1) {
                                        shopActions.removeFromCart((_b = (_a = item === null || item === void 0 ? void 0 : item.result) === null || _a === void 0 ? void 0 : _a.sync_product) === null || _b === void 0 ? void 0 : _b.id);
                                    }
                                    shopActions.decrement((_d = (_c = item === null || item === void 0 ? void 0 : item.result) === null || _c === void 0 ? void 0 : _c.sync_product) === null || _d === void 0 ? void 0 : _d.id, 1);
                                    shopActions.summary();
                                } }, "-"),
                            react_1["default"].createElement("button", { className: 'px-4 py-2 font-bold text-center text-white' }, quantity),
                            react_1["default"].createElement("button", { className: 'px-3.5 py-2 font-bold text-center text-white rounded-r-md', onClick: function () {
                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                                    // @ts-ignore
                                    setQuantity(quantity + 1);
                                    shopActions.increment((_b = (_a = item === null || item === void 0 ? void 0 : item.result) === null || _a === void 0 ? void 0 : _a.sync_product) === null || _b === void 0 ? void 0 : _b.id, 1);
                                    if (!inCart) {
                                        shopActions.addToCart((_d = (_c = item === null || item === void 0 ? void 0 : item.result) === null || _c === void 0 ? void 0 : _c.sync_product) === null || _d === void 0 ? void 0 : _d.id, (_f = (_e = item === null || item === void 0 ? void 0 : item.result) === null || _e === void 0 ? void 0 : _e.sync_variants[variantIndex]) === null || _f === void 0 ? void 0 : _f.id, (_h = (_g = item === null || item === void 0 ? void 0 : item.result) === null || _g === void 0 ? void 0 : _g.sync_variants[variantIndex]) === null || _h === void 0 ? void 0 : _h.variant_id, (_k = (_j = item === null || item === void 0 ? void 0 : item.result) === null || _j === void 0 ? void 0 : _j.sync_variants[variantIndex]) === null || _k === void 0 ? void 0 : _k.warehouse_product_variant_id, (_m = (_l = item === null || item === void 0 ? void 0 : item.result) === null || _l === void 0 ? void 0 : _l.sync_variants[variantIndex]) === null || _m === void 0 ? void 0 : _m.external_id, 1, (_p = (_o = item === null || item === void 0 ? void 0 : item.result) === null || _o === void 0 ? void 0 : _o.sync_variants[variantIndex]) === null || _p === void 0 ? void 0 : _p.retail_price, (_r = (_q = item === null || item === void 0 ? void 0 : item.result) === null || _q === void 0 ? void 0 : _q.sync_variants[variantIndex]) === null || _r === void 0 ? void 0 : _r.currency, variantIndex);
                                    }
                                    shopActions.summary();
                                } }, "+")),
                        react_1["default"].createElement("button", { className: 'item-favoruite px-2 py-[7px] rounded-md' }, !isFavoruite
                            ? react_1["default"].createElement(image_1["default"], { onClick: function () { var _a, _b; return shopActions.addFavoruite((_b = (_a = item === null || item === void 0 ? void 0 : item.result) === null || _a === void 0 ? void 0 : _a.sync_product) === null || _b === void 0 ? void 0 : _b.id, variantIndex); }, src: "/assets/heart-circle-plus-solid.svg", alt: 'icon-favoruites', width: 30, height: 30 })
                            : react_1["default"].createElement(image_1["default"], { onClick: function () { var _a, _b; return shopActions.removeFavoruite((_b = (_a = item === null || item === void 0 ? void 0 : item.result) === null || _a === void 0 ? void 0 : _a.sync_product) === null || _b === void 0 ? void 0 : _b.id); }, src: "/assets/heart-solid.svg", alt: 'icon-favoruites', width: 26, height: 26 }))),
                    react_1["default"].createElement("h2", { className: "font-bold my-5 text-3xl md:5xl w-max" }, (_0 = (_z = item === null || item === void 0 ? void 0 : item.result) === null || _z === void 0 ? void 0 : _z.sync_variants[variantIndex]) === null || _0 === void 0 ? void 0 : _0.name),
                    react_1["default"].createElement("p", { className: "text-sm" }, (_2 = (_1 = variant === null || variant === void 0 ? void 0 : variant.result) === null || _1 === void 0 ? void 0 : _1.product) === null || _2 === void 0 ? void 0 : _2.description),
                    react_1["default"].createElement("button", { onClick: function () { var _a, _b; return shopActions.removeFromCart((_b = (_a = item === null || item === void 0 ? void 0 : item.result) === null || _a === void 0 ? void 0 : _a.sync_product) === null || _b === void 0 ? void 0 : _b.id); }, className: 'block my-2 hover:opacity-70 w-[100%] py-2 rounded-full text-white font-bold text-2xl' }, "Remove")))
        : react_1["default"].createElement("h1", { className: 'bg-green-300 w-[90%] rounded-md mx-auto font-bold text-white text-5xl px-12 py-2 my-2' }, "...Loading")));
};
exports["default"] = Item;
