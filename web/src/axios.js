export default (token) => {
    return {headers: {Authorization: `Bearer ${token}`}};
}