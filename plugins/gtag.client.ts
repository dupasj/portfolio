import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const { gtagId } = useRuntimeConfig().public;

    function gtag() {
        // @ts-ignore
        window.dataLayer.push(arguments);
    }

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    gtag("js", new Date());
    // @ts-ignore
    gtag("config", gtagId);

    useHead({
        script: [
            {
                src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
                async: true,
            },
        ],
    });
});
