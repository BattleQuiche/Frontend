<template>
    <nav id="Main-menu">
        <ul class="menu">
            <li>
                <router-link :to="{ name: 'StartGame' }">
                <!-- <NavLink :active="isActive" :href="href" @click="navigate">Hello</NavLink> -->
                    Start a game
                </router-link>
            </li>
            <!-- <li>
                <router-link :to="{ name: 'startGame' }" class="Profile_link"
                            data-title="Home">
                    
                            test
                </router-link>
            </li> -->
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Home"
};
</script>