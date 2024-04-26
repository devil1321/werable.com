
export const getToken = () =>{
    if(typeof window !== 'undefined'){
        const token = localStorage.getItem('jwt')
        return token
    }
}
