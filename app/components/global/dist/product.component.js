'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var gsap_1 = require("gsap");
var MotionPathPlugin_1 = require("gsap/dist/MotionPathPlugin");
var split_text_js_1 = require("split-text-js");
var useVariant_1 = require("@/app/hooks/useVariant");
var link_1 = require("next/link");
var ShopActions = require("@/app/controller/action-creators/shop.action-creators");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var useFavoruite_1 = require("@/app/hooks/useFavoruite");
var useInCart_1 = require("@/app/hooks/useInCart");
var useQuantity_1 = require("@/app/hooks/useQuantity");
var useVariantIndex_1 = require("@/app/hooks/useVariantIndex");
var useProduct_1 = require("@/app/hooks/useProduct");
var navigation_1 = require("next/navigation");
var Product = function (_a) {
    var _b, _c, _d, _e, _f;
    var product = _a.product, id = _a.id, productRef = _a.productRef;
    var user = react_redux_1.useSelector(function (state) { return state.api; }).user;
    var _g = useProduct_1["default"](product), sync_product = _g.sync_product, sync_variants = _g.sync_variants;
    var titleRef = react_1.useRef();
    var pathRef = react_1.useRef();
    var pathRefIcons = react_1.useRef();
    var favoruitesRef = react_1.useRef();
    var sizeRef = react_1.useRef();
    var cartRef = react_1.useRef();
    var infoRef = react_1.useRef();
    var plusRef = react_1.useRef();
    var minusRef = react_1.useRef();
    var breadcrumbRef = react_1.useRef();
    var _h = useVariant_1["default"](id ? id : sync_product === null || sync_product === void 0 ? void 0 : sync_product.id), variant = _h[0], setVariant = _h[1];
    var _j = useFavoruite_1["default"](sync_product === null || sync_product === void 0 ? void 0 : sync_product.id), isFavoruite = _j[0], setIsFavoruite = _j[1];
    var _k = useVariantIndex_1["default"](sync_product === null || sync_product === void 0 ? void 0 : sync_product.id), variantIndex = _k[0], setVariantIndex = _k[1];
    var _l = useInCart_1["default"](sync_product === null || sync_product === void 0 ? void 0 : sync_product.id), inCart = _l[0], setInCart = _l[1];
    var _m = useQuantity_1["default"](sync_product === null || sync_product === void 0 ? void 0 : sync_product.id), quantity = _m[0], setQuantity = _m[1];
    var dispatch = react_redux_1.useDispatch();
    var shopActions = redux_1.bindActionCreators(ShopActions, dispatch);
    var router = navigation_1.useRouter();
    var handleAnimationOut = function (e) {
        var _a;
        if (e) {
            e.stopPropagation();
        }
        breadcrumbRef.current.style.right = '-220px';
        if ((_a = titleRef === null || titleRef === void 0 ? void 0 : titleRef.current) === null || _a === void 0 ? void 0 : _a.classList.contains('--open')) {
            if (titleRef.current) {
                titleRef.current.style.opacity = '0';
                setTimeout(function () {
                    var _a, _b;
                    (_a = titleRef === null || titleRef === void 0 ? void 0 : titleRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove('--open');
                    (_b = titleRef === null || titleRef === void 0 ? void 0 : titleRef.current) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
                }, 1000);
            }
            if (favoruitesRef === null || favoruitesRef === void 0 ? void 0 : favoruitesRef.current) {
                favoruitesRef.current.style.transition = 'opacity 1s ease-in-out';
                favoruitesRef.current.style.opacity = '0';
                setTimeout(function () {
                    var _a, _b;
                    if (!((_b = (_a = favoruitesRef === null || favoruitesRef === void 0 ? void 0 : favoruitesRef.current) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('hidden'))) {
                        favoruitesRef.current.classList.add('hidden');
                    }
                }, 1000);
            }
            if (sizeRef.current) {
                sizeRef.current.style.transition = 'opacity 1s ease-in-out';
                sizeRef.current.style.opacity = '0';
                setTimeout(function () {
                    if (!sizeRef.current.classList.contains('hidden')) {
                        sizeRef.current.classList.add('hidden');
                    }
                }, 1000);
            }
            if (cartRef.current) {
                cartRef.current.style.transition = 'opacity 1s ease-in-out';
                cartRef.current.style.opacity = '0';
                setTimeout(function () {
                    if (!cartRef.current.classList.contains('hidden')) {
                        cartRef.current.classList.add('hidden');
                    }
                }, 1000);
            }
            if (infoRef.current) {
                infoRef.current.style.transition = 'opacity 1s ease-in-out';
                infoRef.current.style.opacity = '0';
                setTimeout(function () {
                    if (!infoRef.current.classList.contains('hidden')) {
                        infoRef.current.classList.add('hidden');
                    }
                }, 1000);
            }
            if (plusRef.current) {
                plusRef.current.style.transition = 'opacity 1s ease-in-out';
                plusRef.current.style.opacity = '0';
                setTimeout(function () {
                    if (!plusRef.current.classList.contains('hidden')) {
                        plusRef.current.classList.add('hidden');
                    }
                }, 1000);
            }
            if (minusRef.current) {
                minusRef.current.style.transition = 'opacity 1s ease-in-out';
                minusRef.current.style.opacity = '0';
                setTimeout(function () {
                    if (!minusRef.current.classList.contains('hidden')) {
                        minusRef.current.classList.add('hidden');
                    }
                }, 1000);
            }
        }
    };
    var handleAnimationIn = function (e) {
        if (e) {
            e.stopPropagation();
        }
        breadcrumbRef.current.style.right = '0px';
        if (!titleRef.current.classList.contains('--open')) {
            favoruitesRef.current.style.transition = 'opacity 0s ease-in-out';
            favoruitesRef.current.style.opacity = '1';
            if (favoruitesRef.current.classList.contains('hidden')) {
                favoruitesRef.current.classList.remove('hidden');
            }
            sizeRef.current.style.transition = 'opacity 0s ease-in-out';
            sizeRef.current.style.opacity = '1';
            if (sizeRef.current.classList.contains('hidden')) {
                sizeRef.current.classList.remove('hidden');
            }
            cartRef.current.style.transition = 'opacity 0s ease-in-out';
            cartRef.current.style.opacity = '1';
            if (cartRef.current.classList.contains('hidden')) {
                cartRef.current.classList.remove('hidden');
            }
            infoRef.current.style.transition = 'opacity 0s ease-in-out';
            infoRef.current.style.opacity = '1';
            if (infoRef.current.classList.contains('hidden')) {
                infoRef.current.classList.remove('hidden');
            }
            plusRef.current.style.transition = 'opacity 0s ease-in-out';
            plusRef.current.style.opacity = '1';
            if (plusRef.current.classList.contains('hidden')) {
                plusRef.current.classList.remove('hidden');
            }
            minusRef.current.style.transition = 'opacity 0s ease-in-out';
            minusRef.current.style.opacity = '1';
            if (minusRef.current.classList.contains('hidden')) {
                minusRef.current.classList.remove('hidden');
            }
            titleRef.current.style.opacity = '1';
            cartRef.current.style.opacity = '1';
            infoRef.current.style.opacity = '1';
            plusRef.current.style.opacity = '1';
            minusRef.current.style.opacity = '1';
            titleRef.current.classList.add('--open');
            titleRef.current.classList.remove('hidden');
        }
        var titleText = new split_text_js_1["default"](titleRef.current);
        // @ts-ignore
        gsap_1["default"].registerPlugin(MotionPathPlugin_1["default"]);
        // @ts-ignore
        titleText.chars.forEach(function (c, index) {
            gsap_1["default"].fromTo(c, { opacity: 0 }, {
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                force3D: true,
                motionPath: {
                    path: pathRef.current,
                    align: pathRef.current,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    start: 0,
                    end: index * 0.012
                }
            });
        });
        gsap_1["default"].fromTo(favoruitesRef.current, { opacity: 0 }, {
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            force3D: true,
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 0.95
            }
        });
        gsap_1["default"].fromTo(sizeRef.current, { opacity: 0 }, {
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            force3D: true,
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 0.90
            }
        });
        gsap_1["default"].fromTo(cartRef.current, { opacity: 0 }, {
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            force3D: true,
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 0.85
            }
        });
        gsap_1["default"].fromTo(infoRef.current, { opacity: 0 }, {
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            force3D: true,
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 0.80
            }
        });
        gsap_1["default"].fromTo(plusRef.current, { opacity: 0 }, {
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            force3D: true,
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 0.75
            }
        });
        gsap_1["default"].fromTo(minusRef.current, { opacity: 0 }, {
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            force3D: true,
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 0.70
            }
        });
    };
    var handleAnimationInit = function () {
        if (titleRef.current) {
            titleRef.current.style.opacity = '0';
        }
        if (favoruitesRef.current) {
            favoruitesRef.current.style.transition = 'opacity 1s ease-in-out';
            favoruitesRef.current.style.opacity = '0';
            setTimeout(function () {
                var _a, _b, _c, _d;
                if (!((_b = (_a = favoruitesRef === null || favoruitesRef === void 0 ? void 0 : favoruitesRef.current) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('hidden'))) {
                    (_d = (_c = favoruitesRef === null || favoruitesRef === void 0 ? void 0 : favoruitesRef.current) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add('hidden');
                }
            }, 1000);
        }
        if (sizeRef.current) {
            sizeRef.current.style.transition = 'opacity 1s ease-in-out';
            sizeRef.current.style.opacity = '0';
            setTimeout(function () {
                var _a, _b, _c, _d;
                if (!((_b = (_a = sizeRef === null || sizeRef === void 0 ? void 0 : sizeRef.current) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('hidden'))) {
                    (_d = (_c = sizeRef === null || sizeRef === void 0 ? void 0 : sizeRef.current) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add('hidden');
                }
            }, 1000);
        }
        if (cartRef.current) {
            cartRef.current.style.transition = 'opacity 1s ease-in-out';
            cartRef.current.style.opacity = '0';
            setTimeout(function () {
                var _a, _b, _c, _d;
                if (!((_b = (_a = cartRef === null || cartRef === void 0 ? void 0 : cartRef.current) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('hidden'))) {
                    (_d = (_c = cartRef === null || cartRef === void 0 ? void 0 : cartRef.current) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add('hidden');
                }
            }, 1000);
        }
        if (infoRef.current) {
            infoRef.current.style.transition = 'opacity 1s ease-in-out';
            infoRef.current.style.opacity = '0';
            setTimeout(function () {
                var _a, _b, _c, _d;
                if (!((_b = (_a = infoRef === null || infoRef === void 0 ? void 0 : infoRef.current) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('hidden'))) {
                    (_d = (_c = infoRef === null || infoRef === void 0 ? void 0 : infoRef.current) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add('hidden');
                }
            }, 1000);
        }
        if (plusRef.current) {
            plusRef.current.style.transition = 'opacity 1s ease-in-out';
            plusRef.current.style.opacity = '0';
            setTimeout(function () {
                var _a, _b, _c, _d;
                if (!((_b = (_a = plusRef === null || plusRef === void 0 ? void 0 : plusRef.current) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('hidden'))) {
                    (_d = (_c = plusRef === null || plusRef === void 0 ? void 0 : plusRef.current) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add('hidden');
                }
            }, 1000);
        }
        if (minusRef.current) {
            minusRef.current.style.transition = 'opacity 1s ease-in-out';
            minusRef.current.style.opacity = '0';
            setTimeout(function () {
                var _a, _b, _c, _d;
                if (!((_b = (_a = minusRef === null || minusRef === void 0 ? void 0 : minusRef.current) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('hidden'))) {
                    (_d = (_c = minusRef === null || minusRef === void 0 ? void 0 : minusRef.current) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add('hidden');
                }
            }, 1000);
        }
    };
    var handleText = function () {
        gsap_1["default"].registerPlugin(MotionPathPlugin_1["default"]);
        if (typeof window !== 'undefined') {
            if (typeof document !== 'undefined') {
                titleRef.current.style.transition = 'opacity 0s ease-in-out';
                titleRef.current.style.opacity = '0';
                var title_1 = document.querySelector("#title-id-" + sync_product.id);
                setTimeout(function () {
                    titleRef.current.style.transition = 'opacity 1s ease-in-out';
                    titleRef.current.style.opacity = '1';
                    var titleText = new split_text_js_1["default"](title_1);
                    // @ts-ignore
                    titleText.chars.forEach(function (c, index) {
                        gsap_1["default"].fromTo(c, { opacity: 0 }, {
                            opacity: 1,
                            stagger: 0.2,
                            duration: 1,
                            motionPath: {
                                path: pathRef.current,
                                align: pathRef.current,
                                alignOrigin: [0.5, 0.5],
                                autoRotate: true,
                                start: 0,
                                end: index * 0.012
                            }
                        });
                    });
                }, 10);
            }
        }
    };
    var handleSize = function () {
        var len = (sync_variants === null || sync_variants === void 0 ? void 0 : sync_variants.length) - 1;
        if (variantIndex < len) {
            // @ts-ignore
            setVariantIndex(variantIndex + 1);
        }
        else {
            // @ts-ignore
            setVariantIndex(0);
        }
    };
    react_1.useEffect(function () {
        handleAnimationInit();
    }, [sync_product, sync_variants]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, sync_product && (sync_variants === null || sync_variants === void 0 ? void 0 : sync_variants.length) > 0
        ? react_1["default"].createElement("div", { onMouseLeave: function (e) { return handleAnimationOut(e); }, ref: productRef, className: 'product cursor-pointer my-12 mx-[50px] h-max relative top-0 left-0 z-40 ' },
            react_1["default"].createElement("svg", { className: 'absolute opacity-0 -top-[15%] -left-[10%] md:-left-[12.5%]', width: 600, height: 600 },
                react_1["default"].createElement("path", { ref: pathRef, d: "M0,140a135,135 0 1,0 270,0a135,135 0 1,0 -270,0", fill: "none", stroke: "black", strokeWidth: 2 })),
            react_1["default"].createElement("svg", { className: 'absolute opacity-0 -top-[15%] -left-[10%] md:-left-[12.5%]', width: 600, height: 600 },
                react_1["default"].createElement("path", { ref: pathRefIcons, d: "M-30,130a150,150 0 1,0 340,0a150,150 0 1,0 -340,0", fill: "none", stroke: "black", strokeWidth: 2 })),
            react_1["default"].createElement("h3", { ref: titleRef, id: "title-id-" + (id ? id : sync_product === null || sync_product === void 0 ? void 0 : sync_product.id), className: "product-title hidden text-neutral-900 text-xl font-bold absolute top-0 left-0" }, (_b = sync_variants[variantIndex]) === null || _b === void 0 ? void 0 : _b.name),
            react_1["default"].createElement("div", { onClick: function () {
                    if (!isFavoruite) {
                        if (user) {
                            shopActions.addFavoruite(sync_product === null || sync_product === void 0 ? void 0 : sync_product.id, variantIndex);
                        }
                        else {
                            router.push('/login');
                        }
                    }
                    else {
                        if (user) {
                            shopActions.removeFavoruite(sync_product === null || sync_product === void 0 ? void 0 : sync_product.id);
                        }
                        else {
                            router.push('/login');
                        }
                    }
                }, ref: favoruitesRef, className: "product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center" }, isFavoruite
                ? react_1["default"].createElement(image_1["default"], { src: "/assets/heart-solid.svg", alt: "icon-cart", width: 25, height: 25 })
                : react_1["default"].createElement(image_1["default"], { src: "/assets/heart-circle-plus-solid.svg", alt: "icon-cart", width: 25, height: 25 })),
            react_1["default"].createElement("div", { onClick: function () {
                    handleSize();
                    handleText();
                }, ref: sizeRef, className: "product-icon-wrapper absolute top-0 left-0 hover:bg-gray-400 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center" },
                react_1["default"].createElement(image_1["default"], { src: "/assets/size.svg", alt: "icon-info", width: 25, height: 25 })),
            react_1["default"].createElement("div", { onClick: function () {
                    var _a, _b, _c, _d, _e, _f;
                    if (!inCart) {
                        if (user) {
                            shopActions.addToCart(sync_product === null || sync_product === void 0 ? void 0 : sync_product.id, (_a = sync_variants[variantIndex]) === null || _a === void 0 ? void 0 : _a.id, (_b = sync_variants[variantIndex]) === null || _b === void 0 ? void 0 : _b.variant_id, (_c = sync_variants[variantIndex]) === null || _c === void 0 ? void 0 : _c.warehouse_product_variant_id, (_d = sync_variants[variantIndex]) === null || _d === void 0 ? void 0 : _d.external_id, 1, (_e = sync_variants[variantIndex]) === null || _e === void 0 ? void 0 : _e.retail_price, (_f = sync_variants[variantIndex]) === null || _f === void 0 ? void 0 : _f.currency, variantIndex);
                            // @ts-ignore
                            setQuantity(1);
                        }
                        else {
                            router.push('/login');
                        }
                    }
                }, ref: cartRef, className: "product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center" },
                react_1["default"].createElement(image_1["default"], { src: "/assets/cart-icon.png", alt: "icon-cart", width: 25, height: 25 })),
            react_1["default"].createElement(link_1["default"], { ref: infoRef, className: 'absolute top-0 left-0 w-10 h-10', href: "/details/[id]", as: "/details/" + (id ? id : sync_product === null || sync_product === void 0 ? void 0 : sync_product.id) },
                react_1["default"].createElement("div", { className: "product-icon-wrapper hover:bg-gray-400 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center" },
                    react_1["default"].createElement(image_1["default"], { src: "/assets/info-icon.png", alt: "icon-info", width: 25, height: 25 }))),
            react_1["default"].createElement("div", { onClick: function () {
                    var _a, _b, _c, _d, _e, _f;
                    if (!inCart) {
                        if (user) {
                            shopActions.addToCart(sync_product === null || sync_product === void 0 ? void 0 : sync_product.id, (_a = sync_variants[variantIndex]) === null || _a === void 0 ? void 0 : _a.id, (_b = sync_variants[variantIndex]) === null || _b === void 0 ? void 0 : _b.variant_id, (_c = sync_variants[variantIndex]) === null || _c === void 0 ? void 0 : _c.warehouse_product_variant_id, (_d = sync_variants[variantIndex]) === null || _d === void 0 ? void 0 : _d.external_id, 1, (_e = sync_variants[variantIndex]) === null || _e === void 0 ? void 0 : _e.retail_price, (_f = sync_variants[variantIndex]) === null || _f === void 0 ? void 0 : _f.currency, variantIndex);
                            // @ts-ignore
                            setQuantity(1);
                        }
                        else {
                            router.push('/login');
                        }
                    }
                    else {
                        if (user) {
                            shopActions.summary();
                            shopActions.increment(sync_product === null || sync_product === void 0 ? void 0 : sync_product.id, 1);
                            // @ts-ignore
                            setQuantity(quantity + 1);
                        }
                        else {
                            router.push('/login');
                        }
                    }
                }, ref: plusRef, className: "product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center" },
                react_1["default"].createElement(image_1["default"], { src: "/assets/plus-icon.png", alt: "icon-plus", width: 25, height: 25 })),
            react_1["default"].createElement("div", { onClick: function () {
                    if (inCart && quantity < 1) {
                        if (user) {
                            shopActions.removeFromCart(sync_product === null || sync_product === void 0 ? void 0 : sync_product.id);
                            // @ts-ignore
                            setQuantity(0);
                        }
                        else {
                            router.push('/login');
                        }
                    }
                    else if (inCart && quantity >= 1) {
                        if (user) {
                            shopActions.summary();
                            shopActions.decrement(sync_product === null || sync_product === void 0 ? void 0 : sync_product.id, 1);
                            // @ts-ignore
                            setQuantity(quantity - 1);
                        }
                        else {
                            router.push('/login');
                        }
                    }
                }, ref: minusRef, className: "product-icon-wrapper hover:bg-gray-400 absolute top-0 left-0 bg-gray-300 w-10 h-10 p-2 rounded-full flex justify-center items-center" },
                react_1["default"].createElement(image_1["default"], { src: "/assets/minus-icon.png", alt: "icon-minus", width: 25, height: 25 })),
            react_1["default"].createElement("div", { onMouseEnter: function (e) { return handleAnimationIn(e); }, className: 'product-image z-50 relative top-0 left-0 bg-gray-300 rounded-full w-[220px] h-[220px] overflow-hidden' },
                react_1["default"].createElement("div", { ref: breadcrumbRef, className: "product-breadcrumb pointer-events-none absolute z-50 top-1/2 -translate-y-1/2 -right-56 w-[220px] px-8 py-3 bg-green-300 text-white font-bold rounded-l-md" },
                    react_1["default"].createElement("p", { className: "text-center" }, (_c = sync_variants[variantIndex]) === null || _c === void 0 ? void 0 :
                        _c.retail_price, (_d = sync_variants[variantIndex]) === null || _d === void 0 ? void 0 :
                        _d.currency),
                    react_1["default"].createElement("p", { className: "text-center" },
                        react_1["default"].createElement("span", { className: 'italic' }, ((_f = (_e = variant === null || variant === void 0 ? void 0 : variant.result) === null || _e === void 0 ? void 0 : _e.variant) === null || _f === void 0 ? void 0 : _f.in_stock) ? 'In Stock' : 'Out Of Stock'),
                        " / ",
                        react_1["default"].createElement("span", { className: "italic" },
                            "In Cart ",
                            quantity))),
                (sync_product === null || sync_product === void 0 ? void 0 : sync_product.thumbnail_url) && react_1["default"].createElement(image_1["default"], { className: 'rounded-full relative top-0 left-0 z-20', src: sync_product === null || sync_product === void 0 ? void 0 : sync_product.thumbnail_url, alt: 'product-image', width: 500, height: 500 })))
        : react_1["default"].createElement("h1", { className: 'bg-green-300 w-[25%] rounded-md mx-auto font-bold text-white text-5xl px-3 py-2 my-2' }, "...Loading")));
};
exports["default"] = Product;
