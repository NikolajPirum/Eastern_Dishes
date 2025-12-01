<script>
    import { fetchGet } from '../../../util/fetchUtil.js';
    import { loggedIn } from '../../store/isLoggedInStore.js';
    import { navigate } from 'svelte-routing';
    import toastr from "toastr";
    import { onMount } from 'svelte';
    import Dishes from '../Dishes/Dishes.svelte';
    import SignOut from '../Login/SignOut.svelte';

    //komponenter mountes hvis: komponent ligger i root(app.svelte), if statement er true, eller når Route matcher. hvis komponenten fjernes fra DOM kører onDestroy
    onMount(async () => { 
        try {
            const result = await fetchGet("/api/home");
            if (!result.success) {
                loggedIn.set(false);
                toastr.error("You need to login");
                navigate("/");
            } else {
                loggedIn.set(true);
            }
        } catch (err) {
            loggedIn.set(false);
            navigate("/");
        }
    });
</script>

<h2>Velkommen til Eastern Dishes</h2>
                        
<!-- child komponent -->
<Dishes/>


