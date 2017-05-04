/**
 * Created by zhaowz on 2017/4/19.
 */

var today = new Date(),       //获取当前日期
    y = today.getFullYear(),     //获取日期中的年份
    m = today.getMonth(),      //获取日期中的月份(需要注意的是：月份是从0开始计算，获取的值比正常月份的值少1)
    d = today.getDate();     //获取日期中的日(方便在建立日期表格时高亮显示当天)
$("#showDate").html(y + "-" + Number(m + 1) + "-" + d);

var Calendar = function () {
    this.isLeap = function(year) {
        return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
    }

//判断当前年份是否是闰年(闰年2月份有29天，平年2月份只有28天)
    this.isLeap = function (year) {
        return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
    }

    this.rendCalendar= function (year, month, day,selectedDays) {
        var _today = new Date(),
            cur_y = _today.getFullYear(),
            cur_m = _today.getMonth();
        if(cur_y == year ){
            if(cur_m > month){
                $("#nextMonth").show()
            }else if(cur_m == month){
                $("#nextMonth").hide();
            }
        }else if(cur_y > year){
            $("#nextMonth").show()
        }

        var _calendarHTML = "";
        var i, k,
            today = new Date(),                 //获取当前日期
            y = year == null ? today.getFullYear() : year,              //获取日期中的年份
            m = month == null ? today.getMonth() : month,                //获取日期中的月份(需要注意的是：月份是从0开始计算，获取的值比正常月份的值少1)
            d = day == null ? today.getDate() : day,                //获取日期中的日(方便在建立日期表格时高亮显示当天)
            firstday = new Date(y, m, 1),            //获取当月的第一天
            dayOfWeek = firstday.getDay(),           //判断第一天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
            days_per_month = new Array(31, 28 + this.isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),         //创建月份数组
            str_nums = Math.ceil((dayOfWeek + days_per_month[m]) / 7),                        //确定日期表格所需的行数
            selectedDays = selectedDays==null ?[7, 8, 9] : selectedDays;                          //   签到日期
        _calendarHTML += '<table class="text-center" width="100%" cellpadding="0" cellspacing="0" border="0">'
            +'<colgroup>'
            +'<col width="15%" />'
            +'<col width="14%" />'
            +'<col width="14%" />'
            +'<col width="14%" />'
            +'<col width="14%" />'
            +'<col width="14%" />'
            +'<col width="15%" />'
            +'</colgroup>'
            +'<thead>'
            +'<tr>'
            +'<th>日</th>'
            +'<th>一</th>'
            +'<th>二</th>'
            +'<th>三</th>'
            +'<th>四</th>'
            +'<th>五</th>'
            +'<th>六</th>'
            +'</tr>'
            +'</thead> <tbody>'; //打印表格第一行(显示星期)
        for (i = 0; i < str_nums; i += 1) {         //二维数组创建日期表格
            _calendarHTML += '<tr>';
            for (k = 0; k < 7; k++) {
                var idx = 7 * i + k;                //为每个表格创建索引,从0开始
                var date = idx - dayOfWeek + 1;          //将当月的1号与星期进行匹配
                (date <= 0 || date > days_per_month[m]) ? date = ' ' : date = idx - dayOfWeek + 1;  //索引小于等于0或者大于月份最大值就用空表格代替
                if (selectedDays.indexOf(date) != -1) {
                    if (date != d) {
                        _calendarHTML += '<td class="active">' + date + '</td>'// 已经签到
                    } else if(date == d && cur_y==year && cur_m==month){
                        _calendarHTML += '<td class="active" style="background-color:#ccc; ">' + date + '</td>'      //签到，高亮显示当天
                    }else if(date == d && (cur_y!=year || cur_m!=month)){
                        _calendarHTML += '<td class="active">' + date + '</td>'      //签到，高亮显示当天
                    }
                } else {
                    if (date == d && cur_y==year && cur_m==month) {
                        _calendarHTML += '<td style="background-color:#ccc; ">' + date + '</td>'    //高亮显示当天
                    } else {
                        _calendarHTML += '<td>' + date + '</td>';
                    }
                }
            }
            _calendarHTML += '</tr>';
        }
        _calendarHTML += '</tbody></table>';
        $("#calendar").empty();
        $("#calendar").append(_calendarHTML);

        $("#showDate").html(y + "年" + Number(Number(m) + 1) + "月");
    }

    this.lastMonth= function(_y,_m,_d,arr) {
        if (m == 0) {    // 1月 前推一年
            _y = y - 1;
            _m = 11;
        } else {
            _y = y;
            _m = m - 1;
        }
        y = _y;
        m = _m;
        this.rendCalendar(_y, _m, null,arr);
        //$("#showDate").html(y + "-" + Number(m + 1) + "-" + d);
    }

    this.nextMonth= function (_y,_m,_d,arr) {
        //var _y, _m;
        if (m == 11) {    // 12月 后推一年
            _y = y + 1;
            _m = 0;
        } else {
            _y = y;
            _m = m + 1;
        }
        y = _y;
        m = _m;
        this.rendCalendar(_y, _m, null,arr);
    };
    this.init = function () {
        var _this = this;

        $("#lastMonth").on("click", function () {
            //var arr= $.get("url",y,m);    // 后台获取签到日
            var arr = [1,2,3,4];
            _this.lastMonth(y,m,d,arr);
        });
        $("#nextMonth").on("click", function () {
            //var arr= $.get("url");    // 后台获取签到日
            var arr = [11,12,13];
            _this.nextMonth(y,m,d,arr);
        })

        this.rendCalendar();
    }
};

