import { ComputedRef } from 'vue';

/**
 * A Mapped Reference Type
 */
interface MappedRefType<TypeKey, TypeValue> {
    /**
     * The Key value
     */
    keyRef?: TypeKey | undefined;
    /**
     * The actual reference
     */
    valueRef: ComputedRef<TypeValue>;

    /**
     * Register a mapping
     * @param key The key
     * @param value The value to map to
     */
    set: (key: TypeKey, value: () => TypeValue) => void;
}

export default MappedRefType;
