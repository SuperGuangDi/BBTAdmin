var num_of_list = 0;

$("button#search-confirm").click(function() {
  //搜索管理员输入的学号或者学级
  if ($("input#search-stuid").val() != "") {
    var option = 2; //取得该用户信息
    var stuid = $("input#search-stuid").val();
    $.ajax({
      type: "POST",
      url: "/bbt/api/scan",
      data: {
        option: option,
        stuid: stuid
      },
      dataType: "json",
      beforeSend: function() {
        $(".modal").show();
      },
      success: function(data) {
        $(".modal").hide();
		//16个一页
		console.log(data.userlist)
        if (data.state == 0) {
          $(".info-content").remove();
          $("ul#check-info-page-footer").html("");
          //记得清空页号列表
          var count = 0;
            count++;
            $("table#check-info-table").append(
              '<tr class="info-content"><td align="left">' +
                data.userlist[0]["stuid"] +
                '</td><td align="left">' +
                data.userlist[0]["name"] +
                '</td><td align="left">' +
                data.userlist[0]["gender"] +
                '</td><td align="left">' +
                data.userlist[0]["departid"] +
                '</td><td align="left">' +
                data.userlist[0]["position"] +
                '</td><td align="left"><button onclick="hack_confirm(' +
                data.userlist[0]["stuid"] +
                ');">修改</button></td></tr>'
            );
          
          $("ul#check-info-page-footer").append(
            '<input type="hidden" id="page_counter" value=' + 0 + ">"
          );
          for (var i = 0; i < Math.floor((count + 15) / 16); i++) {
            $("ul#check-info-page-footer").append(
              '<li><a onclick="page(' + i + ');">' + (i + 1) + "</a></li>"
            );
          }
          page(0);
        } else if (data.state == 121) {
          alert("学号不存在！");
        } else if (data.state == 199) {
          alert("请求错误！");
        } else if (data.state == 400) {
          alert("未知错误！");
        } else {
          alert(data);
        }
      },
      error: function(xhr, msg, exc) {
        alert("请求超时-" + msg);
      }
    });
  } else if ($("input#search-grade").val() != "") {
    var option = 1; //取得该届用户信息
    var period = $("input#search-grade").val();
    $.ajax({
      type: "POST",
      url: "/bbt/api/scan",
      data: {
        option: option,
        period: period
      },
      dataType: "json",
      beforeSend: function() {
        $(".modal").show();
      },
      success: function(data) {
        $(".modal").hide();
        //16个一页
        if (data.state == 0) {
          $(".info-content").remove();
          $("ul#check-info-page-footer").html("");
          //记得清空页号列表
          var count = 0;
          for (i in data.userlist) {
            count++;
            $("table#check-info-table").append(
              '<tr class="info-content"><td align="left">' +
                data.userlist[i]["stuid"] +
                '</td><td align="left">' +
                data.userlist[i]["name"] +
                '</td><td align="left">' +
                data.userlist[i]["gender"] +
                '</td><td align="left">' +
                data.userlist[i]["departid"] +
                '</td><td align="left">' +
                data.userlist[i]["position"] +
                '</td><td align="left"><button onclick="hack_confirm(\'' +
                data.userlist[i]["stuid"] +
                '\');">修改</button></td></tr>'
            );
          }
          $("ul#check-info-page-footer").append(
            '<input type="hidden" id="page_counter" value=' + 0 + ">"
          );
          for (var i = 0; i < Math.floor((count + 15) / 16); i++) {
            $("ul#check-info-page-footer").append(
              '<li><a onclick="page(' + i + ');">' + (i + 1) + "</a></li>"
            );
          }
          page(0);
        } else if (data.state == 121) {
          alert("学号不存在！");
        } else if (data.state == 199) {
          alert("请求错误！");
        } else if (data.state == 400) {
          alert("未知错误！");
        } else {
          alert(data);
        }
      },
      error: function(xhr, msg, exc) {
        alert("请求超时-" + msg);
      }
    });
  } else {
    var option = 0; //取得所有用户信息
    $.ajax({
      type: "POST",
      url: "/bbt/api/scan",
      data: {
        option: option
      },
      dataType: "json",
      beforeSend: function() {
        $(".modal").show();
      },
      success: function(data) {
        $(".modal").hide();
        //16个一页
        if (data.state == 0) {
          $(".info-content").remove();
          $("ul#check-info-page-footer").html("");
          //记得清空页号列表
		  var count = 0;
		  num_of_list = data.userlist.length;
          for (i in data.userlist) {
            count++;
            $("table#check-info-table").append(
              '<tr class="info-content"><td align="left">' +
                data.userlist[i]["stuid"] +
                '</td><td align="left">' +
                data.userlist[i]["name"] +
                '</td><td align="left">' +
                data.userlist[i]["gender"] +
                '</td><td align="left">' +
                data.userlist[i]["departid"] +
                '</td><td align="left">' +
                data.userlist[i]["position"] +
                '</td><td align="left"><button onclick="hack_confirm(\'' +
                data.userlist[i]["stuid"] +
                '\');">修改</button></td></tr>'
            );
          }
          $("ul#check-info-page-footer").append(
            '<input type="hidden" id="page_counter" value=' + 0 + ">"
          );
          for (var i = 0; i < Math.floor((count + 15) / 16); i++) {
            $("ul#check-info-page-footer").append(
              '<li><a onclick="page(' + i + ');">' + (i + 1) + "</a></li>"
            );
          }
          page(0);
        } else if (data.state == 121) {
          alert("学号不存在！");
        } else if (data.state == 199) {
          alert("请求错误！");
        } else if (data.state == 400) {
          alert("未知错误！");
        } else {
          alert(data);
        }
      },
      error: function(xhr, msg, exc) {
        alert("请求超时-" + msg);
      }
    });
  }
});

