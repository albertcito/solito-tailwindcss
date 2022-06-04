// Regular expression to identify HTML tags in
// the input string. Replacing the identified
// HTML tag with a null string.
const removeTags = (str:string) => str.replace(/(<([^>]+)>)/ig, '');

export default removeTags;
