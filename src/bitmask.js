/*************************************************************************
 * @description
 * A bitmask utility. Can hold the true or false state for up to 31 variables;
 * Usage:
 * 
 * let bm = bitmask('tall','kind','beautifull');
 * bm.set('tall');
 * bm.test('tall');
 * 
 * @author
 * Diogo Dauster Pontual (diogopontual@gmail.com)
 *
 *************************************************************************/
const bitmask = function () {
    if (arguments.length > 31)
        throw "The maximum number of constants is 31";
    let ret = Object.create(bitmaskProto);
    ret._state = 0;
    ret._variables = {};
    for (let i = 0; i < arguments.length; i++) {
        ret._variables[arguments[i]] = i;
    }
    return ret;
};
const bitmaskProto = {
    set: function () {
        for (let i = 0; i < arguments.length; i++)
            this._state = this._state |= 1 << this._variables[arguments[i]];
        return this;
    },
    unset: function () {
        for (let i = 0; i < arguments.length; i++)
            this._state = this._state &= ~(1 << this._variables[arguments[i]]);
        return this;
    },
    toggle: function () {
        for (let i = 0; i < arguments.length; i++)
            this._state = this._state ^= 1 << this._variables[arguments[i]];
        return this;
    },
    test: function (variable) {
        if (!variable)
            return this.list();
        return ((this._state >> this._variables[variable]) & 1) == 1;
    },
    state: function () {
        let ret = {};
        for (let v in this._variables) {
            ret[v] = this.test(v);
        }
        return ret;
    }
};
module.exports = bitmask;