"use strict";
exports.__esModule = true;
var react_1 = require("react");
var product_component_1 = require("../global/product.component");
var react_redux_1 = require("react-redux");
var ProductCarousel = function () {
    var products = react_redux_1.useSelector(function (state) { return state.api; }).products;
    var _a = react_1.useState(0), count = _a[0], setCount = _a[1];
    var viewRef = react_1.useRef();
    var itemRef = react_1.useRef();
    var prevRef = react_1.useRef();
    var nextRef = react_1.useRef();
    var handleSetControls = function () {
        var pathPrev = prevRef.current.querySelector('path');
        var pathNext = nextRef.current.querySelector('path');
        var lengthPrev = pathPrev.getTotalLength();
        var lengthNext = pathNext.getTotalLength();
        pathPrev.style.strokeDasharray = lengthPrev + 'px';
        pathPrev.style.strokeDashoffset = lengthPrev + 'px';
        pathNext.style.strokeDasharray = lengthNext + 'px';
        pathNext.style.strokeDashoffset = lengthNext + 'px';
    };
    var handleControl = function (ref) {
        var path = ref.current.querySelector('path');
        var length = path.getTotalLength();
        // path.style.strokeDasharray = 0 + 'px'
        if (!path.classList.contains('--in')) {
            path.classList.add('--in');
            path.style.strokeDashoffset = 0 + 'px';
        }
        else {
            path.classList.remove('--in');
            path.style.strokeDashoffset = length + 'px';
        }
    };
    var handleMove = function () {
        var _a;
        viewRef.current.style.transform = "translateX(-" + count * ((_a = itemRef === null || itemRef === void 0 ? void 0 : itemRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) + "px)";
    };
    var handlePrev = function () {
        if (typeof window !== 'undefined') {
            var productsItems = document.querySelectorAll('.product');
            if (count < 1) {
                setCount(productsItems.length - 6);
            }
            else {
                setCount(count - 1);
            }
        }
    };
    var handleNext = function () {
        if (typeof window !== 'undefined') {
            var productsItems = document.querySelectorAll('.product');
            if (count > productsItems.length - 6) {
                setCount(0);
            }
            else {
                setCount(count + 1);
            }
        }
    };
    react_1.useEffect(function () {
        handleSetControls();
    }, []);
    react_1.useEffect(function () {
        handleMove();
    }, [count]);
    return (react_1["default"].createElement("div", { className: 'home-product-carousel relative top-0 left-0' },
        react_1["default"].createElement("div", { onMouseEnter: function () { return handleControl(prevRef); }, onMouseLeave: function () { return handleControl(prevRef); }, className: "cursor-pointer transition-all home-carousel-prev absolute top-1/2 -translate-y-1/2 left-12 w-fit z-50 rounded-full bg-neutral-900 p-3", onClick: function () { return handlePrev(); } },
            react_1["default"].createElement("svg", { ref: prevRef, className: 'relative -left-1 top-0', width: "41", height: "42", viewBox: "0 0 41 42", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                react_1["default"].createElement("path", { d: "M30.6521 0.281265C31.9402 0.29029 33.214 0.502194 34.3997 0.904695C35.5854 1.30719 36.6595 1.89228 37.5596 2.62608C39.3926 4.11158 40.3904 6.07705 40.3676 8.15495C40.3448 10.2329 39.304 12.1793 37.4354 13.633L27.951 21.0113L37.2714 28.5674C39.1076 30.0529 40.1055 32.0184 40.0826 34.0963C40.0598 36.1742 39.019 38.1207 37.1505 39.5743C33.4167 42.4764 26.961 42.4189 23.2886 39.4426L0.227172 20.7531L23.6977 2.49697C24.613 1.77993 25.6991 1.21484 26.8929 0.834478C28.0867 0.454116 29.3645 0.266073 30.6521 0.281265ZM30.2531 36.5992C30.6827 36.6049 31.1093 36.5429 31.508 36.4169C31.9068 36.2908 32.2699 36.1032 32.5764 35.8648C32.8828 35.6264 33.1265 35.3419 33.2934 35.0279C33.4603 34.714 33.547 34.3766 33.5486 34.0355C33.5562 33.3428 33.2236 32.6885 32.6115 32.1925L18.7119 20.9253L32.8562 9.91924C33.4791 9.4347 33.826 8.78933 33.8336 8.0941C33.8412 7.39887 33.5086 6.74717 32.8965 6.25113C32.2802 5.77278 31.456 5.50107 30.5955 5.49257C29.735 5.48407 28.9045 5.73944 28.277 6.20551L9.46626 20.8392L27.9517 35.8176C28.2514 36.0623 28.6091 36.2575 29.0042 36.3917C29.3993 36.5258 29.8239 36.5964 30.2531 36.5992Z", strokeWidth: 3, stroke: 'gray' }))),
        react_1["default"].createElement("div", { onMouseEnter: function () { return handleControl(nextRef); }, onMouseLeave: function () { return handleControl(nextRef); }, className: "cursor-pointer transition-all home-carousel-next absolute top-1/2 -translate-y-1/2 right-12 w-fit z-50 rounded-full bg-neutral-900 p-3", onClick: function () { return handleNext(); } },
            react_1["default"].createElement("svg", { ref: nextRef, className: 'relative -right-1 top-0', width: "40", height: "42", viewBox: "0 0 40 42", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                react_1["default"].createElement("path", { d: "M9.80152 41.4337C8.51339 41.4367 7.23732 41.2366 6.04725 40.8452C4.85717 40.4538 3.77675 39.8787 2.86858 39.1534C1.01936 37.685 0 35.7289 0 33.6509C0 31.5729 1.01936 29.6168 2.87185 28.1459L12.2748 20.6796L2.87185 13.2107C1.01936 11.7423 0 9.78623 0 7.70822C0 5.63021 1.01936 3.67413 2.87185 2.20318C6.57355 -0.73353 13.0295 -0.736123 16.7345 2.20578L40 20.6796L16.7312 39.1534C15.8238 39.8789 14.744 40.4541 13.5545 40.8455C12.3649 41.237 11.0892 41.4369 9.80152 41.4337ZM9.80152 5.11395C9.37186 5.11223 8.94604 5.17816 8.54867 5.30793C8.1513 5.43769 7.79027 5.62872 7.48645 5.86996C7.18264 6.11121 6.94206 6.39788 6.77864 6.71341C6.61521 7.02893 6.53218 7.36706 6.53435 7.70822C6.53435 8.40089 6.87413 9.05205 7.49163 9.54237L21.5143 20.6796L7.49163 31.8168C6.87413 32.3071 6.53435 32.9556 6.53435 33.6509C6.53435 34.3462 6.87413 34.9947 7.49163 35.4851C8.11317 35.9576 8.94032 36.2217 9.80087 36.2221C10.6614 36.2226 11.489 35.9595 12.1114 35.4876L30.7604 20.6796L12.1114 5.87407C11.8091 5.63212 11.4492 5.44031 11.0526 5.30981C10.656 5.17932 10.2308 5.11274 9.80152 5.11395Z", strokeWidth: 3, stroke: 'gray' }))),
        react_1["default"].createElement("div", { className: "home-carousel-items-wrapper flex flex-col justify-center items-center relative z-40 top-0 left-0 h-[550px] w-[100vw] overflow-hidden" },
            react_1["default"].createElement("div", { ref: viewRef, className: "home-carousel-view flex justify-center items-center" }, products === null || products === void 0 ? void 0 : products.map(function (p) { var _a; return react_1["default"].createElement(product_component_1["default"], { key: "product-home-carousel-" + ((_a = p === null || p === void 0 ? void 0 : p.sync_product) === null || _a === void 0 ? void 0 : _a.id), productRef: itemRef, product: p }); })))));
};
exports["default"] = ProductCarousel;
