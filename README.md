# expects
Easy to use declarative variable testing for given types, structures or customs. Allows defining and composing methods in functional programming style by syntax based on JavaScript Object notation.

## Syntax
rules:
- the expression is always a string value
- white spaces are for readability purposes
- "|" and "&" are proper logical operators
- allow multidimensional data structures
- object property without value gets type of "any"
- array without values gets type of "any"
- item gets last method when its index is over length
- don't use quotation marks

examples:
```javascript
string
string | number
number & even // even is a custom method

array // with any items
[] // or just like that
[ array | object ] // for each item
[ string, number ] // only first item should be a string

{ name: string, price: number } // also property exists
{ dog, cat: string } // any dog's value
{ store: string, products: [] }
```

## Usage
