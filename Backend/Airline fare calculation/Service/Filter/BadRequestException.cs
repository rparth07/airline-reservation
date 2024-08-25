namespace Airfare.Service.Filter
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message) { }
        public BadRequestException(string messsage, Exception innerException) : base(messsage, innerException) { }
    }
}
