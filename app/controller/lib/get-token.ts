
export const getToken = () =>{
    if(typeof window !== 'undefined'){
        let allCookies = document.cookie;
        let cookiesArray = allCookies.split(';');
        let wearableJwt = undefined;
        for (let i = 0; i < cookiesArray.length; i++) {
            let cookie = cookiesArray[i].trim();
            if (cookie.startsWith('wearable-jwt=')) {
            wearableJwt = cookie.substring('wearable-jwt='.length);
            break;
            }
        }
        return wearableJwt
    }
}
