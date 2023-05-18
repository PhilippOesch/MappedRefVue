# MappedRef-Vue

This Library implements a mapped reference type. This may be very usefull when you have multiple states and want to map between different display logics for your UI.

## Usage

First you have to define the reference which for example represents the state that you want to map from.

```ts
const state = ref();
```

Dont forget the import at the top:

```ts
import {mappedRef, MappedRefType } from 'mappedref-vue'
...
```

Then you can define your Mapping Logic. Let's imagine a small calculator. We have two input, *a* and *b*. Let's create references for these two inputs 

```ts
const a = ref(0);
const b = ref(0);
```

Next we create the two inputs within the template
```html
<template>
   ...
   <input v-model="a" type="number" placeholder="0" />
   <input v-model="b" type="number" placeholder="0" />
   ...
</template>
```

Now we create the mapped referenc and provide the state referenc for the mapping. Also we create the Mappings themself.

```ts
// initialize
const mappedReference: MappedRefType<string, string> = mappedRef(
    'Nothing Calculated',
    stateRef
);

// create Mappings
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
```

Let's extend our template with button to switch between the calculation methods. Additionally we add the actual display of the result.

```html
<template>
    <h1>MappedRef Example</h1>
    <input v-model="a" type="number" placeholder="0" />
    <input v-model="b" type="number" placeholder="0" />
    <!-- New Buttons for switching -->
    <Button @click="stateRef = 'Add'">Add</Button>
    <Button @click="stateRef = 'Subtract'">Subtract</Button>
    <Button @click="stateRef = 'Multiply'">Multiply</Button>
    <!-- Result Display -->
    <h2>Result:</h2>
    <div>{{ mappedReference.valueRef }}</div>
</template>
```

