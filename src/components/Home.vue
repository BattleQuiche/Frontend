<template>
    <nav id="Main-menu">
        <ul class="menu">
            <li>
                <router-link :to="{ name: 'StartGame' }">
                    Start a game
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Home"
};
</script>