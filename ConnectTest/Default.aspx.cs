using System;
using DBConnection;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
        var connect = new ConnectorMYSQL();
        var count = connect.Count();
        myLabel.Text = "the count is:" + count;

        var sqlConnect = new ConnectorSQL();
        var nextcount = sqlConnect.Count();
        myLabel1.Text = "the count is:" + nextcount;
    }
}