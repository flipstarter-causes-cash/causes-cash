/* Import stores. */
import { useProfileStore } from '@/stores/profile'
// import { useSystemStore } from '@/stores/system'

export default defineNuxtRouteMiddleware(async (to, from) => {
    // NOTE: We skip middleware on server.
    if (process.server) return

    /* Initialize stores. */
    const Profile = useProfileStore()
    // const System = useSystemStore()

    /* Initialize locals. */
    let session

    // NOTE: Manage (non-blocking) sessions.
    // ;(async () => {
        /* Manage session. */
        session = await $fetch('/api/session', {
            method: 'POST',
            body: { sessionid: Profile.sessionid },
        })
        console.log('GLOBAL SESSION', session)

        /* Update (client-side) session. */
        /* Sanitize client-side session. */
        session = {
            id: session?._id,
            ...session,
        }

        delete session._id
        delete session._rev

        /* Save session. */
        Profile.saveSession(session)
    // })()
})
