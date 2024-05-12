<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="TestWebSit.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>HAHA</title>
    <link rel="stylesheet" href="./Content/PageStyle.css">
    <script src="./Content/code.jquery.com_jquery-3.7.0.min.js"></script>
    <script type="text/javascript">
        // $(document).ready(function () {
        //     alert('I am Ready!!');
        // });
        $(function () {

            $('#ButtonQuery').click(function () {
                $.GetServerData('<%= ResolveUrl("WebForm1.aspx/QueryAllData") %>', {});
            })
            $.GetServerData = function (pUrlMethos, pParamList) {
                $.ajax({
                    type: 'POST',
                    cache: false,
                    async:false,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    url: pUrlMethos,
                    data: pParamList,
                    success: function (msg) {
                        if (msg != null) {
                            SuccessCallblack(msg)
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("( " + xhr.resposeText + " )");
                        alert(err);
                    }


                });
            }

            function SuccessCallblack(Data) {
                console.log(JSON.stringify(Data));
            }
            // <summary> 註冊當點到選到按鈕時所觸發的事件 </summary>
            // $('#TdFunction ').on('click', ':button', function () {
            //     // 獲取觸發事件的物件 id
            //     let ID = $(this).attr('id');
            //     alert(ID);
            // });
            
            // $(':button').click(function() {
                
            //     let ID = $(this).attr('id');
            //     alert(ID);
            // })

            // <summary> 取得要維護的資料</summary>
            $.GetJsonObject = function() {
                var Json = {
                    ID: $('#Text1').val(),
                    Name: $('#Text2').val(),
                    BIRTHDA: $('#Text3').val(),
                };
                return Json;
            }

            $('#ButtonINSERT').click(function () {
                // 用來獲取使用者輸入的資料
                var InpuData = $.GetJsonObject();
                //資料新增作業
                $.InsertData(InpuData);
            });


            // <summary> 資料新增作業</summary>
            $.InsertData = function (pInputData) {
                var Html = `
                <tr>
                    <td>${pInputData.ID}</td>
                    <td>${pInputData.Name}</td>
                    <td>${pInputData.BIRTHDA}</td>
                </tr>
                `
                $('table.HeadScroll tbody').append(Html);
            }

            // <summary> 當使用者電到資料表時所觸發的事件</summary>
            $('#DataGridViewFormData').on('click', 'table tbody tr', function(){
                let theID = $.trim($(this).find('td:eq(0)').text());
                $('#Text1').val(theID);
                let theName = $.trim($(this).find('td:eq(1)').text());
                $('#Text2').val(theName);
                let theBir = $.trim($(this).find('td:eq(2)').text());
                $('#Text3').val(theBir);
            });

            // <summary> 當使用者點到修改按鈕時所觸發的事件</summary>
            $('#ButtonUPDATE').click(function (){
                // 透過 For 迴圈將資料表的 tr 逐一取出
                $.each($('#DataGridViewFormData table tbody tr'), function(pIndex, pItem) {
                    // 透由 ID 比較， 確定要修改的資料
                    if ($.trim($(this).find('td:eq(0)').text()) == $.trim($('#Text1').val())){
                        // 修改姓名
                        $(this).find('td:eq(1)').text($.trim($('#Text2').val()));
                        // 修改姓名
                        $(this).find('td:eq(2)').text($.trim($('#Text3').val()));
                        return false;
                    }
                })

            })
            
            // <summary> 當使用者點到刪除按鈕時所觸發的事件</summary>
            $('#ButtonDELETE').click(function (){
                // 透過 For 迴圈將資料表的 tr 逐一取出
                $.each($('#DataGridViewFormData table tbody tr'), function(pIndex, pItem) {
                    // 透由 ID 比較， 確定要修改的資料
                    if ($.trim($(this).find('td:eq(0)').text()) == $.trim($('#Text1').val())){
                        $(this).remove();
                        $('[type="text"]').val('');
                        return false;
                    }
                })

            })
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <label class="CellStyle">資料維護作業</label>
        <table class="TableMain">
            <tr>
                <td class="CellStyle">ID</td>
                <td><input type="text" id="Text1" class="Text1"></td>
                <td class="CellStyle">NAME</td>
                <td><input type="text" id="Text2" class="Text2"></td>
                <td class="CellStyle">生日</td>
                <td><input type="text" id="Text3" class="Text3"></td>
            </tr>
            <tr>
                <td colspan="6" style="text-align:right" id="TdFunction">
                    <input id="ButtonQuery" type="button" value="Query" />
                    <input id="ButtonINSERT" type="button" value="INSERT" />
                    <input id="ButtonUPDATE" type="button" value="UPDATE" />
                    <input id="ButtonDELETE" type="button" value="DELETE" />
                </td>
            </tr>
        </table>
        <hr>
        <div id="DataGridViewFormData">
            <table class="HeadScroll">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>生日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>XxX</td>
                        <td>1922.01.01</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>OoO</td>
                        <td>1924.12.21</td>
                    </tr>            
                </tbody>
            </table>
        </div>
    </form>
</body>
</html>
