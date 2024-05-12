using BO.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TestWebSit
{
    public partial class WebForm2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string QueryAllData()
        {
            // 呼叫 BO 層物件 
            var BO = new EmpBasisHandler();
            // 使用 QueryAllData(pCondition) Model 做查詢，並回傳結果訊息
            return BO.QueryAllData();
        }
        [WebMethod]
        public static string InsertData(string pCondition)
        {
            // 呼叫 BO 層物件 
            var BO = new EmpBasisHandler();
            // 使用 InserData(pCondition) Model 做新增，並回傳結果訊息
            return BO.InsertData(pCondition);
        }

        [WebMethod]
        public static string UpdateData(string pCondition)
        {
            // 呼叫 BO 層物件 
            var BO = new EmpBasisHandler();
            // 使用 UpdateData(pCondition) Model 做修改，並回傳結果訊息
            return BO.UpdateData(pCondition);
        }
        [WebMethod]
        public static string DeleteData(string pCondition)
        {
            // 建立 BO 層物件 
            var BO = new EmpBasisHandler();
            // 使用 DeleteData(pCondition) Model 做刪除，並回傳結果訊息
            return BO.DeleteData(pCondition);
        }
        [WebMethod]
        public static string DeleteListData(string pCondition)
        {
            // 建立 BO 層物件 
            var BO = new EmpBasisHandler();
            // 使用 DeleteListData(pCondition) Model 做刪除，並回傳結果訊息
            return BO.DeleteListData(pCondition);
        }


    }
}