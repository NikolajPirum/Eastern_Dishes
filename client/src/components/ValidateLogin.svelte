<script>
    import { loggedIn } from '../store/isLoggedInStore.js';
    import { navigate } from 'svelte-routing';
    import { onMount } from 'svelte';

    export let component; // komponent fra mappen /pages

    onMount(() => {
        if (!$loggedIn) {
            navigate("/");
        }
    });
</script>
<!-- rendere komponenter dynamisk -->
{#if $loggedIn}
    <svelte:component this={component} />
{/if}
