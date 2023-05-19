import { Ref, computed, reactive, ref } from 'vue';
import type MappedRefType from './MappedRefType';

/**
 * create a mapped reference
 * @param defaultReturn The default value to display when the key does not exist
 * @param reference The reference to use as key
 * @returns A MappedRefType
 */
export default function mappedRef<TypeKey, TypeValue>(
    defaultReturn: any,
    reference: Ref<TypeKey | undefined> = ref(undefined)
): MappedRefType<TypeKey, TypeValue> {
    const refMap: Map<TypeKey, () => TypeValue> = new Map();

    const mappedValue = computed(() => mapToRef(reference.value));

    /**
     * Maps the value of the reference to the output
     * @param key The key to map
     * @returns
     */
    function mapToRef(key: TypeKey | undefined) {
        if (key !== undefined && refMap.has(key)) {
            return refMap.get(key)!();
        }
        return defaultReturn;
    }

    return reactive({
        keyRef: reference,
        valueRef: mappedValue,
        set: (key: TypeKey, value: () => TypeValue) => refMap.set(key, value),
    });
}
