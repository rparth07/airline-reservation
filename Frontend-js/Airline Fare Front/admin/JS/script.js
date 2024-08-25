"use strict";
$(function () {
    $(".dropdown").on("click", function () {
        $(this).find(".dropdown-menu").slideToggle("fast");
    });
    $(".navbar-toggler").on("click", function () {
        $("#navbarSupportedContent").slideToggle("fast");
    });
    $(".sidebar-toggle").on("click", function () {
        $(".sidebar").toggleClass("sidebar-mini");
        $(".main-content .move").toggleClass("on-resize");
    });
    $(window).resize(function () {
        resizePlugins();
    });
    //Fire it when the page first loads:
    resizePlugins();
});
$(document).on("click", function (event) {
    let trigger = $(".dropdown");
    if (!trigger.has(event.target).length) {
        $(".dropdown-menu").slideUp("fast");
    }
});
function resizePlugins() {
    const sidebar = $(".sidebar-default");
    if (window.innerWidth < 1025) {
        if (sidebar !== null) {
            if (!sidebar.hasClass("sidebar-mini")) {
                sidebar.addClass("sidebar-mini on-resize");
                $(".main-content .move").addClass("on-resize");
            }
        }
    }
    else {
        if (sidebar !== null) {
            if (sidebar.hasClass("sidebar-mini") && sidebar.hasClass("on-resize")) {
                sidebar.removeClass("sidebar-mini on-resize");
                $(".main-content .move").removeClass("on-resize");
            }
        }
    }
}
