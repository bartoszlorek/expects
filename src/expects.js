/*
expects('string', 'failback')
expects('string|number')
expects('[string]')
expects('[string,number,number]')
expects('{product:string, price:number}')
*/

import getStructure from './structure.js';

console.log(getStructure)
    

function parseQuery(query) {
    query = query.trim();

    if (query[0] === '[' ||
        query[0] === '{') {
        var data = getStructure(query);

        console.log(data)
    }
}

parseQuery('[ string, [string|number] ]');
parseQuery('{ name:string, price:{ dog:string|number} }');
