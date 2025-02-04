export function random(num:number){
    let hash = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let ans=""
    //@ts-ignore
    for(let i=0;i<num;i++){
        ans += hash.charAt(Math.floor(Math.random() * hash.length))
    }
    return ans
}