using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.ProjectBase.Base;
using FW.SystemDAO.Entity.Tables;

namespace FW.SystemDAO.DAO.Tables {

    /// <summary>DAO：用來對［tb_base_emp_basis］資料表進行交易操作的 Data Access 物件</summary>
    public class DAOtb_base_emp_basis : DAOBase<CDOtb_base_emp_basis> {

        #region 建構子

        /// <summary>建構子</summary>
        private DAOtb_base_emp_basis(string pConfigName = "") : base(DefaultOrderColumn.Key, "", pConfigName) { }

        /// <summary>利用single pattern取得DAOtb_base_emp_basis的實體</summary>
        /// <returns>將會回傳一個DAOtb_base_emp_basis的實體</returns>
        public static DAOtb_base_emp_basis GetInstance(string pConfigName = "") {
            return new DAOtb_base_emp_basis(pConfigName);
        }

        /// <summary>解構子</summary>
        ~DAOtb_base_emp_basis() { }

        #endregion

        #region 查詢

        /// <summary>By PrimaryKey query data</summary>
        /// <param name="pCDO">傳入交易查詢條件</param>
        /// <param name="pQueryInfo">傳入查詢必要資訊</param>
        /// <returns>將回傳查詢到的資料</returns>
        public object QueryByKey(CDOtb_base_emp_basis pCDO, QueryRelatedInfo pQueryInfo) {
            // 用來儲存 SQL 語法的物件
            var SqlCommand = new StringBuilder();
            // 用來儲存交易SQL時所需要的參數資訊
            var ParamList = new List<IDbDataParameter>();

            if (pQueryInfo == null) pQueryInfo = new QueryRelatedInfo();
            SqlCommand.AppendLine("SELECT " + ( pQueryInfo == null || String.IsNullOrWhiteSpace(pQueryInfo.Columns) == true ? "*" : pQueryInfo.Columns ) + " ");
            SqlCommand.AppendLine("FROM tb_base_emp_basis");
            SqlCommand.AppendLine("WHERE 1 = 1 ");
            SqlCommand.AppendLine("AND id = @id ");

            ParamList.Add(this.Base_GetDbParamInstance("@id", pCDO.id));

            // 設定排序欄位
            if (pQueryInfo.OrderBy == null || pQueryInfo.OrderBy.Trim() == "") pQueryInfo.OrderBy = "id";
            // 取得並回傳資料
            var Result = (List<CDOtb_base_emp_basis>)this.Base_GetMultiTypeData<CDOtb_base_emp_basis>(SqlCommand, ParamList, pQueryInfo);
            // 判斷是否有查詢到資料
            if (Result == null || Result.Count <= 0)
                return null;
            return Result[0];
        }

        /// <summary>判斷是否已經有資料</summary>
        /// <param name="pCDO">傳入使用者編號</param>
        /// <returns>將回傳目前資料庫是否已經存在該筆資料</returns>
        public bool CheckHaveDataByKey(CDOtb_base_emp_basis pCDO) {
            // 用來儲存交易資料時所需的參數
            List<IDbDataParameter> ParamList = new List<IDbDataParameter>();
            // 用來儲存查詢到的資料
            DataTable QueryTemp = null;

            this.CommandText.Length = 0;
            this.CommandText.AppendLine("SELECT * FROM tb_base_emp_basis");
            this.CommandText.AppendLine("WHERE 1 = 1 ");
            this.CommandText.AppendLine("AND id = @id ");

            ParamList.Add(this.Base_GetDbParamInstance("@id", pCDO.id));

            QueryTemp = this.GetDataTableBySql(this.CommandText.ToString(), ParamList);
            // 判斷是否已經有資料存在
            if (QueryTemp != null && QueryTemp.Rows.Count > 0)
                return true;
            return false;
        }

        #endregion

    }
}
