/*************************************************************************
 * @description
 * An set of bits;
 * Usage:
 * 
 * @author
 * Diogo Dauster Pontual (diogopontual@gmail.com)
 *************************************************************************/
const bitset = function (length) {
    let ret = Object.create(bitsetProto);
    ret.actualLength = length + (8 - length % 8);
    ret.length = length;
    ret.arr = new Uint8Array(ret.actualLength / 8);
    return ret;
}
const bitsetProto = {
    get: function (idx) {
        return (this.arr[Math.trunc(idx / 8)] & 1 << (idx % 8));
    },
    set: function (idx) {
        this.arr[Math.trunc(idx / 8)] |= 1 << (idx % 8);
        return this;
    },
    unset: function (idx) {
        this.arr[Math.trunc(idx / 8)] &= 1 << ~(idx % 8);
        return this;
    },
    compress: function (wordLength = 4) {},
    toString: function(){
        let r = '', z = 0, o = 0;
        for (let i = 0; i < this.length; i++) {
            r += this.get(i) ? 1 : 0;
        }
        return r;
    }
};