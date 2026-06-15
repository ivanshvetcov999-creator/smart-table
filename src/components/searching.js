import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    
    return (data, state, action) => {
        // Получаем поисковый запрос из состояния формы
        const query = state[searchField];

        // Если запрос пустой, пробелы или undefined — возвращаем данные без изменений
        if (!query || query.trim() === '') {
            return data;
        }

        // Переводим поисковый запрос в нижний регистр для регистронезависимого поиска
        const lowerCaseQuery = query.toLowerCase().trim();

        // Фильтруем массив данных стандартными методами JS
        return data.filter(row => {
            // Приводим к строке и нижнему регистру нужные поля: date, customer, seller
            const date = String(row.date ?? '').toLowerCase();
            const customer = String(row.customer ?? '').toLowerCase();
            const seller = String(row.seller ?? '').toLowerCase();

            // Проверяем, содержится ли поисковый запрос хотя бы в одном из полей
            return date.includes(lowerCaseQuery) || 
                   customer.includes(lowerCaseQuery) || 
                   seller.includes(lowerCaseQuery);
        });
    }
}