<template>
    <div class="welcome-overlay">
        <div class="welcome-message">
            <h2>Welcome to the Wizard's Realm</h2>
            <p>Take a glimpse into the arcane. Should you wish to learn more of my tale, seek the enchanted scrolls.</p>
            <button @click="showWelcomeMessage = false">Begin Your Journey</button>
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
    background: rgba(0, 0, 0, 0.85);
    background-blend-mode: overlay;
    color: #fff;
}

.welcome-message {
    text-align: center;
    max-width: 600px;
    padding: 30px;
    border: 3px solid #f8e9a1;
    border-radius: 15px;
    background-color: rgba(48, 30, 60, 0.9);
    /* Dark purple background */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    /* Soft box shadow for depth */
}

.welcome-message h2 {
    margin-top: 0;
    color: #f8e9a1;
    font-family: 'Enchanted Land', cursive;
    /* A magical-themed font */
    font-size: 3em;
}

.welcome-message p {
    color: #ddd;
    font-family: 'Cinzel', serif;
    /* A font that complements magical themes */
    font-size: 1.3em;
    line-height: 1.6;
}

.welcome-message button {
    margin-top: 20px;
    padding: 12px 25px;
    font-size: 1.2em;
    font-family: 'Cinzel', serif;
    color: #301e3c;
    background-color: #f8e9a1;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.welcome-message button:hover {
    background-color: #e8d991;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
