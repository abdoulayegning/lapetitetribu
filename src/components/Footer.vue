<script setup> 

</script>

<template>
    <div class="wrapper">
        <div class="container">
            <div class="links">
                <div>INSTAGRAM</div>
                <div>VIMEO</div>
                <div>LINKEDIN</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper { 
    bottom: 2vh;
    border: 0px solid red;
    width: 100%;
}
.links {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.links div {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.45rem;
    padding-bottom: 0.2rem;
    margin: 0 1rem 0 1rem;
    background-color: white;
    border: 1px solid black;
    border-radius: 30px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
}

.links div:hover {    
    background-color: black;
    border: 1px solid white;
    color: white;
}
 

</style>