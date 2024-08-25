using System.Text.Json;
using System.Text.Json.Serialization;

namespace Airfare.API.Helper
{
    public class StringToTimeSpanConverter : JsonConverter<TimeSpan>
    {
        public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            TimeSpan output;
            var flag = TimeSpan.TryParse(value, out output);
            if (flag)
                return output;
            return new TimeSpan();

        }

        public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
