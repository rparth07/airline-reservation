using Airfare.Data;
using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using Airfare.Domain.RepositoryInterfaces.AdminInterfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Airfare.Data.Repository.Admin
{
    public class OperatorRepository : IDisposable, IOperatorRepository
    {
        private readonly AirfareContext _context;
        private readonly IMapper _mapper;

        public OperatorRepository(AirfareContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public void AddOperator(FlightOperator flightOperator)
        {
            var flightOperatorData = _mapper.Map<FlightOperatorDataModel>(flightOperator);
            //flightOperatorData.OperatorId = Guid.NewGuid();

            _context.FlightOperator.Add(flightOperatorData);
            Save();
        }



        public void AddAllOperators(List<FlightOperator> operators)
        {
            var operatorData = _mapper.Map<List<FlightOperatorDataModel>>(operators);

            //operatorData.ForEach(flightoperator => flightoperator.OperatorId = Guid.NewGuid());

            _context.FlightOperator.AddRange(operatorData);
            Save();
        }



        public FlightOperator GetOperator(string operatorName)
        {
            var operatorDataToReturn = _context.FlightOperator
                    .AsNoTrackingWithIdentityResolution()
                    .FirstOrDefault(a => a.CompanyName == operatorName);

            return _mapper.Map<FlightOperator>(operatorDataToReturn);
        }



        public List<FlightOperator> GetAllOperators()
        {
            var operatorsToReturn = _context.FlightOperator.ToList();

            return _mapper.Map<List<FlightOperator>>(operatorsToReturn);
        }



        public FlightOperator GetOperatorFromName(string operatorName)
        {
            var flightOperatorData = _context.FlightOperator
                .AsNoTracking()
                .FirstOrDefault(a => a.CompanyName == operatorName);
            return _mapper.Map<FlightOperator>(flightOperatorData);
        }



        public void UpdateOperator(FlightOperator flightOperatorFromRepo)
        {
            var flightOperatorDataModel = _mapper.Map<FlightOperatorDataModel>(flightOperatorFromRepo);

            

            _context.FlightOperator.Update(flightOperatorDataModel);
            Save();
        }



        public void DeleteOperator(FlightOperator operatorFromRepo)
        {
            var operatorData = _mapper.Map<FlightOperatorDataModel>(operatorFromRepo);
            var operatorToDelete = _context.FlightOperator.Where(_ => _.OperatorId == operatorData.OperatorId).FirstOrDefault();

            _context.FlightOperator.Remove(operatorToDelete);
            Save();
        }



        private bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }



        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // dispose resources when needed
            }
        }

    }
}
