import { readFile } from 'fs/promises';
//Promiseの静的メソッド2-2 .race
//.raceは最初に解決したPromiseの結果を受け取る（成功か失敗かは関係なく、解決したもの）
//タイムアウト処理に使える

const sleepReject = (duration: number) => {
    return new Promise<never>((resolve, reject) => {
        setTimeout(reject, duration);
    });
};

const p = Promise.race([
    readFile('data/foo.txt', 'utf-8').catch((error: unknown) => {
        console.log('data/foo.txt');
        console.log(error);
    }),
    readFile('data/bar.txt', 'utf-8').catch((error: unknown) => {
        console.log('data/bar.txt');
        console.log(error);
    }),
    sleepReject(100),
]);

p.then(
    (result) => {
        console.log(result);
    },
    (error: unknown) => {
        console.log('失敗');
        console.log(error);
    }
);
