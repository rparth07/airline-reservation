
using Airfare.Domain.Admin;
using System.Collections.Generic;

namespace Airfare.Domain.RepositoryInterfaces.AdminInterfaces
{
    public interface IOperatorRepository
    {
        public void AddOperator(FlightOperator flightOperator);
        void AddAllOperators(List<FlightOperator> operatorData);
        public FlightOperator GetOperator(string operatorName);
        List<FlightOperator> GetAllOperators();
        FlightOperator GetOperatorFromName(string operatorName);
        void UpdateOperator(FlightOperator flightOperatorFromRepo);
        void DeleteOperator(FlightOperator operatorFromRepo);
        public void Dispose();
    }
}
