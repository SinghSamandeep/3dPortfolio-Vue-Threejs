<template>
    <div class="welcome-overlay">
        <div class="welcome-message">
            <h2>Welcome to the World of Wizard</h2>
            <p>You can just look around. If you want to know more about me, select the scroll.</p>
            <button @click="showWelcomeMessage = false">Explore</button>
        </div>
    </div>
</template>
<style>
.welcome-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.85);
    color: #fff;
}

.welcome-message {
    text-align: center;
    max-width: 600px;
    padding: 20px;
    border: 2px solid #f8e9a1;
    border-radius: 15px;
    background-color: #000c;
}

.welcome-message h2 {
    margin-top: 0;
    color: #f8e9a1;
    font-family: 'Tangerine', cursive;
    font-size: 3em;
}

.welcome-message p {
    color: #aaa;
    font-size: 1.2em;
}

.welcome-message button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1em;
    color: #000;
    background-color: #f8e9a1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.welcome-message button:hover {
    background-color: #e8d991;
}
</style>