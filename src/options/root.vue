<template lang="html">
    <div class="options">
      <at-checkbox
        v-model="showItemType"
        label="Show Item Type"
      >
        Show Item Type
      </at-checkbox>
    </div>
</template>
<script>
  export default {
    data: () => ({
      showItemType: true
    }),
    computed: { },
    created () { },
    mounted () { },
    methods: { }
  }
</script>
<style>
  .options {
    max-width: 800px;
    margin: 50px auto;
  }
</style>
