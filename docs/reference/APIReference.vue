<script setup>
defineProps(['data']);
</script>

<template>
  <h1>{{ data.name }}</h1>

  <div v-html="data.description" />

  <h2>Signature</h2>

  <div v-html="data.functionSignatures" />

  <h3>Parameters</h3>

  <div v-html="data.param" />

  <h3>Returns</h3>

  <div v-html="data.returns" />

  <h3 v-if="data.throws">Throws</h3>

  <div v-html="data.throws" />

  <h2>Examples</h2>

  <div v-html="data.example" />
</template>
