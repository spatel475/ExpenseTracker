using Microsoft.AspNetCore.SignalR;

namespace ExpenseTracker
{
    public class ServerHub: Hub
    {
        public string TestMethod()
        {
            return "message sent back to client from server successfully"; 
        }
    }
}
