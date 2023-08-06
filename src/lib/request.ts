export default async function request(input: RequestInfo | URL, init?: RequestInit) {

    return fetch(input, init).then(
        res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(null)
            }
        }
    )
}