"use strict";
exports.__esModule = true;
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/dist/ScrollTrigger");
var react_1 = require("react");
var search_component_1 = require("@/app/components/global/search.component");
var hero_component_1 = require("@/app/components/global/hero.component");
var summary_component_1 = require("@/app/components/cart/summary.component");
var item_component_1 = require("@/app/components/global/item.component");
var react_redux_1 = require("react-redux");
var layout_1 = require("../layout");
var router_1 = require("next/router");
function Page() {
    var router = router_1.useRouter();
    var cart = react_redux_1.useSelector(function (state) { return state.shop; }).cart;
    var user = react_redux_1.useSelector(function (state) { return state.api; }).user;
    var handleDetails = function () {
        var heading = document.querySelector('h1');
        var paragraph = document.querySelector('p');
        heading.style.color = 'red';
        paragraph.style.color = 'red';
    };
    var handleAnimate = function () {
        gsap_1["default"].registerPlugin(ScrollTrigger_1["default"]);
        gsap_1["default"].fromTo('.item', { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, scrollTrigger: {
                trigger: ".item",
                start: '-=300px',
                end: '-=300px'
            } });
    };
    react_1.useEffect(function () {
        handleDetails();
        handleAnimate();
    }, []);
    react_1.useEffect(function () {
        if (typeof window !== 'undefined') {
            var token = localStorage.getItem('jwt');
            if (!token) {
                router.push('/login');
            }
        }
    }, [user]);
    return (React.createElement(layout_1["default"], null,
        React.createElement("div", { className: "cart" },
            React.createElement(hero_component_1["default"], { img: "/assets/clothes.jpg", title: "Your Favorites Await", paragraph: "Explore our curated selection of top-rated products, handpicked to suit your style and needs" }),
            React.createElement(search_component_1["default"], { title: "Favoruites" }),
            React.createElement("div", { className: "cart-items" }, (cart === null || cart === void 0 ? void 0 : cart.length) > 0
                ? cart.map(function (p) { return React.createElement(item_component_1["default"], { key: "item-key-" + p.id, product: p }); })
                : React.createElement("button", { className: 'block rounded-md mx-auto my-12  p-12 italic font-bold text-white text-5xl' }, "Nothing In Cart")),
            React.createElement(summary_component_1["default"], null))));
}
exports["default"] = Page;
