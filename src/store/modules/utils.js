/* Import libraries. */
// import telr from '../../api/telr'

/* Import modules (getters). */
import getCompletedPct from './utils/getters/getCompletedPct'
import getFormatFunded from './utils/getters/getFormatFunded'
import getShuffledArray from './utils/getters/getShuffledArray'

/* Import modules (actions). */
// ...

/* Import modules (mutations). */
// ...

/* Initialize state. */
const state = {
    //
}

/* Getters. */
const getters = {
    getCompletedPct,
    getFormatFunded,
    getShuffledArray,
}

/* Actions. */
const actions = {
    //
}

/* Mutations. */
const mutations = {
    //
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
