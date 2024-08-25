using Airfare.Data;
using Airfare.Domain.AdminDomains;
using System;

namespace Airfare.console
{
    internal class Program
    {
        private static AirfareContext _context = new AirfareContext();

        static void Main(string[] args)
        {
            _context.Database.EnsureCreated();

            Console.WriteLine("Hello World!");            
        }
    }
}
