
function textareaDataToArray(data) {
    if (!data) return [];
    return data.split('\n').filter(value => value !== '');
}


module.exports = textareaDataToArray;