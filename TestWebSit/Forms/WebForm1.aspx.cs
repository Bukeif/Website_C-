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
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string QueryAllData() {
            var BO = new EmpBasisHandler();
            return BO.QueryAllData();
        }
        [WebMethod]
        public static string InsertData(string pCondition) {
            return "員工資料新增成功";
        }

        [WebMethod]
        public static string UpdateData(string pCondition) {
            return "員工資料修改成功";
        }
        [WebMethod]
        public static string DeleteData(string pCondition) {
            return "員工資料刪除成功";
        }


    }
}