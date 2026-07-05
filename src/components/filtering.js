export function initFiltering(elements) {
  // @todo: #4.3 — настроить компаратор
  const updateIndexes = (elements, indexes) => {
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
  }

  const applyFiltering = (query, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === 'clear') {
      const parent = action.parentElement;
      const input = parent ? parent.querySelector('input') : null;
      if (input) {
        input.value = '';
      }

      const fieldName = action.dataset.field;
      if (fieldName && fieldName in state) {
        state[fieldName] = '';
      }

      state.page = 1;
    }

    const filter = {};
    Object.keys(elements).forEach(key => {
      if (elements[key]) {
        if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
          filter[`filter[${elements[key].name}]`] = elements[key].value;
        }
      }
    });

    return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
  }

  return {
    updateIndexes,
    applyFiltering
  }
}