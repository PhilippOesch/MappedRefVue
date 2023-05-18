<script setup lang="ts">
import { mappedRef, MappedRefType } from 'mappedref-vue';
import { ref } from 'vue';

const a = ref(0);
const b = ref(0);

// initialize
const calculatorMapping: MappedRefType<string, string> =
    mappedRef('Nothing Calculated');

// create Mappings
calculatorMapping.set(
    'Add',
    () => `${a.value} + ${b.value} = ${a.value + b.value}`
);
calculatorMapping.set(
    'Subtract',
    () => `${a.value} - ${b.value} = ${a.value - b.value}`
);
calculatorMapping.set(
    'Multiply',
    () => `${a.value} * ${b.value} = ${a.value * b.value}`
);
</script>

<template>
    <h1>MappedRef Example</h1>
    <input v-model="a" type="number" placeholder="0" />
    <input v-model="b" type="number" placeholder="0" />
    <Button @click="calculatorMapping.keyRef = 'Add'">Add</Button>
    <Button @click="calculatorMapping.keyRef = 'Subtract'">Subtract</Button>
    <Button @click="calculatorMapping.keyRef = 'Multiply'">Multiply</Button>
    <h2>Result:</h2>
    <div>{{ calculatorMapping.valueRef }}</div>
</template>

<style scoped></style>
