export function formDataToJSON(form){
    let object = {};
    const formData = new FormData(form);
    formData.forEach((value,key) => { object[key] = value; });
    return JSON.stringify(object);
}