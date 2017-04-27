import types from './types.js';
import error from './error.js';

const ANY_TYPE = '*';

export default function(context) {
    if (! (context && types.isFunction(context.typeof))) {
        throw 'incorrect context of comparison';
    }

    const binary = {
        '|': (a, b, value) =>
             testOperand(a, value) ||
             testOperand(b, value),

        '&': (a, b, value) =>
             testOperand(a, value) &&
             testOperand(b, value)
    };

    function testOperand(operand, value) {
        if (types.isString(operand)) {
            return context.is(operand, value);
        } return !!operand;
    }

    function getOperand(operand, value) {
        if (!types.isString(operand)) {
            return compareBinary(operand, value);
        } return operand;
    }

    function compareBinary(block, value) {
        let binaryMethod = binary[block[1]];
        if (!types.isUndefined(binaryMethod)) {
            let left  = getOperand(block[0], value),
                right = getOperand(block[2], value);
            return binaryMethod(left, right, value);
        }
    }

    function getFallback(operand) {
        if (!types.isString(operand)) {
             return blockFallback(operand);
        } return context.fallback(operand);
    }

    function blockFallback(block) {
        let left = getFallback(block[0]);
        if (types.isUndefined(left)) {
            return getFallback(block[2]);
        } return left;
    }

    return function compare(block, value) {
        let blockType = block.type,
            blockValue = block.value;

        if (blockType === 'value') {
            if (types.isString(blockValue)) {
                return context.filter(blockValue, value);
            }
            if (types.isArray(blockValue)) {
                if (compareBinary(blockValue, value)) {
                    return value;
                }
                let fallback = blockFallback(blockValue);
                if (types.isUndefined(fallback)) {
                    error('expects')(block.expression, value);
                }
                return fallback;
            }
        }

        if (blockType === 'array') {
            context.filter('array', value);
            let valueLength = value.length,
                i = 0;

            if (blockValue.length > 1) {
                let last = blockValue.length-1;
                while (i < valueLength) {
                    value[i] = compare(blockValue[i] || blockValue[last], value[i]);
                    i += 1;
                }
            } else {
                let monoValue = blockValue[0];
                if (monoValue.value !== ANY_TYPE) {
                    while (i < valueLength) {
                        value[i] = compare(monoValue, value[i]);
                        i += 1;
                    }
                }
            }
            return value;
        }
        
        if (blockType === 'object') {
            context.filter('object', value);
            let props = blockValue.map(item => item.prop),
                propsLength = props.length,
                prop,
                i = 0;
 
            if (props[0] === ANY_TYPE) {
                return value;
            }
            while (i < propsLength) {
                prop = props[i];
                if (!value.hasOwnProperty(prop)) {
                    return `given object doesn't have \`${prop}\` property.`;
                }
                if (blockValue[i].value !== ANY_TYPE) {
                    value[prop] = compare(blockValue[i], value[prop]);
                }
                i += 1;
            }
            return value;
        }
    }
}