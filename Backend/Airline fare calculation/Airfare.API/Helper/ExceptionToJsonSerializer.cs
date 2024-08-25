using Microsoft.AspNetCore.Mvc;

namespace Airfare.API.Helper
{
    public static class ExceptionToJsonSerializer
    {
        public static IActionResult BusinessErrors(Exception ex)
        {
            return new JsonResult(ex.Message.ToString());
        }
    }
}
