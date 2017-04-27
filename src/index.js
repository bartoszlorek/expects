import parse from './parse.js';
import methods from './methods.js';
import types, { forEachType } from './types.js';
import createCompare from './compare.js';
const compare = createCompare(methods);

forEachType((name, test) => {
    methods.define(name, test);
});

function expects(expr, value) {
    if (!types.isString(expr)) {
        throw 'first parameter must be an expression'
    }
    return compare(
        parse(expr),
        value
    );
}

module.exports = Object.assign(
    expects,
    methods
);