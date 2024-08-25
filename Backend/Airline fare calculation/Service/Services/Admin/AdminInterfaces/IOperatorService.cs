using Airfare.Domain.AdminDomains;

namespace Airfare.Service.Services.Admin.AdminInterfaces
{
    public interface IOperatorService
    {
        public FlightOperator AddOperator(FlightOperator flightOperator);
        public void AddAllOperators(List<FlightOperator> flightOperators);
        public FlightOperator GetOperator(string operatorName);
        List<FlightOperator> GetAllOperators();
        void UpdateOperator(FlightOperator flightOperatorFromRepo);
        void DeleteOperator(string operatorName);
        public FlightOperator GetOperatorFromName(string operatorName);
    }
}