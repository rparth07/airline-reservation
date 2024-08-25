using Airfare.Domain.AdminDomains;
using Airfare.Domain.RepositoryInterfaces.AdminInterfaces;
using Airfare.Service.Filter;
using Airfare.Service.Services.Admin.AdminInterfaces;

namespace Airfare.Service.Services.Admin
{
    public class OperatorService : IOperatorService
    {
        private readonly IOperatorRepository _operatorRepository;

        public OperatorService(
            IOperatorRepository airfareRepository
            )
        {
            _operatorRepository = airfareRepository ??
                throw new ArgumentNullException(nameof(airfareRepository));

        }


        public FlightOperator AddOperator(FlightOperator flightOperator)
        {
            try
            {
                _operatorRepository.AddOperator(flightOperator);
            }
            catch (Exception)
            {
                throw new BadRequestException($"Operator {flightOperator} Already Exists");
            }

            return flightOperator;
        }



        public void AddAllOperators(List<FlightOperator> flightOperators)
        {
            try
            {
                _operatorRepository.AddAllOperators(flightOperators);
            }
            catch (Exception)
            {
                throw new BadRequestException($"One or more Operator Already Exists");
            }
        }



        public FlightOperator GetOperator(string operatorName)
        {
            var FlightOperator = _operatorRepository.GetOperator(operatorName);
            if (FlightOperator == null)
            {
                throw new NotFoundException($"Can not Found {operatorName}");
            }
            return FlightOperator;
        }



        public List<FlightOperator> GetAllOperators()
        {
            var FlightOperator = _operatorRepository.GetAllOperators();
            if (FlightOperator == null)
            {
                throw new NotFoundException($"Can not Found Any Operator");
            }
            return FlightOperator;
        }



        public void UpdateOperator(FlightOperator flightOperatorFromRepo)
        {
            _operatorRepository.UpdateOperator(flightOperatorFromRepo);
        }



        public void DeleteOperator(string operatorName)
        {
            try
            {
                var getOperatorFromRepo = GetOperator(operatorName);
                _operatorRepository.DeleteOperator(getOperatorFromRepo);
            }
            catch (Exception)
            {
                throw new BadRequestException($"Can not Delete Operator");
            }

        }


        public FlightOperator GetOperatorFromName(string operatorName)
        {
            return _operatorRepository.GetOperatorFromName(operatorName);
        }
    }
}
