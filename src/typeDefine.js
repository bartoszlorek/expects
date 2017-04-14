import parseStack from './typeStack.js';

export default function(defs) {
    if (typeof defs !== 'string') {
        return false;
    }
    defs = defs.trim();
    if (defs[0] === '[' ||
        defs[0] === '{') {
            return parseStack(defs);
        }
    return defs;
}