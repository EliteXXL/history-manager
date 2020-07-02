var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "../../dist/module.amd/Router", "../../dist/module.amd/NavigationLock"], function (require, exports, Router, NavigationLock) {
// define(["require", "exports", "../../dist/bundle/history-manager"], function (require, exports, hm) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // console.log(hm);
    Router = __importStar(Router);
    NavigationLock = __importStar(NavigationLock);
    console.log(Router);
    Router.setContext({
        name: "home",
        paths: [
            { path: "home" }
        ],
        default: "home"
    });
    Router.setContext({
        name: "profile",
        paths: [
            { path: "me" },
            { path: "user/:id", fallback: true }
        ],
        default: "me"
    });
    Router.setContext({
        name: "search",
        paths: [
            { path: "search" }
        ],
        default: "search?recent"
    });
    document.querySelector("#restoreHome").addEventListener("click", function () {
        Router.restoreContext("home");
    });
    document.querySelector("#restoreProfile").addEventListener("click", function () {
        Router.restoreContext("profile");
    });
    document.querySelector("#restoreSearch").addEventListener("click", function () {
        Router.restoreContext("search");
    });
    Router.route("user/:id", function (location, keymap) {
        console.log("user:", keymap.get("id"));
    });
    Router.route("/(.*)*", function (location) {
        console.log("landed at", location.href);
    });
    Router.create().route("/:route*", function (_, keymap) {
        console.log("landed with", keymap);
    });
    document.querySelector("#lock").addEventListener("click", function () {
        NavigationLock.lock();
    });
    document.querySelector("#weakLock").addEventListener("click", function () {
        NavigationLock.lock().listen(function (e) { return e.preventDefault(); });
    });
    document.querySelector("#unlock").addEventListener("click", function () {
        NavigationLock.unlock();
    });
    document.querySelector("#locktest").addEventListener("click", function () {
        NavigationLock.lock();
        NavigationLock.unlock();
        Router.go("user/22");
        Router.go("user/123");
        Router.go("user/123");
    });
    document.querySelector("#gotest").addEventListener("click", function () {
        Router.go("user/123");
        Router.go("user/456");
        Router.go("user/789");
        Router.go(-3);
        Router.go(2);
    });
    document.querySelector("#goreplace").addEventListener("click", function () {
        Router.go("search?recent=test", { replace: true });
    });
    var page = 1;
    document.querySelector("#queryparam").addEventListener("click", function () {
        if (Router.location.pathname !== "queryparam") {
            Router.go("queryparam?filters[color]=blue,red");
        }
        Router.setQueryParam("page", ++page).then(function () {
            console.log(Router.location);
        });
    });
    document.querySelector("#replaceissamecontext").addEventListener("click", function () {
        Router.restoreContext("profile");
        Router.go("accedi", { replace: true }).then(function () {
            console.log(Router.getContext());
        });
    });
    Router.start("home");
});
