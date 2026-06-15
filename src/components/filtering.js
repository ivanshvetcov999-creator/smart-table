import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
// ВАЖНО: Эта строчка должна быть строго здесь, на самом верху файла!
const compare = createComparison(defaultRules); 

export function initFiltering(elements, indexes) {
 Object.keys(indexes).forEach((elementName) => {
    if (elements[elementName] && indexes[elementName]) {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    }
 });  

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const input = parent ? parent.querySelector('input') : null;
            
            if (input) {
                input.value = ''; 
            }
            const fieldName = action.dataset.field;
            if (fieldName && fieldName in state) {
                state[fieldName] = ''; // сбрасываем значение в объекте состояния
            }
        }
        
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}