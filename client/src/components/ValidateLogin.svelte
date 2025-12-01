<script>
    import { loggedIn } from '../store/isLoggedInStore.js';
    import { navigate } from 'svelte-routing';
    import { onMount } from 'svelte';

    export let component; //denne variable kommer til at indeholde komponenter fra mappen /pages

    onMount(() => {
        if (!$loggedIn) {
            navigate("/");
        }
    });
</script>
<!-- rendere/viser komponeter dynamisk baseret på "component" -->
{#if $loggedIn}
    <svelte:component this={component} />
{/if}
