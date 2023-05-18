<script setup lang="ts">
import { mappedRef, MappedRefType } from 'mappedref-vue';
import { ref } from 'vue';

const stateRef = ref();

const a = ref(0);
const b = ref(0);

const mappedReference: MappedRefType<string, string> = mappedRef(
    'Nothing Selected',
    stateRef
);
mappedReference.set(
    'Add',
    () => `${a.value} + ${b.value} = ${a.value + b.value}`
);
mappedReference.set(
    'Subtract',
    () => `${a.value} - ${b.value} = ${a.value - b.value}`
);
mappedReference.set(
    'Multiply',
    () => `${a.value} * ${b.value} = ${a.value * b.value}`
);
</script>

<template>
    <h1>MappedRef Example</h1>
    <input v-model="a" type="number" placeholder="0" />
    <input v-model="b" type="number" placeholder="0" />
    <Button @click="stateRef = 'Add'">Add</Button>
    <Button @click="stateRef = 'Subtract'">Subtract</Button>
    <Button @click="stateRef = 'Multiply'">Multiply</Button>
    <h2>Result:</h2>
    <div>{{ mappedReference.valueRef }}</div>
</template>

<style scoped></style>
