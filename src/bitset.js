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
        return (this.arr[Math.trunc(idx / 8)] & 1 << (idx % 8)) > 0;
    },
    set: function (idx) {
        this.arr[Math.trunc(idx / 8)] |= 1 << (idx % 8);
        return this;
    },
    unset: function (idx) {
        this.arr[Math.trunc(idx / 8)] &= 1 << ~(idx % 8);
        return this;
    },
    compress: function (zeroLength = 4) {
        let ret = []
        let oneLength = 8 - zeroLength, zeroMax = Math.pow(2,zeroLength) - 1, oneMax = Math.pow(2,oneLength) - 1, current = this.get(0), last = current, count = 0, byte = 0;
        for (let i = 0; i < this.length; i++) {
            current = this.get(i);
            console.log(current);
            if(current != last){
                if(last){
                    count = count << zeroLength;
                }
                byte |= count;
                ret.push(byte);
                count = 0;
            }
            count++;
            current = last;
        } 
        ret.push(byte);
        return ret;
    },
    toString: function () {
        let r = '';
        for (let i = 0; i < this.length; i++) {
            r += this.get(i) ? 1 : 0;
        }
        return r;
    }
};

let b = bitset(16);
b.set(7)
b.unset(7)
b.set(15)
console.log(b.compress());