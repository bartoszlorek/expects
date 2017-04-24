const DEFAULT_LIMIT = 10;
const cached = {};

export default function(limit) {
    limit = limit || DEFAULT_LIMIT;

    return function(name, data) {
        if (typeof name !== 'string') {
            throw 'first parameter must be a string';
        }
        let exists = cached.hasOwnProperty(name);
        
        if (typeof data === 'undefined') {
            return exists ? cached[name] : false;
        }
        if (exists) {
            return data;
        }
        cached[name] = data;
        return data;
    }
}