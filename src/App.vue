<template>
    <n-config-provider :theme="darkTheme">
        <WindowProvider>
            <div>
                <!-- <PreLogin :url="'localhost:6000'"/>
                <PreLogin :url="'133.0.109.189:29964'"/>
                <Client></Client> -->
                <TOTPTest></TOTPTest>
            </div>
        </WindowProvider>
    </n-config-provider>
</template>
<script setup>
import { darkTheme } from 'naive-ui'

</script>

<style scoped></style>
