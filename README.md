# MappedRef-Vue

This Library implements a mapped reference type. This may be very useful when you have multiple states and want to map between different display logics for your UI.

## Usage

First install the package through any package manager you like:

```bash
npm i mappedref-vue
```

Next, you have to define the reference which for example represents the state that you want to map from.

Don't forget the imports at the top:

```ts
import {mappedRef, MappedRefType } from 'mappedref-vue'
...
```

Let's imagine a small calculator. We have two input, *a* and *b*. Let's create references for these two inputs.

```ts
const a = ref(0);
const b = ref(0);
```

Next we create the two inputs within the template.
```html
<template>
   ...
   <input v-model="a" type="number" placeholder="0" />
   <input v-model="b" type="number" placeholder="0" />
   ...
</template>
```

Now we create the mapped reference and provide a default for when the mapping does not match. Also, we create the mapping logic itself.

```ts
// initialize
const calculatorMapping: MappedRefType<string, string> = mappedRef(
    'Nothing Calculated'
);

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
```

Let's extend our template with buttons to switch between the calculation methods. Additionally, we add the actual display of the result.

```html
<template>
    <h1>MappedRef Example</h1>
    <input v-model="a" type="number" placeholder="0" />
    <input v-model="b" type="number" placeholder="0" />
    <!-- New Buttons for switching -->
    <Button @click="calculatorMapping.keyRef = 'Add'">Add</Button>
    <Button @click="calculatorMapping.keyRef = 'Subtract'">Subtract</Button>
    <Button @click="calculatorMapping.keyRef = 'Multiply'">Multiply</Button>
    <!-- Result Display -->
    <h2>Result:</h2>
    <div>{{ calculatorMapping.valueRef }}</div>
</template>
```

## Other features

The *mappedRef* call will automatically create a reference for the key. Which can be set over the *keyRef* - Attribute. When you for example want to chain multiple different mappings to a single key-Reference, you can also define the reference outside the *mappedRef* call and then provide it as a parameter:

```ts
...
const calculationType = ref('Add')
const calculatorMapping: MappedRefType<string, string> = mappedRef(
    'Nothing Calculated',
    calculationType
);
...
```

