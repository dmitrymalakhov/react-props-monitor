/**
 * @author Dmitry Malakhov
 */

'use strict';

export const noop = () => {};

export const camelize = str => str.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (letter, index) => index == 0 ? letter.toLowerCase() : letter.toUpperCase()
).replace(/\s+/g, '');