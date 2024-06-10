"use strict";
exports.__esModule = true;
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/dist/ScrollTrigger");
var react_1 = require("react");
var hero_component_1 = require("@/app/components/global/hero.component");
var search_component_1 = require("@/app/components/global/search.component");
var title_component_1 = require("@/app/components/global/title.component");
var product_carousel_1 = require("@/app/components/home/product-carousel");
var product_component_1 = require("@/app/components/global/product.component");
var layout_1 = require("../layout");
var react_redux_1 = require("react-redux");
var react_2 = require("react");
function Page() {
    var products = react_redux_1.useSelector(function (state) { return state.api; }).products;
    var handleAnimate = function () {
        gsap_1["default"].registerPlugin(ScrollTrigger_1["default"]);
        gsap_1["default"].fromTo('.products-items .product', { opacity: 0, y: 100 }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.products-items',
                start: '-=200px',
                end: '-=200px'
            }
        });
    };
    react_1.useEffect(function () {
        handleAnimate();
    }, []);
    return (react_2["default"].createElement(layout_1["default"], null,
        react_2["default"].createElement("div", { className: "products" },
            react_2["default"].createElement(hero_component_1["default"], { img: "/assets/about.jpg", title: "Explore Our Cutting-Edge Products", paragraph: "Discover a range of innovative products designed to enhance your lifestyle and redefine the way you interact with technology" }),
            react_2["default"].createElement(search_component_1["default"], { title: "Products" }),
            (products === null || products === void 0 ? void 0 : products.length) > 0 &&
                react_2["default"].createElement(react_2["default"].Fragment, null,
                    react_2["default"].createElement("div", { className: "products-items xl:px-10 flex justify-center items-start flex-wrap" }, products === null || products === void 0 ? void 0 : products.map(function (p) { var _a; return react_2["default"].createElement(product_component_1["default"], { key: "product-key-" + ((_a = p === null || p === void 0 ? void 0 : p.sync_product) === null || _a === void 0 ? void 0 : _a.id), product: p }); })),
                    react_2["default"].createElement(title_component_1["default"], { isLeft: false, title: "Hot" }),
                    react_2["default"].createElement(product_carousel_1["default"], null)))));
}
exports["default"] = Page;
