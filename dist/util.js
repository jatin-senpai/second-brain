"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(num) {
    let hash = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let ans = "";
    //@ts-ignore
    for (let i = 0; i < num; i++) {
        ans += hash.charAt(Math.floor(Math.random() * hash.length));
    }
    return ans;
}
