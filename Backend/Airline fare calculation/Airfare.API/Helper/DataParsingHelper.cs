using Airfare.Service.Filter;
using CsvHelper;
using System.Globalization;

namespace Airfare.API.Helper
{
    public static class DataParsingHelper
    {
        public static List<T> ParseData<T>(this T dataObject, IFormFile postedFile)
        {
            try
            {
                List<T> parsedData = new List<T>();

                using (StreamReader streamReader = new StreamReader(postedFile.OpenReadStream()))
                {
                    var csvReader = new CsvReader(streamReader, CultureInfo.CurrentCulture);
                    parsedData = csvReader.GetRecords<T>().ToList();
                }

                return parsedData;
            }

            catch (Exception ex)
            {
                throw new BadRequestException("Can not proccess File Please check and Try again.");
            }

        }
    }
}
