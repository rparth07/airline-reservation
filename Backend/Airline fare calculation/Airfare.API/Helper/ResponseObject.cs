namespace Airfare.API.Helper
{
    public class ResponseObject
    {

        public string Title { get; set; }
        public int StatusCode { get; set; }
        public List<string> Errors { get; set; }
        public ResponseObject(string err, int statusCode)
        {
            this.Title = err;
            this.StatusCode = statusCode;
        }
    }
}
