import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUp, faAsterisk, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

library.add(faAsterisk, faInstagram, faLinkedinIn, faArrowUp, faChevronUp)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
