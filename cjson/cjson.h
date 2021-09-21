//
// Created by MacBook Pro on 9/15/21.
//

#ifndef CJSON_H
#define CJSON_H

#include <string>
#include <utility>
#include <vector>
#include <unordered_map>

#include "rapidjson/document.h"

namespace cjson
{

    template <class T>
    T toValue(const rapidjson::Value &v)
    {
        return T(v);
    }
    template <>
    bool
    toValue<bool>(const rapidjson::Value &v)
    {
        return v.GetBool();
    }
    template <>
    double
    toValue<double>(const rapidjson::Value &v)
    {
        return v.GetDouble();
    }
    template <>
    std::string
    toValue<std::string>(const rapidjson::Value &v)
    {
        return v.GetString();
    }

    struct unknown
    {
    };
    template <class T>
    class map : public std::unordered_map<std::string, T>
    {
    public:
        map() = default;
        explicit map(const rapidjson::Value &v)
            : std::unordered_map<std::string, T>()
        {
            auto obj = v.GetObject();
            for (const auto &entry : obj)
            {
                const std::string key{entry.name.GetString()};
                this->insert(std::make_pair(key, toValue<T>(entry.value)));
            }
        }
    };
    template <class T>
    class vector : public std::vector<T>
    {
    public:
        vector() = default;
        explicit vector(const rapidjson::Value &v)
            : std::vector<T>()
        {
            for (const auto &value : v.GetArray())
            {
                this->push_back(toValue<T>(value));
            }
        }
    };
    /**
	 * light weight maybe for cjson
	 * @tparam T
	 */
    template <class T>
    class maybe
    {
    private:
        T value;
        bool isSome;

    public:
        constexpr explicit maybe(const rapidjson::Value &v, const char *key)
        {
            if (v.HasMember(key))
            {
                value = toValue<T>(v[key]);
                isSome = true;
            }
        }

        constexpr T getDefault(T defaultValue) const
        {
            return isSome ? value : defaultValue;
        }

        constexpr T getExn() const
        {
            assert(isSome && "getExn must not be called on an empty maybe");
            return value;
        }

        constexpr std::size_t size() const noexcept { return isSome ? 1 : 0; }

        constexpr bool empty() const noexcept { return !isSome; }

        template <class F>
        constexpr auto map(F const &f) const & -> maybe<decltype(f(value))>
        {
            using ReturnType = decltype(f(value));
            if (!isSome)
            {
                return maybe<ReturnType>();
            }
            return maybe<ReturnType>(f(value));
        }

        template <class F>
        auto map(F const &f) && -> maybe<decltype(f(std::move(value)))>
        {
            using ReturnType = decltype(f(std::move(value)));
            if (!isSome)
            {
                return maybe<ReturnType>();
            }
            return maybe<ReturnType>(f(std::move(value)));
        }

        template <class F>
        constexpr auto flatMap(F const &f) const & -> decltype(ensuremaybe(f(value)))
        {
            using ReturnType = decltype(f(value));
            if (!isSome)
            {
                return ReturnType();
            }

            return f(value);
        }

        template <class F>
        constexpr auto flatMap(F const &f) && -> decltype(ensuremaybe(f(std::move(value))))
        {
            using ReturnType = decltype(f(std::move(value)));
            if (!isSome)
            {
                return ReturnType();
            }

            return f(std::move(value));
        }
    };
}
#endif //CJSON_H
