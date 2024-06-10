"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var useProduct = function (product) {
    var products = react_redux_1.useSelector(function (state) { return state.api; }).products;
    var _a = react_1.useState(null), sync_product = _a[0], setSyncProduct = _a[1];
    var _b = react_1.useState([]), sync_variants = _b[0], setSyncVariants = _b[1];
    var handleProduct = function () {
        var _a;
        if ((product === null || product === void 0 ? void 0 : product.sync_product) && ((_a = product === null || product === void 0 ? void 0 : product.sync_variants) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setSyncProduct(product.sync_product);
            setSyncVariants(product.sync_variants);
        }
        else {
            var item = products === null || products === void 0 ? void 0 : products.find(function (p) { var _a; return ((_a = p === null || p === void 0 ? void 0 : p.sync_product) === null || _a === void 0 ? void 0 : _a.id) === (product === null || product === void 0 ? void 0 : product.id); });
            if (item) {
                setSyncProduct(item.sync_product);
                setSyncVariants(item.sync_variants);
            }
        }
    };
    react_1.useEffect(function () {
        if (!sync_product && (sync_variants === null || sync_variants === void 0 ? void 0 : sync_variants.length) === 0) {
            handleProduct();
        }
    }, [product, products]);
    return { sync_product: sync_product, sync_variants: sync_variants };
};
exports["default"] = useProduct;
