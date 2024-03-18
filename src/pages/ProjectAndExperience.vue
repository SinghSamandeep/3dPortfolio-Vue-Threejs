<template>
    <div class="content-container">
        <div class="text-block">
            <section class="projects">
                <h2>Projects</h2>

                <div class="project">
                    <h3>Watch Ecommerce - FullStack Project (Vue 3, Node.js, and Spring Boot)</h3>
                    <p>Duration: 1 Month</p>
                    <p>A comprehensive e-commerce platform developed using Vue 3 for the frontend, Spring Boot for
                        backend operations, and Node.js for server logic. The platform features distinct admin and
                        client sides, enhancing user experience and administrative control.</p>
                </div>
                <div class="project">
                    <h3>3D Portfolio Project (Vue.js and Three.js)</h3>
                    <p>Duration: 15 Days</p>
                    <p>A personal portfolio developed with Vue.js and Three.js, showcasing advanced web technologies and
                        3D graphics. This project demonstrates the use of mesh material, shadows, and rotation to create
                        an interactive and visually appealing online presence.</p>
                </div>
                <div class="project">
                    <h3>World Of Oceans - Game Development (C# and Unity)</h3>
                    <p>Duration: 1 year</p>
                    <p>A captivating mobile game that integrates GEO location technology and device orientation, set in
                        the 17th-century Caribbean focused on naval warfare. The game provides a unique and immersive
                        experience, drawing players into a meticulously crafted world of adventure and strategy.</p>
                    <p>Technologies Used: Unity, Inkscape, C#, Figma, Krita, Blender</p>
                </div>
            </section>

            <section class="experience">
                <h2>Experience</h2>
                <div class="job">
                    <h3>Software Engineer at Pharmeasy</h3>
                    <p>Duration: 09/2022 - 08/2023</p>
                    <ul>
                        <li>Played a key role in the Phlebotomy team, leveraging .NET, Spring Boot, and Nest.js
                            frameworks, along with managing Django, PostgreSQL, and MySQL databases.</li>
                        <li>Instrumental in automating the Phlebotomy operational system, achieving a 93% reduction in
                            daily on-call requests.</li>
                        <li>Unified backend codebase, enhancing maintainability and operational efficiency.</li>
                    </ul>
                </div>
                <div class="job">
                    <h3>Software Engineer Intern at Pharmeasy</h3>
                    <p>Duration: 03/2022 - 07/2022</p>
                    <ul>
                        <li>Contributed to the enhancement of the product by implementing new features and resolving
                            bugs.</li>
                        <li>Developed and modified APIs to facilitate business integrations.</li>
                    </ul>
                </div>
            </section>
        </div>
    </div>

</template>
<script setup>

</script>
<style scoped>
@import "../assets/scrollContent.css";

.projects h2,
.experience h2 {
    margin-top: 0;
}

.project,
.job {
    margin-bottom: 20px;
}

ul {
    list-style-type: disc;
    margin-left: 20px;
}
</style>