$("button#hack-confirm").click(function() {
  hack_confirm($("input#hack-stuid").val());
});
function hack_confirm(stuid) {
  //确定输入的学号，显示修改界面
  //var adminid = $("input#adminid").attr("value");
  var option = 2; //取得该用户信息
  var name = $("input#after-hack-name").val();
  var depart = $("input#after-hack-depart").val();
  var position = $("input#after-hack-position").val();
  var pwd = $("input#after-hack-password").val();
  $.ajax({
    type: "POST",
    url: "/bbt/api/scan",
    data: {
      option: option,
      stuid: stuid
    },
    dataType: "json",
    beforeSend: function() {
      $(".modal").show();
    },
    success: function(data) {
      $(".modal").hide();
      if (data.state == 0) {
        $("td#before-hack-stuid").html(data.userlist[0]["stuid"]);
        $("td#before-hack-name").html(data.userlist[0]["name"]);
        $("td#before-hack-gender").html(data.userlist[0]["gender"]);
        $("td#before-hack-depart").html(data.userlist[0]["departid"]);
        $("td#before-hack-position").html(data.userlist[0]["position"]);
      } else if (data.state == 121) {
        alert("学号不存在！");
      } else if (data.state == 199) {
        alert("请求错误！");
      } else if (data.state == 400) {
        alert("未知错误！");
      } else {
        alert(data);
      }
    },
    error: function(xhr, msg, exc) {
      alert("请求超时-" + msg);
    }
  });
  $(".left-fun").css("background-color", "#DEDEDE");
  $("a#hack-info").css("background-color", "white");
  $(".main-item").hide();
  $("div#hack-info-block").fadeIn();
  $("div#hack-container").hide();
  $("div#hack-main").fadeIn();
}

$("#submit-hack").click(function() {
  //var adminid = $("input#adminid").attr("value");
  var stuid = $("td#before-hack-stuid").text();
  var name = $("input#after-hack-name").val();
  var departid = $("input#after-hack-depart").val();
  var position = $("input#after-hack-position").val();
  var pwd = $("input#after-hack-password").val();
  $.ajax({
    type: "POST",
    url: "/bbt/api/revise",
    data: {
      stuid: stuid,
      pwd: pwd,
      name: name,
      departid: departid,
      position: position
    },
    dataType: "json",
    beforeSend: function() {
      $(".modal").show();
    },
    success: function(data) {
      $(".modal").hide();
      if (data.state == 0) {
        alert("修改成功");
      } else if (data.state == 103) {
        alert("格式错误！");
      } else if (data.state == 199) {
        alert("HTTP请求错误！");
      } else if (data.state == 400) {
        alert("未知错误！");
      } else {
        alert("未知错误");
        alert(data);
      }
    },
    error: function(xhr, msg, exc) {
      alert("请求超时-" + msg);
    }
  });
});

