<template>
  <UIWorkPlaceWindow>
    <UIWorkPlaceWindowHeader>
      <StrongTopBar
        :strong-numbers="strong.strongNumbers"
        :strong-file-name="strong.fileName"
      />
    </UIWorkPlaceWindowHeader>

    <UIWorkPlaceWindowBody>
      <StrongBody
        :strong-numbers="strong.strongNumbers"
        :strong-file-name="strong.fileName"
      />
    </UIWorkPlaceWindowBody>
  </UIWorkPlaceWindow>
</template>
<script>
import UIWorkPlaceWindow from 'components/UI/WorkPlaceWindow/UIWorkPlaceWindow.vue'
import UIWorkPlaceWindowHeader from 'components/UI/WorkPlaceWindow/UIWorkPlaceWindowHeader.vue'
import UIWorkPlaceWindowBody from 'components/UI/WorkPlaceWindow/UIWorkPlaceWindowBody.vue'
import StrongTopBar from './strongTopBar.vue'
import StrongBody from 'components/Main/strong/StrongBody.vue'

import useSevenBible from 'src/hooks/useSevenBible'
import useStore from 'src/hooks/useStore'
import { useStrongDatabaseConnection } from 'src/hooks/DBconnectionController'
import { computed } from 'vue'

export default {
  components: {
    UIWorkPlaceWindowBody,
    UIWorkPlaceWindowHeader,
    UIWorkPlaceWindow,
    StrongTopBar,
    StrongBody,
  },
  setup() {
    const { id } = useSevenBible()
    const store = useStore()
    const strong = store.state.getReactive(`workPlace.${id}.strong`)
    const strongFilename = computed(() => strong.value.fileName)
    useStrongDatabaseConnection(strongFilename)

    // if (!props.strongFileName || !props.strongFileName.length) {
    //   console.log('sd')
    //   const firstModuleName = window.api.system.getFirstExistsModuleName(['modules', 'dictionaries', 'strong'])
    //   store.state.set(`workPlace.${id}.strong.fileName`, firstModuleName)
    // }
    return {
      strong,
    }
  },
}
</script>
