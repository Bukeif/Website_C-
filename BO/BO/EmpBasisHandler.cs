using Core.ProjectBase.Base;
using FW.SystemDAO.DAO.Tables;
using FW.SystemDAO.Entity.Tables;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO.BO
{
    public class EmpBasisHandler
    {

        public string QueryAllData() {

            var Data = (DataTable)DAOtb_base_emp_basis.GetInstance()
                .Query(null, new QueryRelatedInfo()
                {
                    ReturnType = ReturnMode.DataTable,
                    OrderBy = "emp_name"
                });
            return JsonConvert.SerializeObject(Data);
        }
        // 資料新增
        public string InsertData(string pData) {
            // 創建 Condition ，將 pData 透過 CDO 轉換成的物件以 Json 的格式做存放查詢的條件
            var Condition = JsonConvert.DeserializeObject<CDOtb_base_emp_basis>(pData);
            // 建立一個DAO的物件
            var EmpDAO = DAOtb_base_emp_basis.GetInstance();
            // 建立一個DAO物件去做查詢，DAO物件會調用
            var DataTemp = (List<CDOtb_base_emp_basis>)DAOtb_base_emp_basis.GetInstance().Query(
                // 查詢條件 SQL  where 那邊的設定
                new CDOtb_base_emp_basis()
                {
                    id = Condition.id
                },
                // 回傳的結果存成一個List
                new QueryRelatedInfo()
                {
                    ReturnType = ReturnMode.List
                });
            // 驗證資料是否存在
            // 查詢是否資料存在，並且結果數大於 0 代表已經有相同資料存在回傳錯誤訊息
            if (DataTemp != null && DataTemp.Count() > 0)
                return "錯誤:員工基本資料 ID [" + Condition.id + "] 資料已經存在，不能再新增";
            // 呼叫 EmpDAO 去 Add Condition 裡的資料
            // 前端送來的資料已經跟資料庫欄位名稱相同，不用再轉換，可以直接傳送
            EmpDAO.Add(Condition);

            return "資料新增以作業完成，成功!!";
        }
        // 資料修改
        public string UpdateData(string pData) {
            // 創建 Condition ，將 pData 透過 CDO 轉換成的物件以 Json 的格式做存放查詢的條件
            var Condition = JsonConvert.DeserializeObject<CDOtb_base_emp_basis>(pData);
            // 建立一個DAO的物件
            var EmpDAO = DAOtb_base_emp_basis.GetInstance();
            // 建立一個DAO物件去做查詢，DAO物件會調用
            var DataTemp = (List<CDOtb_base_emp_basis>)DAOtb_base_emp_basis.GetInstance().Query(
                // 查詢條件 SQL  where 那邊的設定
                new CDOtb_base_emp_basis()
                {
                    id = Condition.id
                },
                // 回傳的結果存成一個List
                new QueryRelatedInfo()
                {
                    ReturnType = ReturnMode.List
                });
            // 驗證資料是否存在
            // 查詢是否資料存在，如果資料小於 0或null 代表資料不存在，回傳錯誤訊息
            if (DataTemp == null && DataTemp.Count() <= 0)
                return "錯誤:員工基本資料 ID [" + Condition.id + "] 資料不存在，無法修改";
            // 呼叫 EmpDAO 去 Add Condition 裡的資料
            // 前端送來的資料已經跟資料庫欄位名稱相同，不用再轉換，可以直接傳送
            EmpDAO.Update(Condition);

            return "資料修改已作業完成，成功!!";
        }
        // 資料刪除
        public string DeleteData(string pData) {
            // 創建 Condition ，將 pData 透過 CDO 轉換成的物件以 Json 的格式做存放查詢的條件
            var Condition = JsonConvert.DeserializeObject<CDOtb_base_emp_basis>(pData);
            // 建立一個DAO的物件
            var EmpDAO = DAOtb_base_emp_basis.GetInstance();
            // 建立一個DAO物件去做查詢，DAO物件會調用
            var DataTemp = (List<CDOtb_base_emp_basis>)DAOtb_base_emp_basis.GetInstance().Query(
                // 查詢條件 SQL  where 那邊的設定
                new CDOtb_base_emp_basis()
                {
                    id = Condition.id
                },
                // 回傳的結果存成一個List
                new QueryRelatedInfo()
                {
                    ReturnType = ReturnMode.List
                });
            // 驗證資料是否存在
            // 查詢是否資料存在，如果資料小於 0或null 代表資料不存在，回傳錯誤訊息
            if (DataTemp == null && DataTemp.Count() <= 0)
                return "錯誤:員工基本資料 ID [" + Condition.id + "] 資料不存在，無法刪除";
            // 呼叫 EmpDAO 去 Add Condition 裡的資料
            // 前端送來的資料已經跟資料庫欄位名稱相同，不用再轉換，可以直接傳送
            EmpDAO.Delete(Condition);

            return "資料刪除已作業完成，成功!!";
        }
        // 複數資料刪除
        public string DeleteListData(string pData) {
            // 創建 Condition ，將 pData 透過 CDO 轉換成的List物件以 Json 的格式做存放查詢的條件
            var Condition = JsonConvert.DeserializeObject<List<CDOtb_base_emp_basis>>(pData);
            // 建立一個DAO的物件
            var EmpDAO = DAOtb_base_emp_basis.GetInstance();
           
            // 驗證資料是否存在
            // 查詢是否資料存在，如果資料小於 0或null 代表資料不存在，回傳錯誤訊息
            if (Condition == null && Condition.Count() <= 0)
                return "錯誤:沒有帶入要刪除的資料，資料無法刪除，請重新確認!!";
            // 呼叫 EmpDAO 去 Add Condition 裡的資料
            // 前端送來的資料已經跟資料庫欄位名稱相同，不用再轉換，可以直接傳送
            EmpDAO.Delete(Condition);

            return "資料刪除已作業完成，成功!!";
        }
    }
}
