<template>
    <div class="content-container">
        <div class="text-block">
            <h1>Contact Me</h1>
            <p>I'm keen to connect with like-minded individuals or anyone interested in tech and innovation. Feel free
                to reach out!</p>
            <ul>
                <!-- Attach click listeners that call testNavigation -->
                <li>Email: <a href="mailto:ssamandeep2000@gmail.com">ssamandeep2000@gmail.com</a></li>
                <li>Phone: +917906880033</li>
                <li>Website: <a href="http://www.samandeepsingh.in" target="_blank"
                        @click="testNavigation">www.samandeepsingh.in</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/samandeep-singh-aa373a171" target="_blank"
                        @click="testNavigation">linkedin.com/in/samandeep-singh-aa373a171</a></li>
                <li>GitHub: <a href="https://github.com/SinghSamandeep" target="_blank"
                        @click="testNavigation">github.com/SinghSamandeep</a>
                </li>
                <li>CV: <a href="../resume/samandeep_resume.pdf" target="_blank" @click="testNavigation">CHECK MY CV</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const testNavigation = (event) => {
    // Prevent the default link behavior for diagnostic purposes
    event.preventDefault();
    console.log('Link clicked:', event.target.href);
    // Explicitly open the URL in a new tab
    window.open(event.target.href, '_blank');
};


</script>

<style scoped>
@import "../assets/scrollContent.css";

.contact-me {
    padding: 20px;
}

.contact-me ul {
    list-style: none;
    padding: 0;
}
</style>
