$(document).ready(function() {
    $("#div_negative").hide();
    do_reset_timer();
    $("#btn_change_to_positive").click(function() {
        $("#div_negative").fadeOut();
        $("#div_positive").fadeIn();
        $("#text_time").addClass("text-primary");
        $("#text_time").removeClass("text-danger");
        $("#div_progress_bar").addClass("progress-bar-info");
        $("#div_progress_bar").removeClass("progress-bar-danger");
    });
    $("#btn_change_to_negative").click(function() {
        $("#div_negative").fadeIn();
        $("#div_positive").fadeOut();
        $("#text_time").addClass("text-danger");
        $("#text_time").removeClass("text-primary");
        $("#div_progress_bar").removeClass("progress-bar-info");
        $("#div_progress_bar").addClass("progress-bar-danger");
    });
    $("#btn_reset_one_minute").click(function() {
        time_count = 0; time_allcount = 60;
        do_update_timer();
    });
    $("#btn_change_one_minute_half").click(function() {
        time_count = 0; time_allcount = 90;
        do_update_timer();
    });
    $("#btn_start_timer").click(function() {
        do_start_timer();
    });
    $("#btn_stop_timer").click(function() {
        do_stop_timer();
    });
});

var time_count = 0;
var time_allcount = 0;
var intervalObj;
function do_start_timer() {
    clearInterval(intervalObj);
    intervalObj = setInterval(do_count_timer, 1000);
    $("#div_progress_bar").addClass("active");
    $("#elsped_time").text(" 计时中");
}

function do_stop_timer() {
    clearInterval(intervalObj);
    $("#div_progress_bar").removeClass("active");
    $("#elsped_time").text("");
}

function do_count_timer() {
    time_count++;
    if(time_count >= time_allcount) {
        time_count = time_allcount;
        do_stop_timer();
    }
    do_update_timer();
}

function do_reset_timer() {
    time_count = 0;
    time_allcount = 0;
    do_update_timer();
}

function do_update_timer() {
    $("#div_progress_bar").css("width", get_timer_length(time_count, time_allcount));
    $("#text_time").text(get_timer_text(time_allcount - time_count));
}

function get_timer_text(timeleft) {
    return parseZero(parseInt(timeleft / 60), 2) + ":" + parseZero((timeleft % 60), 2);
}

function get_timer_length(timecount, timeall) {
    if(timeall == 0) return "0%";
    return ((timeall - timecount) / timeall) * 100 + "%"
}

function parseZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
