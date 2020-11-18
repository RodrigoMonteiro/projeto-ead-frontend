import Vue from 'vue'
import VueToasted from 'vue-toasted'

Vue.use(VueToasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ops.. erro inesperado!' : payload.msg,
    { type: 'error', icon: 'times' }
)