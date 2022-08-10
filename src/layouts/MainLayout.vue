<template>
  <q-layout :style="font" class="flex d-column fit">
    <SystemBar @toggleDrawer="visibleRight = !visibleRight" />
    <div class="flex col">
      <div class="layout-main fit min-w-0">
        <router-view />
      </div>

      <SideMenu :visibleRight="visibleRight" />
    </div>
  </q-layout>
</template>

<script>
import { ref, computed, getCurrentInstance } from 'vue';
import { useStore } from 'src/store';
import SystemBar from 'components/SystemBar';
import SideMenu from 'components/SideMenu';
import useTheme from 'src/hooks/useTheme';

export default {
  setup() {
    const visibleRight = ref(true);

    const store = useStore();
    const app = computed(() => store.getters['settings/app']);

    const font = computed(() => ({
      fontFamily: `${app.value.appearance.font}, sans-serif`,
    }));

    const { setTheme } = useTheme();
    setTheme(app.value.appearance.theme);

    const stringify = (state) => JSON.stringify(state, null, 2);
    const saveProgramSettings = (state) =>
      window.api.system.saveProgramSettings(stringify(state));

    const changeAppSettings = (settings) =>
      store.commit('settings/changeAppSettings', settings);

    const saveProgramState = async () => {
      const bounds = await window.api.electron.getWindowBounds();
      changeAppSettings({ win: bounds });
      saveProgramSettings(store.state.settings);
    };

    setInterval(() => {
      saveProgramState();
      console.log('saved');
    }, 60000 * 5);

    window.api.electron.onCloseApp(async () => {
      await saveProgramState();
      window.api.electron.closeApp();
    });

    return {
      visibleRight,
      app,
      font,
    };
  },
  components: {
    SystemBar,
    SideMenu,
  },
};
</script>
