/// <reference path="jquery.min.js" />
/// <reference path="jServicePlugin.js" />

GetForderPath = function (level) {
    var forderPath = '';
    switch (level) {
        case 0:
            break;
        case 1:
            forderPath = '../';
            break;
        case 2:
            forderPath = '../../';
            break;
        case 3:
            forderPath = '../../../';
            break;
        case 4:
            forderPath = '../../../../';
            break;
        case 5:
            forderPath = '../../../../../';
            break;
    }
    return forderPath;
};

jQuery.fn.SetTableStyle = function (options) {
    var defaults = { evenClass: 'eventr', oddClass: 'oddtr', trover: 'trover' };
    var o = jQuery.extend(defaults, options);
    //jQuery(this).find('tbody tr:odd').addClass(o.oddClass);
    //jQuery(this).find('tbody tr:even').addClass(o.evenClass);
    jQuery(this).find('tbody tr').mouseover(function () { jQuery(this).addClass(o.trover) }).mouseout(function () { jQuery(this).removeClass(o.trover) });
    return this;
};


jQuery.fn.GetTransAssign = function () {
    $.AsyncService('../../Service/WS_Dms.asmx/QueryTrans', ['paramDocMasterSeq', '10'], function (msg) {
      $(this).text(msg.d);
    });
};

jQuery.fn.GetTransAssign = function (DOCMASTER_SEQ) {
    $dpet = $(this);
    $.AsyncService(
        '../../Service/WS_Dms.asmx/QueryTrans',
        ['paramDocMasterSeq', DOCMASTER_SEQ],
        function (msg) {
            if (msg.d == null) { $dpet.html(''); return false; }
            var taskHtml = "";
            var index = 1;
            $.each(msg.d, function (key, val) {
                taskHtml += "<span style='color: " + val.RECEIVER + "'>" +
                             "(" + index + ")" + val.DEPT_USER_NAME + "  </span>";
                index++;
            });
            $dpet.html(taskHtml);
        });
}

jQuery.fn.SetDatePicker = function (level) {
    $(this).datepicker({
        changeYear: true,
        changeMonth: true,
        inline: true,
        showOn: "button",
        buttonImage: GetForderPath(level) + "Scripts/jqueryUI/calendar.gif",
        buttonImageOnly: true,
        autoSize: true
    });
    return $(this);
};

jQuery.ShowMessage = function (msg) {
    $('<div id="dialogMessage" style="display: none"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span><b>' + msg + '</b></p></div>').appendTo('body');
    $("#dialogMessage").dialog({
        modal: true,
        title: "訊息",
        buttons: { "確定": function () { $('#dialogMessage').dialog("close") } },
        close: function (ev, ui) { $('#dialogMessage').remove() }
    })
};

jQuery.ShowConfirm = function (msg, Callback) {
    $('<div id="dialogConfirm" style="display: none"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span><b></b></p></div>').appendTo('body');
    $('#dialogConfirm p b').text(msg);
    $("#dialogConfirm").dialog({
        modal: true,
        title: "訊息",
        buttons: { "確定": function () {
            $(this).dialog("close"); Callback(); return true;
        },
            "取消": function () { $(this).dialog("close"); return false; }
        },
        close: function (ev, ui) { $(this).remove() }
    })
};

jQuery.SetReturnValue = function (options) {
    var defaults = { ID: 'rValue', Value: '' };
    var o = jQuery.extend(defaults, options);
    $parent = $(parent.document.body);
    if ($parent.find('#' + o.ID).length == 0) {
        $parent.append('<input id="' + o.ID + '" type="hidden" value="' + o.Value + '" />')
    } else {
        $parent.find('#' + o.ID).val(o.Value)
    }
};

jQuery.GetReturnValue = function (options) {
    var defaults = { ID: 'rValue' };
    var o = jQuery.extend(defaults, options);
    $parent = $(parent.document.body);
    return $parent.find('#' + o.ID).val()
};

jQuery.StartProgress = function () {
    $('#dialogProcess').remove();
    $('<div id="dialogProcess" style="display: none" title="訊息"><br /><div id="progressbar"></div><br /><span style="color: Red;">資料讀取中...</span></div>').appendTo('body');

    $("#dialogProcess").dialog({
        modal: true,
        height: 200,
        width: 400,
        close: function (ev, ui) {
            $('#dialogProcess').remove()
        }
    });

    $("#progressbar").progressbar({ value: 0 });
    var updateProgressBar = setInterval(function () {
        var value = $("#progressbar").progressbar("option", "value");
        if (value < 100) { $("#progressbar").progressbar({ value: value + 1 }) }
        else { clearTimeout(updateProgressBar); }
    }, 600);

};

jQuery.EndProgress = function () { $("#progressbar").progressbar({ value: 100 }); $('#dialogProcess').dialog('close') }

jQuery.fn.ConvertDate = function () {
    var value = $(this).val();
    if (value == '') return '';
    return value.substr(0, 4) + '/' +
           value.substr(4, 2) + '/' +
           value.substr(6, 2);
};

jQuery.SetReturnValue = function (options) {
    var defaults = { ID: 'rValue', Value: '' };
    var o = jQuery.extend(defaults, options);
    $parent = $(parent.document.body);
    if ($parent.find('#' + o.ID).length == 0) {
        $parent.append('<input id="' + o.ID + '" type="hidden" value="' + o.Value + '" />')
    }
    else {
        $parent.find('#' + o.ID).val(o.Value)
    }
};

jQuery.GetReturnValue = function (options) {
    var defaults = { ID: 'rValue' };
    var o = jQuery.extend(defaults, options);
    $parent = $(parent.document.body);
    return $parent.find('#' + o.ID).val()
};

