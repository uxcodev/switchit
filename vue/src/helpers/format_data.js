export default {
  formatOfferCriteria: (data) => {
    console.log('formatOfferCriteria', data)
    let result = '';
    Object.entries(data).forEach(([category, categoryData]) => {
      result += `${category}:\n`;
      if (categoryData.interaction_data) {
        console.log('category', category, 'categoryData', categoryData)
        Object.entries(categoryData.interaction_data).forEach(([dataType, dataTypeData]) => {
          result += `  ${dataType}:\n`;
          const valueArray = Array.isArray(dataTypeData.value) ? dataTypeData.value : [dataTypeData.value];
          valueArray.forEach((filterData, index) => {
            // console.log('filterData', filterData, dataTypeData, dataType, 'index', index)
            const filter = index === 0 ? 'from' : 'to';
            result += `    ${filter}: `;
            if (filterData && filterData.type === 'range_date') {
              const { from: [start_from, start_to], to: [end_from, end_to] } = filterData.value;
              console.log('start_from', start_from, 'start_to', start_to, 'end_from', end_from, 'end_to', end_to);
              result += `From ${start_from || 'beginning'} to ${start_to || 'end'} and from ${end_from || 'beginning'} to ${end_to || 'end'}`;
            } else if (filterData && filterData.type === 'range_amount') {
              const [min, max] = filterData.value;
              console.log('min', min, 'max', max);
              result += `Between ${min ?? '0'} and ${max ?? 'no maximum'}`;
            } else if (filterData && filterData.type === 'date') {
              const [before, after] = filterData.value;
              console.log('before', before, 'after', after);
              result += `${before ? 'Before ' + before : 'Any date'} and ${after ? 'after ' + after : 'any date'}`;
            } else if (filterData && filterData.type === 'range_slider') {
              const [min, max] = filterData.value;
              result += `Between ${min} and ${max}`;
            } else if (filterData && filterData.type === 'identifier_number') {
              result += filterData.value;
            } else {
              result += 'N/A';
            }
            result += '\n';
          });
        });
      }
      if (categoryData.preference_data) {
        result += `  preference_data:\n`;
        Object.entries(categoryData.preference_data).forEach(([dataType, dataTypeData]) => {
          result += `    ${dataType}: `;
          if (dataTypeData.type === 'range_amount') {
            const [min, max] = dataTypeData.value;
            result += `Between ${min ?? '0'} and ${max ?? 'no maximum'}`;
          } else if (dataTypeData.type === 'range_slider') {
            const [min, max] = dataTypeData.value;
            result += `Between ${min} and ${max}`;
          } else {
            result += 'N/A';
          }
          result += '\n';
        });
      }
    });
    return result;
  }
}
