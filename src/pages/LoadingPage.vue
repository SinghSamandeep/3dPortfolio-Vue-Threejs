<template>
    <div class="loading-overlay">
        <div class="loader">
            <img src="../assets/magic_circle.png" class="magic-circle" alt="Magic Circle" />
            <p>Loading enchantments...</p>
        </div>
    </div>
</template>

<script setup>
// Add script setup if needed
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
    background-image: url('../assets/wizardbg.png');
    background-size: cover;
    background-position: center;
}

.loader {
    text-align: center;
}

.loader p {
    color: #f8e9a1;
    font-family: 'Tangerine', cursive;
    font-size: 2em;
    margin-top: 20px;
}

.magic-circle {
    width: 150px;
    height: 150px;
    animation: spin 5s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
