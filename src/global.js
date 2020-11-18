import Vue from 'vue'
export const baseApiUrl = 'http://localhost:3000'
export const userKey = 'projeto_ead'


// Necessário casa aconteça um erro no qual a mensagem esteja dentro do res.data, sendo necessaio setar isso no msg
export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e ==='string'){
        Vue.toasted.global.defaultError({ msg: e })

    } else{
        Vue.toasted.global.defaultError()
    }
}

export default{baseApiUrl, showError, userKey}