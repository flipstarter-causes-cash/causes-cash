<script setup lang="ts">
/* Import modules. */

/* Initialize stores. */
import { useRainmakerStore } from '@/stores/rainmaker'
const Rainmaker = useRainmakerStore()

const username = ref(null)
const displayName = ref(null)
const nexaAddress = ref(null)

const addProfile = async () => {
    if (!nexaAddress.value) {
        return alert(`Oops! You forgot to enter a Nexa address.`)
    }

    /* Initialize locals. */
    let response

    /* Request rainmaker profile. */
    response = await $fetch('/api/rainmaker/profile', {
        method: 'POST',
        body: {
            campaign: Rainmaker.campaign,
            // network: Rainmaker.network,
            address: nexaAddress.value,
        },
    })
    .catch(err => console.error(err))
    console.log('ADD PROFILE (response):', response)

    /* Reset form. */
    reset()
}

const reset = () => {
    /* Clear inputs. */
    username.value = null
    displayName.value = null
    nexaAddress.value = null
}

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
        Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
                <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 border-2 border-amber-300 shadow">
                            <svg class="h-10 w-auto text-amber-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                            </svg>
                        </div>

                        <div class="mt-3 text-center sm:mt-5 flex flex-col gap-4">
                            <h3 class="text-2xl font-semibold leading-6 text-gray-900" id="modal-title">
                                Add Telegram Profile
                            </h3>

                            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                                <div class="sm:col-span-6">
                                    <input
                                        type="text"
                                        v-model="nexaAddress"
                                        placeholder="(required) enter a nexa: address"
                                        class="px-3 py-2 w-full text-lg block w-full rounded-md border border-indigo-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                    />
                                </div>

                                <div class="sm:col-span-3">
                                    <input
                                        type="text"
                                        v-model="username"
                                        placeholder="(optional) username"
                                        class="px-3 py-2 w-full text-lg block w-full rounded-md border border-indigo-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                    />
                                </div>

                                <div class="sm:col-span-3">
                                    <input
                                        type="text"
                                        v-model="displayName"
                                        placeholder="(optional) display name"
                                        class="px-3 py-2 w-full text-lg block w-full rounded-md border border-indigo-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                            @click="addProfile"
                            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-2xl font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        >
                            Submit
                        </button>

                        <button
                            @click="reset"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-2xl font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        >
                            Reset
                        </button>

                        <button
                            @click="$emit('close')"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-rose-400 px-3 py-2 text-2xl font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-rose-300 sm:col-start-1 sm:mt-0"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
