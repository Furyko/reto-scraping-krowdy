import { $ } from './selectors'

export async function waitForSelector(selector, intervalTime = 500, timeOut = 5000) {
    return new Promise((res, rej) => {
        let cont = 0
        const interval = setInterval(() => {
            cont++
            if(cont === timeOut/intervalTime + 1) {
                clearInterval(interval)
                rej(false)
            }
            if($(selector)) {
                clearInterval(interval)
                res(true)
            }
        }, 500)
    })
}
