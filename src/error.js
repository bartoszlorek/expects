import types, { typeOf } from './types.js';

const an = function(text) {
    let isVowel = ['a','o','i','e','u','y']
        .indexOf(text[0]) > -1;
    return (isVowel ? 'an ' : 'a ') + text;
}

const message = {
    expects: (name, value) => {
        let valueType = typeOf(value);
        if (valueType === 'array') {
            value = '['+ trimArray(value, 5) +']';
        } else if (valueType === 'object') {
            value = '{'+ trimArray(Object.keys(value), 5) + '}';
        }
        throw `\`${value}\` (${valueType}) expects to be ${an(name)}`
    },    
    name: 'first parameter must be a defined name',
    unique: 'first parameter must be a unique name, not already defined',
    func: 'second parameter must be a function',
    bool: 'second parameter must return a boolean value'
}

export default function(msgName) {
    if (!message.hasOwnProperty(msgName)) {
        return;
    }
    let msg = message[msgName];
    if (types.isFunction(msg)) {
        return msg;
    }
    throw msg;
}

function trimArray(arr, limit) {
    let length = arr.length;
    arr = arr.slice(0, limit);
    if (length > arr.length) {
        arr.push('...');
    }
    return arr;
}