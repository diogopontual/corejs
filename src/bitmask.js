const bitmask = function () {
    if (arguments.length > 31)
        throw "The maximum number of constants is 31";
    let ret = Object.create(bitmaskProto);
    ret.state = 0;
    ret.variables = {};
    for (let i = 0; i < arguments.length; i++) {
        ret.variables[arguments[i]] = i;
    }
    ret.__proto__ = BitmaskPrototype;
    return ret;
};
const bitmaskProto = {
    set: function () {
        for (let i = 0; i < arguments.length; i++)
            this.state = this.state |= 1 << this.variables[arguments[i]];
    },
    unset: function () {
        for (let i = 0; i < arguments.length; i++)
            this.state = this.state &= ~(1 << this.variables[arguments[i]]);
    },
    toggle: function () {
        for (let i = 0; i < arguments.length; i++)
            this.state = this.state ^= 1 << this.variables[arguments[i]];
    },
    test: function (variable) {
        if (!variable)
            return this.list();
        return ((this.state >> this.variables[variable]) & 1) == 1;
    },
    list: function () {
        let ret = {};
        for (let v in this.variables) {
            ret[v] = this.test(v);
        }
        return ret;
    }
};
module.exports = bitmask;