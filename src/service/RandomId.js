export const randomId = (lengthItem) => {
    if (!lengthItem) lengthItem = 30;
    const alph = "abcdefghijklmnopqrstuvwxyz";
    const nums = "1234567890";
    const symb = "-_";
    const arrPar = [alph, nums];
    const rand = (lengthSym = 10) => Math.floor(Math.random() * lengthSym) + 1;
    let strRand = "";
    for (let i = 0; i < lengthItem; i++) {
        let randSymb;
        if(i !== 0 && i % 9 === 0) {
            randSymb = symb[rand(symb.length) - 1]
        } else {
            const randItem = arrPar[rand(arrPar.length) - 1];
            randSymb = randItem[rand(randItem.length) - 1];
            if (randItem.at(-1) === 'z') {
                if (rand(2) === 2) randSymb = randSymb.toUpperCase();
            }
        }
        
        strRand += randSymb;
    }
    return strRand;
};