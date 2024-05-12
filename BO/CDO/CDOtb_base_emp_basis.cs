using System;
using System.Data;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using Core.DataObject;
using Core.ProjectBase.Base;

namespace FW.SystemDAO.Entity.Tables {

    [CDO(TableName = "tb_base_emp_basis")]
    public class CDOtb_base_emp_basis : CDOBase {

        [CDO(ColumnName = "id", DBType = SqlDbType.Int, PrimaryKey = true, NotNull = true)]
        public Int32? id { get; set; }

        [CDO(ColumnName = "emp_name", DBType = SqlDbType.NVarChar)]
        public String emp_name { get; set; }

        [CDO(ColumnName = "birthday", DBType = SqlDbType.NVarChar)]
        public String birthday { get; set; }

        [CDO(ColumnName = "insert_datetime", DBType = SqlDbType.DateTime, ColumnMode = ColumnType.INSERT_TIME)]
        public DateTime? insert_datetime { get; set; }

    }
}
