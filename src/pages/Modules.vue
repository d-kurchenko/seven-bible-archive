<template>
  <div class="fit flex d-column relative-position">
    <UILoader v-if="showLoader" />

    <div class="flex fit">
      <ModulesTabs @change-tab="onChangeTab" :active-tab="activeTab" />
      <q-separator vertical/>
      <ModulesTabsPanels :active-tab="activeTab" :modules-list="preparedModulesList[activeTab]" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, nextTick, ref, shallowRef } from 'vue';
import { Download, ModulesRegistry } from 'types/registry';
import UILoader from 'components/UI/UILoader.vue';
import { Modules } from 'types/modules';
import ModulesTabs from 'src/components/Modules/ModulesTabs.vue';
import ModulesTabsPanels from 'src/components/Modules/ModulesTabsPanels.vue';


interface ModulesList {
  [moduleType: string]: Download[];
}

const activeTab = ref(Modules.Bible)
const onChangeTab = (tab: Modules) => activeTab.value = tab

const showLoader = ref(false);

const modulesRegistry = shallowRef<ModulesRegistry>();

const fetchModulesRegistry = async () => {
  showLoader.value = true;
  modulesRegistry.value = await window.api.system.getModulesRegistry();
  nextTick(() => (showLoader.value = false));
};
fetchModulesRegistry();

const preparedModulesList = computed(() => {
  const modulesList: ModulesList = {
    commentaries: [],
    subheadings: [],
    dictionary: [],
    crossreferences: [],
    bible: [],
  };
  const downloads = modulesRegistry.value?.downloads!;
  if (!downloads) return modulesList;
  for (const module of downloads) {
    let moduleType = module.fil.split('.')[1];
    if (!moduleType) moduleType = Modules.Bible;
    if (!Object.values(Modules).includes(moduleType as Modules)) continue;
    modulesList[moduleType].push(module);
  }

  return modulesList;
});
</script>
