<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Form2.aspx.cs" Inherits="TestWebSit.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>HAHA</title>
    <!--PageSytle-->
    <link href="../Content/PageStyle.css" rel="stylesheet" />
    <!--JQUERY-->
    <script src="../Scripts/jquery.min.js"></script>
    <!-- JQUERYUI -->
    <script src="../Scripts/jqueryUI/jqueryUI.min.js"></script>
    <script src="../Scripts/jqueryUI/jquery.ui.datepicker-zh-TW.js"></script>
    <link href="../Scripts/jqueryUI/HotSneaks/jquery.ui.all.css" rel="stylesheet" />
    <!-- 第三方套件 -->
    <script src="../Scripts/jquery-jtemplates.js"></script>
    <script src="../Scripts/json2.js"></script>
    <script src="../Scripts/scrollbarTable-0.1.min.js"></script>
    <!-- JQUERY PLING -->
    <script src="../Scripts/jServicePlugin.js"></script>
    <script src="../Scripts/jPlugin.js"></script>
    
    <script type="text/javascript">
        // <summary> 用來儲存表單編號資訊< /summary>
        var ServerURL = "./Form2.aspx/";

        // <summary> 當表單啟動時所觸發的事件< /summary>
        $(function(){
            // 配置 Data Grid View 的樣板
            $("#DivDataList").setTemplateURL('./JTemplates/From2_List.htm');
            // 建立按鈕樣式
            $(':button').button(); 
            // 設定日期選單
            $('#birthday').SetDatePicker(2);
            // 註冊當使用者點選到查詢時所觸發的事件
            $('#ButtonQuery').click($.ButtonQuery_Click);
            // 註冊當使用者點選到新增時所觸發的事件
            $('#ButtonInsert').click($.ButtonInsert_Click);
            // 註冊當使用者點選到修改時所觸發的事件
            $('#ButtonUpdate').click($.ButtonUpdate_Click);
            // 註冊當使用者點選到刪除時所觸發的事件
            $('#ButtonDelete').click($.ButtonDelete_Click);
            // 註冊當使用者點選到整批刪除時所觸發的事件
            $('#ButtonDelete_M').click($.ButtonDelete_M_Click);
            // 註冊當使用者點選到清除時所觸發的事件
            $('#ButtonClear').click($.ButtonClear_Click);
            
            // <summary>當使用者點選到資料表時所觸發的事件</summary>
            $("#DivDataList").on('click', 'table tbody tr', $.DivDataList_Click);
            // Refresh Form Data
            $.RefreshFormData();


        });

        $.DivDataList_Click = function () {
            $('#id').val($.trim($(this).find('td:eq(1)').text()));
            $('#emp_name').val($.trim($(this).find('td:eq(2)').text()));
            $('#birthday').val($.trim($(this).find('td:eq(3)').text()));
        }
        // <summary>Refresh Form Data</summary>
        $.RefreshFormData = function () {
            let ParamList = [];

            // 調用後端服務器
            $.SyncService(ServerURL + 'QueryAllData', ParamList, function(pReult) {
                $("#DivDataList").SetDataList({ 
                    JsonObject: JSON.parse(pReult.d), 
                    Heigth: 0
                });
            })

        }

        // <summary>註冊當使用者點選到查詢時所觸發的事件</summary>
        $.ButtonQuery_Click = function () {
            // Refresh Form Data
            $.RefreshFormData();
        }

        // <summary> 取得要維護的資料</summary>
        $.GetJsonObject = function() {
            var Json = {
                id: $.trim($('#id').val()),
                emp_name: $.trim($('#emp_name').val()),
                birthday: $.trim($('#birthday').val()),
            };          
            return Json;
        }
        // <summary>註冊當使用者點選到新增時所觸發的事件</summary>
        $.ButtonInsert_Click = function () {
            var ParamList = ['pCondition', JSON.stringify($.GetJsonObject())];
            // 視覺效果，讓人知道訊息有在更新
            $('#LabelMessage').text('');

            // 調用後端服務器
            $.AsyncService(ServerURL + 'InsertData', ParamList, function (pReult) {
                // 將結果直接打印在網頁上的 Label
                $('#LabelMessage').text(pReult.d);
                // Refresh Form Data
                $.RefreshFormData();
            })
        }
        // <summary>註冊當使用者點選到修改時所觸發的事件</summary>
        $.ButtonUpdate_Click = function () {
            var ParamList = ['pCondition', JSON.stringify($.GetJsonObject())];
            // 視覺效果，讓人知道訊息有在更新
            $('#LabelMessage').text('');

            // 調用後端服務器
            $.AsyncService(ServerURL + 'UpdateData', ParamList, function (pReult) {
                // 將結果直接打印在網頁上的 Label
                $('#LabelMessage').text(pReult.d);
                // Refresh Form Data
                $.RefreshFormData();
            })
        }
        // <summary>註冊當使用者點選到刪除時所觸發的事件</summary>
        $.ButtonDelete_Click = function () {
            var ParamList = ['pCondition', JSON.stringify($.GetJsonObject())];
            // 視覺效果，讓人知道訊息有在更新
            $('#LabelMessage').text('');

            // 調用後端服務器
            $.AsyncService(ServerURL + 'DeleteData', ParamList, function (pReult) {
                // 將結果直接打印在網頁上的 Label
                $('#LabelMessage').text(pReult.d);
                // Refresh Form Data
                $.RefreshFormData();
            })

        }

        // <summary>註冊當使用者點選到整批刪除時所觸發的事件</summary>
        $.ButtonDelete_M_Click = function () {
            const DeleteList = $.GetNeedDeleteObject();
            const ParamList = ['pCondition', JSON.stringify(DeleteList)];
            // 多一重確認，資料有無選取
            if (DeleteList.length <= 0) {
                $.ShowMessage('作業錯誤，尚未選取要刪除的資料，請重新作業');
                return false;
            }
            // 視覺效果，讓人知道訊息有在更新
            $('#LabelMessage').text('');
            // 詢問是否真的要刪除，再執行刪除動作
            $.ShowConfirm('請確定是否真的要刪除資料，資料一旦刪除無法救回!!', function () {
                // 調用後端服務器
                $.AsyncService(ServerURL + 'DeleteListData', ParamList, function (pReult) {
                    // 將結果直接打印在網頁上的 Label
                    $('#LabelMessage').text(pReult.d);
                    // Refresh Form Data
                    $.RefreshFormData();
                })
            })

        }

        // <summary>取得要維護的資料</summary>
        $.GetNeedDeleteObject = function () {
            let ReturnObject = [];
            // 透過 foreach 抓出 #DivDataList 底下有被 checked 的子元素
            $.each( $('#DivDataList :checked'), function(pIndex, pItem){
                // 向回找到 checkbox 的父元素
                let RowTemp = $(this).closest('tr');
                // 抓取 tr 底下td[1] 第二個子元素的內容
                ReturnObject[pIndex] = { 
                    id : $.trim(RowTemp.find('td:eq(1)').text()) 
                };
            });

            return ReturnObject;
        }

        // <summary>註冊當使用者點選到清除時所觸發的事件</summary>
        $.ButtonClear_Click = function () {
            $('[type="text"]').val('');
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <label class="CellStyle">資料維護作業</label>
        <table class="TableMain">
            <tr>
                <td class="CellStyle">員工編號</td>
                <td><input type="text" id="id" /></td>
                <td class="CellStyle">員工姓名</td>
                <td><input type="text" id="emp_name" /></td>
                <td class="CellStyle">生日</td>
                <td><input type="text" id="birthday" /></td>
            </tr>
            <tr>
                <td colspan="6" style="text-align:right" id="TdFunction">
                    <input id="ButtonQuery" type="button" value="Query" />
                    <input id="ButtonInsert" type="button" value="Insert" />
                    <input id="ButtonUpdate" type="button" value="Update" />
                    <input id="ButtonDelete" type="button" value="Delete" />
                    <input id="ButtonDelete_M" type="button" value="整批刪除" />
                    <input id="ButtonClear" type="button" value="Clear" />
                </td>
            </tr>
        </table>
        <label id="LabelMessage"></label>
        <hr />
        <div id="DivDataList">

        </div>

        
    </form>
</body>
</html>
