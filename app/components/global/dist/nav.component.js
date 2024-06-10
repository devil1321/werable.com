'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var gsap_1 = require("gsap");
var react_redux_1 = require("react-redux");
var ApiActions = require("@/app/controller/action-creators/api.action-creators");
var redux_1 = require("redux");
var navigation_1 = require("next/navigation");
var Nav = function () {
    var _a, _b, _c;
    var router = navigation_1.useRouter();
    var _d = react_1.useState('EN'), locale = _d[0], setLocale = _d[1];
    var _e = react_1.useState(false), isLanguageMenu = _e[0], setIsLanguageMenu = _e[1];
    var _f = react_redux_1.useSelector(function (state) { return state.api; }), countries = _f.countries, user = _f.user, language = _f.locale;
    var _g = react_1.useState(false), isPlaying = _g[0], setIsPlaying = _g[1];
    var menuWrapperRef = react_1.useRef();
    var overlayRef = react_1.useRef();
    var imageRef = react_1.useRef();
    var dispatch = react_redux_1.useDispatch();
    var APIActions = redux_1.bindActionCreators(ApiActions, dispatch);
    var handleMenuInit = function () {
        if (typeof window !== 'undefined') {
            var makeVisible = function () {
                var links = document.querySelectorAll('.nav a');
                if (window.innerWidth < 768) {
                    if (menuWrapperRef.current) {
                        menuWrapperRef.current.style.maxHeight = '0px';
                    }
                    if (overlayRef.current) {
                        overlayRef.current.style.display = 'none';
                    }
                    if (imageRef.current) {
                        imageRef.current.style.display = 'none';
                    }
                    links.forEach(function (l) {
                        l.style.opacity = '0';
                        l.style.top = '50px';
                    });
                }
                else {
                    if (menuWrapperRef.current) {
                        menuWrapperRef.current.style.maxHeight = 'fit-content';
                    }
                    if (overlayRef.current) {
                        overlayRef.current.style.display = 'none';
                    }
                    if (imageRef.current) {
                        imageRef.current.style.display = 'block';
                    }
                    links.forEach(function (l) {
                        l.style.opacity = '1';
                        l.style.top = '0px';
                    });
                }
            };
            makeVisible();
            window.addEventListener('resize', makeVisible);
        }
    };
    var handleMenu = function () {
        if (!menuWrapperRef.current.classList.contains('--open')) {
            menuWrapperRef.current.classList.add('--open');
            overlayRef.current.style.display = 'block';
            if (!isPlaying) {
                setIsPlaying(true);
                gsap_1["default"].fromTo('.nav-hamburger span:first-of-type', { rotate: '0deg' }, { rotate: '45deg', duration: 0.7, transformOrigin: '5px 2px' });
                gsap_1["default"].fromTo('.nav-hamburger span:nth-of-type(2)', { opacity: 1 }, { opacity: 0, duration: 0.5 });
                gsap_1["default"].fromTo('.nav-hamburger span:last-of-type', { rotate: '0deg' }, { rotate: '-45deg', duration: 0.7, transformOrigin: '5px 2px' });
                gsap_1["default"].fromTo('.nav-menus-wrapper', { maxHeight: '0px' }, { maxHeight: '460px', duration: 1 });
                gsap_1["default"].fromTo('.nav-menus-wrapper', { paddingTop: '0px' }, { paddingTop: '50px', duration: 1 });
                gsap_1["default"].fromTo('.nav-menus-wrapper', { paddingBottom: '0px' }, { paddingBottom: '50px', duration: 1 });
                gsap_1["default"].fromTo('.nav a', { opacity: 0, top: 50 }, { opacity: 1, top: 0, stagger: 0.2, duration: 1, delay: 1, onComplete: function () { return setIsPlaying(false); } });
                gsap_1["default"].fromTo('.nav-overlay', { opacity: 0 }, { opacity: 1, duration: 1 });
            }
        }
        else {
            menuWrapperRef.current.classList.remove('--open');
            setTimeout(function () {
                overlayRef.current.style.display = 'none';
            }, 2000);
            if (!isPlaying) {
                gsap_1["default"].fromTo('.nav-hamburger span:first-of-type', { rotate: '45deg' }, { rotate: '0deg', duration: 0.7, transformOrigin: '5px 2px' });
                gsap_1["default"].fromTo('.nav-hamburger span:nth-of-type(2)', { opacity: 0 }, { opacity: 1, duration: 0.5 });
                gsap_1["default"].fromTo('.nav-hamburger span:last-of-type', { rotate: '-45deg' }, { rotate: '0deg', duration: 0.7, transformOrigin: '5px 2px' });
                gsap_1["default"].fromTo('.nav-menus-wrapper', { maxHeight: '460px' }, { maxHeight: '0px', duration: 1, delay: 1 });
                gsap_1["default"].fromTo('.nav-menus-wrapper', { paddingTop: '50px' }, { paddingTop: '0px', duration: 1, delay: 1 });
                gsap_1["default"].fromTo('.nav-menus-wrapper', { paddingBottom: '50px' }, { paddingBottom: '0px', duration: 1, delay: 1, onComplete: function () { return setIsPlaying(false); } });
                gsap_1["default"].fromTo('.nav a', { opacity: 1 }, { opacity: 0, stagger: 0.2, duration: 1 });
                gsap_1["default"].fromTo('.nav-overlay', { opacity: 1 }, { opacity: 0, delay: 1, duration: 1 });
            }
        }
    };
    react_1.useEffect(function () {
        APIActions.printfulGetCountries();
        setLocale(language);
    }, [language]);
    react_1.useEffect(function () {
        handleMenuInit();
    }, [menuWrapperRef.current]);
    return (react_1["default"].createElement("div", { className: 'nav absolute top-0 left-0 min-w-[100vw] min-h-[50px]' },
        react_1["default"].createElement("div", { ref: overlayRef, className: "nav-overlay z-10 opacity-0 absolute top-0 left-0 w-[100%] h-[100vh]" }),
        react_1["default"].createElement("div", { className: "nav-navigation relative top-0 left-0 z-50" },
            react_1["default"].createElement("div", { onClick: function () { return handleMenu(); }, className: 'nav-hamburger absolute z-10 right-5 top-[10px] md:hidden' },
                react_1["default"].createElement("span", { className: "block w-8 my-1 rounded-full border-b-[4px] border-white" }),
                react_1["default"].createElement("span", { className: "block w-8 my-1 rounded-full border-b-[4px] border-white" }),
                react_1["default"].createElement("span", { className: "block w-8 my-1 rounded-full border-b-[4px] border-white" })),
            react_1["default"].createElement(image_1["default"], { ref: imageRef, className: 'nav-image opacity-70', src: "/assets/nav-bg.png", alt: 'nav-background', width: 1920, height: 400 }),
            react_1["default"].createElement("div", { ref: menuWrapperRef, className: "nav-menus-wrapper z-50 overflow-hidden md:overflow-visible absolute w-[100%] md:w-fit md:max-w-[100vw] bg-neutral-900/70 md:bg-transparent h-[460px] md:h-max rounded-md top-[150px] md:top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col md:flex-row justify-between items-center" },
                react_1["default"].createElement("div", { className: "nav-menu pt-10 md:p-0 relative z-30 -left-[0%] md:-left-[3%] lg:-left-[15%] xl:-left-[20%] -top-4 w-1/3 block md:flex gap-5" },
                    react_1["default"].createElement("div", { className: "nav-language relative top-0 left-0" },
                        react_1["default"].createElement("p", { className: 'text-red-500 cursor-pointer min-w-max translate-y-2 text-center md:text-left', onClick: function () { return setIsLanguageMenu(!isLanguageMenu); } }, locale),
                        isLanguageMenu &&
                            react_1["default"].createElement("div", { className: "nav-language-menu h-[400px] overflow-y-scroll  bg-white p-3 rounded-md text-black absolute top-10 left-1/2 -translate-x-1/2" }, (_a = countries === null || countries === void 0 ? void 0 : countries.result) === null || _a === void 0 ? void 0 : _a.map(function (c) { return react_1["default"].createElement("p", { className: 'p-2 rounded-md hover:bg-gray-200 w-[200px] cursor-pointer', onClick: function () {
                                    setLocale(c.code);
                                    setIsLanguageMenu(false);
                                    APIActions.printfulSetLocale(c.code);
                                } }, c.name); }))),
                    react_1["default"].createElement(link_1["default"], { className: "relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/" }, "Home"),
                    react_1["default"].createElement(link_1["default"], { className: "relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/products" }, "Products"),
                    react_1["default"].createElement(link_1["default"], { className: "relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/about" }, "About Us"),
                    user && react_1["default"].createElement(link_1["default"], { className: "relative my-2 md:my-0 text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/profile" }, "Profile")),
                react_1["default"].createElement("div", { className: "nav-logo-wrapper relative -left-[0%] -top-[10%] w-1/3 md:flex gap-3 items-center" },
                    react_1["default"].createElement(link_1["default"], { className: 'flex justify-center items-center min-w-max mx-auto', href: "/home" },
                        react_1["default"].createElement("div", { className: "nav-logo mr-2 min-w-[40px] md:min-w-[0px] md:w-[30px] lg:w-[50px] xl:w-[70px]" },
                            react_1["default"].createElement(image_1["default"], { src: "/assets/logo-white.svg", alt: 'nav-background', width: 70, height: 50 })),
                        react_1["default"].createElement("h2", { className: "md:text-2xl xl:text-4xl font-bold text-white" }, "Wearable"))),
                react_1["default"].createElement("div", { className: "nav-menu pb-5 md:p-0 relative z-30 -left-[0%] md:-left-[8%] lg:left-[5%] xl:left-[10%] -top-4 w-1/3 block md:flex gap-5" },
                    react_1["default"].createElement(link_1["default"], { className: "relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/new-sale" }, "New Sale"),
                    react_1["default"].createElement(link_1["default"], { href: "/cart", className: "cursor-pointer relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2" }, "Cart"),
                    react_1["default"].createElement(link_1["default"], { className: "relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/favoruites" }, "Favoruites"),
                    react_1["default"].createElement(link_1["default"], { className: "relative my-2 md:my-0 text-md md:text-sm block text-center md:inline-block z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/contact" }, "Contact"),
                    user
                        ? react_1["default"].createElement(link_1["default"], { onClick: function () { return APIActions.logout(); }, className: "relative text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "#" }, "Logout")
                        : react_1["default"].createElement(link_1["default"], { onClick: function () { return APIActions.logout(); }, className: "relative text-md md:text-sm  block md:inline-block text-center z-50 top-0 left-0 hover:underline text-white translate-y-2", href: "/login" }, "Login"),
                    ((_c = (_b = menuWrapperRef === null || menuWrapperRef === void 0 ? void 0 : menuWrapperRef.current) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.contains('--open')) && react_1["default"].createElement("button", { onClick: function () { return handleMenu(); }, className: 'block my-4 -translate-x-[5%] text-md text-white rounded-md font-bold px-12 py-2' }, "Close"))))));
};
exports["default"] = Nav;
