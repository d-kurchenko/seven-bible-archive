<template>
  <DynamicScroller
    :items="items"
    :min-item-size="54"
    key-field="rowid"
    style="min-height: 100px"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        buffer="20"
        :data-index="index"
      >
        <slot :item="item" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
