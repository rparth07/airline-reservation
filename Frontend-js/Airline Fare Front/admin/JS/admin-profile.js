"use strict";
$(function () {
    $("#changePassword").on("click", function () {
        $(".bg-model").css("display", "flex");
    });
    $("#cancel").on("click", function () {
        $(".bg-model").css("display", "none");
    });
});
