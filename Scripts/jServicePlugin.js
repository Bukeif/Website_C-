/*  (2012/04/01) By 俊億-Bruce  */

jQuery.AsyncService = function (urlMethod, paramArray, returnFunction) {
    var paramList = '';
    if (paramArray.length > 0) {
        for (var i = 0; i < paramArray.length; i += 2) {
            if (paramList.length > 0) paramList += ','; paramList += "'" + paramArray[i] + "':'" + paramArray[i + 1] + "'"
        }
    };
    paramList = '{' + paramList + '}';
    $.ajax({ type: "POST", contentType: "application/json; charset=utf-8",
        url: urlMethod, data: paramList, dataType: "json", success: function (msg) {
            if (msg != null) { returnFunction(msg) }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            $.ShowMessage(err.Message);
        }
    });
};


// 連結到後端的方法請使用以下
jQuery.SyncService = function (urlMethod, paramArray, returnFunction) {
    var paramList = '';
    if (paramArray.length > 0) {
        for (var i = 0; i < paramArray.length; i += 2) {
            if (paramList.length > 0) paramList += ','; paramList += "'" + paramArray[i] + "':'" + paramArray[i + 1] + "'"
        };
    };
    paramList = '{' + paramList + '}';
    $.ajax({ type: "POST", async: false, contentType: "application/json; charset=utf-8",
        url: urlMethod, data: paramList, dataType: "json",
        success: function (msg) {
            if (msg != null) { returnFunction(msg) }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            $.ShowMessage(err.Message);
        }
    });
};

jQuery.fn.BindingData = function (data) {
    for (var d in data) {
        var $control = $(this).find('#' + d);
        var $controlName = $(this).find('[name=' + d + ']');

        if ($control.length == 0 && $controlName.length == 0) { continue; };
        if ($control.is('input')) {
            var controlAttr = $control.attr('type');
            switch (controlAttr) {
                case "text":
                case "password":
                case "hidden":
                    $control.val(data[d]);
                    break;
                case "checkbox":
                    $control.prop('checked', data[d] == 'T');
                    break;
            };
        } else if ($control.is('textarea')) {
            $control.val(data[d]);
        } else if ($control.is('select')) {
            $control.val(data[d]);
        } else if ($controlName.attr('type') == 'radio') {
            $.each($controlName, function () {
                if ($(this).val() == data[d]) { $(this).prop('checked', true); };
            });
        } else {
            $control.text(data[d]);
        }
    };
};

jQuery.ReplaceAll = function (Source, stringToFind, stringToReplace) {
    var temp = Source;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
};

jQuery.ReplaceSpcWord = function (value) {
    var value = $.ReplaceAll(value, '"', '#a#');
    value = $.ReplaceAll(value, '\\', '#b#');
    value = $.ReplaceAll(value, "'", '#c#');
    return value;
}

jQuery.fn.GetJsonObject = function () {
    var jsonObject = {}, controlAttr = '', value = '';
    $.each($(this).find(':text,:password,:hidden,:checkbox,:radio,textarea,select,span'), function () {
        controlAttr = $(this).attr('type');
        switch (controlAttr) {
            case "text":
            case "password":
            case "hidden":
                value = $(this).val();
                jsonObject[$(this).attr('id')] = value == '' ? null : $.ReplaceSpcWord($(this).val());
                break;
            case "checkbox":
                jsonObject[$(this).attr('id')] = $(this).prop('checked') ? 'T' : 'F';
                break;
            case "radio":
                if ($(this).prop('checked')) {
                    value = $(this).val();
                    jsonObject[$(this).attr('name')] = value == '' ? null : $(this).val();
                }
                break;
            default:
                if ($(this).is('textarea') || $(this).is('select')) {
                    value = $(this).val();
                    jsonObject[$(this).attr('id')] = value == '' ? null : $.ReplaceSpcWord($(this).val());
                } else {
                    if ($(this).attr('id') != undefined) {
                        value = $(this).text();
                        jsonObject[$(this).attr('id')] = value == '' ? null : $(this).text();
                    };
                }
        };
    });
    return jsonObject;
};



