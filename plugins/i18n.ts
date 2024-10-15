import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        locale: 'en',
        messages: {
            en: {
                "contact": "Send me a message !",
                "name": "Your name",
                "email": "Your email address",
                "content": "Your message",
                "send": "Submit",
                "more": "Learn more"
            },
            fr: {
                "contact": "Envoyez moi un message !",
                "name": "Votre nom",
                "email": "Votre adresse E-mail",
                "content": "Votre message",
                "send": "Envoyez",
                "more": "En savoir plus"
            }
        }
    })

    vueApp.use(i18n)
})