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

namespace BO.BO {
    public class EmpBasisHandler {
        
        public string QueryAllData() {

            var Data = (DataTable)DAOtb_base_emp_basis.GetInstance()
                .Query(null, new QueryRelatedInfo() { 
                    ReturnType = ReturnMode.DataTable, 
                    OrderBy = "emp_name" 
                });
            return JsonConvert.SerializeObject(Data);
        }
        public string  InsertData(CDOtb_base_emp_basis pData) {
            return null;
        }
        public string UpdateData(CDOtb_base_emp_basis pData) {
            return null;
        }
        public string DeleteData(CDOtb_base_emp_basis pData) {
            return null;
        }
    }
}