$(".left-fun").click(function() {
  if ($(this).attr("id") == "check-info") {
    var option = 0; //取得所有用户信息
    $.ajax({
      type: "POST",
      url: "/bbt/api/scan",
      data: {
        option: option
      },
      dataType: "json",
      beforeSend: function() {
        $(".modal").show();
      },
      success: function(data) {
        $(".modal").hide();
        //16个一页
        if (data.state == 0) {
          $(".info-content").remove();
          $("ul#check-info-page-footer").html("");
          //记得清空页号列表
          var count = 0;
          for (i in data.userlist) {
            count++;
            $("table#check-info-table").append(
              '<tr class="info-content"><td align="left">' +
                data.userlist[i]["stuid"] +
                '</td><td align="left">' +
                data.userlist[i]["name"] +
                '</td><td align="left">' +
                data.userlist[i]["gender"] +
                '</td><td align="left">' +
                data.userlist[i]["departid"] +
                '</td><td align="left">' +
                data.userlist[i]["position"] +
                '</td><td align="left"><button onclick="hack_confirm(\'' +
                data.userlist[i]["stuid"] +
                '\');">修改</button></td></tr>'
            );
          }
          $("ul#check-info-page-footer").append(
            '<input type="hidden" id="page_counter" value=' + 0 + ">"
          );
          for (var i = 0; i < Math.floor((count + 15) / 16); i++) {
            $("ul#check-info-page-footer").append(
              '<li><a onclick="page(' + i + ');">' + (i + 1) + "</a></li>"
            );
          }
          //page(0);
        } else if (data.state == 121) {
          alert("学号不存在！");
        } else if (data.state == 199) {
          alert("请求错误！");
        } else if (data.state == 400) {
          alert("未知错误！");
        } else {
          alert(data);
        }
      },
      error: function(xhr, msg, exc) {
        alert("请求超时-" + msg);
      }
    });
    $(".left-fun").css("background-color", "rgba(255,255,255,0)");
    $(this).css("background-color", "white");
    $(".main-item").hide();
    $("div#check-info-block").fadeIn();
  } else if ($(this).attr("id") == "batch-register") {
    $(".left-fun").css("background-color", "rgba(255,255,255,0)");
    $(this).css("background-color", "white");
    $(".main-item").hide();
    $("div#batch-register-block").fadeIn();
  } else if ($(this).attr("id") == "hack-info") {
    $(".left-fun").css("background-color", "rgba(255,255,255,0)");
    $(this).css("background-color", "white");
    $(".main-item").hide();
    $("div#hack-info-block").fadeIn();
    $("div#hack-main").hide();
    $("div#hack-container").fadeIn();
  } else if ($(this).attr("id") == "broadcast-block") {
    $(".left-fun").css("background-color", "rgba(255,255,255,0)");
    $(this).css("background-color", "white");
    $(".main-item").hide();
    $("div#broadcast-block").fadeIn();
  }
});

function page(num) {
   $(".info-content").each(function(){
        $(this).hide();
    });
    $("#check-info-page-footer").children('li').each(function(){
        $(this).css("background-color", "rgba(0,0,0,0.5)");
    });
    for (var i = 0; i < 16; i++) {
    if (typeof($(".info-content").eq(i+num*16))!="undefined") {
        //$(".event_ul li").get(i+num*10).style.display="list-item";
        //$(".footer li").get(num).style.backgroundColor="#ff6008";
        $(".info-content").eq(i+num*16).fadeIn();
        $("#check-info-page-footer").children('li').eq(num).css("background-color", "#ff6008");
    }
  }
  $("input#page_counter").val(num);
}

