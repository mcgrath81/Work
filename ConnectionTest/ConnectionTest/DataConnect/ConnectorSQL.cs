using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBConnection
{
    public class ConnectorSQL
    {
        private SqlConnection myConnection;
        private string exception;
         //Constructor
        public ConnectorSQL()
        {
            Initialize();
        }

        //Initialize values
        private void Initialize()
        {
            myConnection = new SqlConnection(@"server=mssql1241int.cp.blacknight.com;" +
                           "database=db1141027_foursquare; " +
                           "User Id=u1141027_fsquser1;" +
                           "Password=Fsqp@ssword11;" +
                           "connection timeout=15");

           //myConnection = new SqlConnection(@"server=localhost\MSSQL2012;" +
           //                "Trusted_Connection=True;" +
           //                "database=Raven8; " +
           //                "connection timeout=30");

        }

        //open connection to database
        private bool OpenConnection()
        {
            try
            {
                myConnection.Open();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                exception = e.Message;
                return false;
            }
        }

        public string Count()
        {
            string count ="";
            if (this.OpenConnection() == true)
            {
                count = "Yippee";
                //SqlDataReader myReader = null;
                //var myCommand = new SqlCommand("select count(*) as 'Count' from Asset",
                //    myConnection);
                //myReader = myCommand.ExecuteReader();
                //while (myReader.Read())
                //{
                //    count = myReader["Count"].ToString();
                //}
            }
            else
            {
                count = exception;
            }
            return count;
        }
        
        
    }
}
