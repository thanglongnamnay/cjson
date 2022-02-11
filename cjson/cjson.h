//
// Created by MacBook Pro on 9/15/21.
//

#ifndef CJSON_H
#define CJSON_H

#include <string>
#include <utility>
#include <vector>
#include <unordered_map>

#include "json/document.h"

namespace cjson {

	template <class T>
	T
	toValue(const rapidjson::Value& v) { return T(v); }

	template <>
	inline bool
	toValue<bool>(const rapidjson::Value& v) { return v.GetBool(); }

	template <>
	inline long long
	toValue<long long>(const rapidjson::Value& v) { return v.GetInt64(); }

	template <>
	inline double
	toValue<double>(const rapidjson::Value& v) { return v.GetDouble(); }

	template <>
	inline std::string
	toValue<std::string>(const rapidjson::Value& v) { return v.GetString(); }

	struct unknown {
        friend bool operator==(const unknown& lhs, const unknown& rhs) { return false; }
        friend bool operator!=(const unknown& lhs, const unknown& rhs) { return true; }
    };

	template <class T>
	class map : public std::unordered_map<std::string, T> {
	public:
		map() = default;

		explicit map(const rapidjson::Value& v)
			: std::unordered_map<std::string, T>() {
			for (const auto& entry : v.GetObject()) {
				const std::string key{entry.name.GetString()};
				this->insert(std::make_pair(key, toValue<T>(entry.value)));
			}
		}

		friend bool operator==(const map& lhs, const map& rhs) {
			return static_cast<const std::unordered_map<std::string, T>&>(lhs) == static_cast<const std::unordered_map<
				std::string, T>&>(rhs);
		}

		friend bool operator!=(const map& lhs, const map& rhs) {
			return !(lhs == rhs);
		}
	};

	template <class T>
	class vector : public std::vector<T> {
	public:
		vector() = default;

		explicit vector(const rapidjson::Value& v)
			: std::vector<T>() {
			for (const auto& value : v.GetArray()) {
				this->push_back(toValue<T>(value));
			}
		}

		friend bool operator==(const vector& lhs, const vector& rhs) {
			return static_cast<const std::vector<T>&>(lhs) == static_cast<const std::vector<T>&>(rhs);
		}

		friend bool operator!=(const vector& lhs, const vector& rhs) {
			return !(lhs == rhs);
		}
	};

	/**
	 * light weight maybe for cjson
	 * @tparam T inner type
	 */
	template <class T>
	class maybe {
	private:
		T value;
		bool isSome;
	public:
		constexpr explicit maybe(const rapidjson::Value& v, const char* key) {
			if (v.HasMember(key)) {
				value = toValue<T>(v[key]);
				isSome = true;
			}
		}

		constexpr T getDefault(T defaultValue) const { return isSome ? value : defaultValue; }

		constexpr T getExn() const {
			assert(isSome && "getExn must not be called on an empty maybe");
			return value;
		}

		constexpr std::size_t size() const noexcept { return isSome ? 1 : 0; }

		constexpr bool empty() const noexcept { return !isSome; }

		template <class F>
		constexpr auto map(F const& f) const & -> maybe<decltype(f(value))> {
			using ReturnType = decltype(f(value));
			if (!isSome) { return maybe<ReturnType>(); }
			return maybe<ReturnType>(f(value));
		}


		template <class F>
		auto map(F const& f) && -> maybe<decltype(f(std::move(value)))> {
			using ReturnType = decltype(f(std::move(value)));
			if (!isSome) { return maybe<ReturnType>(); }
			return maybe<ReturnType>(f(std::move(value)));
		}

		template <class F>
		constexpr auto flatMap(F const& f) const & -> decltype(ensuremaybe(f(value))) {
			using ReturnType = decltype(f(value));
			if (!isSome) { return ReturnType(); }

			return f(value);
		}

		template <class F>
		constexpr auto flatMap(F const& f) && -> decltype(ensuremaybe(f(std::move(value)))) {
			using ReturnType = decltype(f(std::move(value)));
			if (!isSome) { return ReturnType(); }

			return f(std::move(value));
		}

		friend bool operator==(const maybe& lhs, const maybe& rhs) {
			return std::tie(lhs.value, lhs.isSome) == std::tie(rhs.value, rhs.isSome);
		}

		friend bool operator!=(const maybe& lhs, const maybe& rhs) {
			return !(lhs == rhs);
		}
	};
}
#endif //CJSON_H
