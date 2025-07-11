using Newtonsoft.Json;

namespace BookSale.Management.UI.Ultility
{
    public static class SessionHelper
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            if (string.IsNullOrEmpty(key))
                throw new ArgumentException("Key cannot be null or empty", nameof(key));

            var serializedValue = JsonConvert.SerializeObject(value);
            session.SetString(key, serializedValue);
        }

        public static T? Get<T>(this ISession session, string key)
        {
            if (string.IsNullOrEmpty(key))
                return default(T);

            var value = session.GetString(key);

            return JsonConvert.DeserializeObject<T>(value);
        }
    }
}