jQuery.DialogShow = function (options) {

    var defaults = { id: '', src: '', title: '', height: 600, width: 500, iframeHigh: 410 };
    var o = jQuery.extend(defaults, options);

    if ($('#' + o.id).length == 0) {
        var html = '<div id="' + o.id + '" title="' + o.title + '" style="display: none;">' +
                   '<iframe frameborder="0" width="100%" height="' + o.iframeHigh + '" allowtransparency="true" ' +
                            'scrolling="no"></iframe></div>';
        $(html).appendTo('body');
    }

    $('#' + o.id).find('iframe').attr('src', o.src);

    $("#" + o.id).dialog({
        height: o.height,
        width: o.width
    });
    return false;
};

jQuery.fn.SetDataList = function (options) {

    var defaults = { JsonObject: null, Height: 0 };
    var o = jQuery.extend(defaults, options);

    if (o.JsonObject == null) { $(this).processTemplate([]); return false; }

    $(this).processTemplate(o.JsonObject);
    $(this).SetTableStyle(); //設定Table Style

    if (o.Height > 0) $(this).find('table').scrollbarTable(o.Height);
};

jQuery.fn.CheckData = function () {
    var $input = $(this).find('[ck]');
    var check = false;
    $.each($input, function () {

        switch ($(this).attr('ck')) {
            case "Empty":
                if ($.trim($(this).val()) == '') {
                    if (!$(this).hasClass('CheckError')) $(this).addClass('CheckError');
                    $.ShowMessage('紅色框必須輸入資料 !!');
                    check = true;
                    return false;
                }
                break;
            case "Number":
                if (!$.isNumeric($.trim($(this).val()))) {
                    if (!$(this).hasClass('CheckError')) $(this).addClass('CheckError');
                    $.ShowMessage('紅色框必須為數值 !!');
                    check = true;
                    return false;
                }
                break;
        }
        if ($(this).hasClass('CheckError')) $(this).removeClass('CheckError');
    });
    return check;
};

jQuery.fn.SetPagin = function (options) {
    var defaults = { count: 10, start: 1, display: 8, onChange: null };
    var o = jQuery.extend(defaults, options);
    if (o.count == 0) return false;
    $(this).paginate({
        count: parseInt(o.count),
        start: o.start,
        display: o.display,
        border: false,
        text_color: '#888',
        background_color: '#EEE',
        text_hover_color: 'black',
        background_hover_color: '#CFCFCF',
        onChange: o.onChange
    });
};

jQuery.fn.GetToday = function () {
    var fullDate = new Date();
    var month = (fullDate.getMonth() + 1);
    var day = fullDate.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    $(this).val(fullDate.getFullYear() + "/" + month + "/" + day);
    return $(this);
};

//設定FocusColor And Button
$(function () {
    //$(this).SetControlStyle(); $().UItoTop({ easingType: 'easeOutQuint' }); 
});

jQuery.fn.SetControlStyle = function () {

    $(this).find(':text,:radio,:checkbox,textarea').addClass('OrangeText').focus(function () {
        $(this).removeClass("OrangeText").addClass("FocusField")
    }).blur(function () {
        $(this).removeClass("FocusField").addClass("OrangeText")
    });

    //設定 Button
    $(this).find('[name=btn],:submit').button();
};

jQuery.fn.insertAtCaret = function () {
    $(this).button();
    $('#SUBJECT,#DOC_CONTENT').focus(function () { $.data(document.body, 'focusCo', $(this).attr('id')); });
    $(this).click(function () {
        var $id = $.data(document.body, 'focusCo');
        $('#' + $id).insertAtCaretWord($(this).val());
    });
};

$.fn.insertAtCaretWord = function (myValue) {
    return this.each(function () {
        //IE support
        if (document.selection) {
            this.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
        }
        //MOZILLA / NETSCAPE support
        else if (this.selectionStart || this.selectionStart == '0') {
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            var scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
            this.focus();
            this.selectionStart = startPos + myValue.length;
            this.selectionEnd = startPos + myValue.length;
            this.scrollTop = scrollTop;
        } else {
            this.value += myValue;
            this.focus();
        }
    });
};

jQuery.SetPrint = function (level, paramKey, paramParameter) {
    var url = '';
    var parameters = ['paramKey', paramKey, 'paramParameter', paramParameter];
    $.SyncService(GetForderPath(level) + 'Service/WS_Print.asmx/GetPrintUrl', parameters, function (msg) {
        url = msg.d;
    });
    $.colorbox({ width: "100%", height: "100%", iframe: true, href: url });
};

jQuery.fn.SetFile = function (level, key, message, fileJsonObject) {

    var _level = GetForderPath(level);
    var html = '<a href="#" id="FU">檔案上傳</a>&nbsp;<a href="#" id="FD">檔案下載</a>&nbsp;<a href="#" id="FV">附件瀏覽</a>';
    $(this).append(html).find('a').button();

    $(this).find('a').click(function () {
        var keyValue = $('#' + key).val();
        if (keyValue == '') { $.ShowMessage(message); return false; }
        fileJsonObject.SOURCE_KEY = keyValue;
        switch ($(this).attr('id')) {
            case 'FU':
                $.colorbox({ href: _level + "Share/FileUpload.aspx?" + $.param(fileJsonObject), iframe: true, width: "65%", height: "65%" });
                break;
            case 'FD':
                $.colorbox({ href: _level + "Share/FileChange.aspx?" + $.param(fileJsonObject), iframe: true, width: "65%", height: "65%" });
                break;
            case 'FV':
                $.colorbox({ href: _level + "Share/FileView.aspx?" + $.param(fileJsonObject), iframe: true, width: "100%", height: "100%" });
                break;
        }
    });
};