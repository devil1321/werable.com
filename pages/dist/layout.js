"use strict";
exports.__esModule = true;
var foot_component_1 = require("@/app/components/global/foot.component");
var footer_component_1 = require("@/app/components/global/footer.component");
var nav_component_1 = require("@/app/components/global/nav.component");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var ApiActions = require("@/app/controller/action-creators/api.action-creators");
var ShopActions = require("@/app/controller/action-creators/shop.action-creators");
var redux_1 = require("redux");
var Layout = function (_a) {
    var children = _a.children;
    var _b = react_redux_1.useSelector(function (state) { return state.api; }), user = _b.user, locale = _b.locale;
    var dispatch = react_redux_1.useDispatch();
    var APIActions = redux_1.bindActionCreators(ApiActions, dispatch);
    var shopActions = redux_1.bindActionCreators(ShopActions, dispatch);
    react_1.useEffect(function () {
        var _a;
        if (typeof window !== 'undefined') {
            var products = localStorage.getItem('wearable-products');
            if (products) {
                var items = JSON.parse(products);
                if ((_a = items[0]) === null || _a === void 0 ? void 0 : _a.sync_product) {
                    APIActions.printfulSetAllSyncProducts(JSON.parse(items));
                }
            }
        }
    }, []);
    react_1.useEffect(function () {
        if (typeof window !== 'undefined') {
            var token = localStorage.getItem('jwt');
            var language = localStorage.getItem('wearable-locale');
            if (language) {
                APIActions.printfulSetLocale(language);
            }
            if (token) {
                APIActions.getUser();
                APIActions.printfulGetAllSyncProducts(0, 100);
                APIActions.printfulGetCategories();
            }
        }
    }, [locale]);
    react_1.useEffect(function () {
        shopActions.setCart();
    }, [user]);
    return (react_1["default"].createElement("div", { className: 'container w-[100vw] mx-auto' },
        react_1["default"].createElement(nav_component_1["default"], null),
        children,
        react_1["default"].createElement(foot_component_1["default"], null),
        react_1["default"].createElement(footer_component_1["default"], null)));
};
exports["default"] = Layout;
