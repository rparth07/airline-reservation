using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Airfare.Domain.AdminDomains
{
    public class FlightOperator
    {
        public Guid OperatorId { get; set; }

        public string CompanyName { get; set; }

        public double BaseFare { get; set; }

        public double Tax { get; set; }

        public double Convience { get; set; }

    }
}

