<template>
    <div>
        <h3>Key</h3>
        <div>{{key1}}</div>
    </div>
    <div>
        <h3>Key</h3>
        <div>{{key2}}</div>
    </div>
</template>

<script setup>
import { GenerateAesKey,GenerateAesKey2 } from '@/services/CryptoService.js';

const key1 = ref("");

const key2 = ref("");

(async () => {
    key1.value = await GenerateAesKey();
    key2.value = GenerateAesKey2();
})();

</script>

<style scoped>

</style>