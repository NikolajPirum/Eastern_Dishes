<script>
    import { Router, Route, navigate, Link } from 'svelte-routing';
    import Login from './pages/Login/Login.svelte';
    import Home from './pages/Home/Home.svelte';
    import { fetchGet } from '../util/fetchUtil.js';
    import ValidateLogin from './components/ValidateLogin.svelte';
    import { loggedIn } from './store/isLoggedInStore.js'
    import SignOut from './pages/Login/SignOut.svelte';
    import Recipes from './pages/Recipes/Recipes.svelte';
    import UploadDish from './pages/Dishes/UploadDish.svelte';
    import LiveChat from './components/LiveChat.svelte';
    import { isAdmin } from './store/isAdmin.js';
    import UserAdministration from './pages/UserAdministration/UserAdministration.svelte';
    import { onMount } from 'svelte';


    onMount(async () => {
        try {
                const data = await fetchGet("/api/session");
        
            if (data.userId) {
                loggedIn.set(true);
                isAdmin.set(data.role === "ADMIN");
            }
        }catch(error) {
            console.error("kunne ikke tjekke sesssion", error);
        }
    });
</script>

<Router>

    {#if $loggedIn}
        <nav>
            <Link to="/home">
                <img src="/eastern_dishes_logo.png" alt="Home" class="nav-logo" />
            </Link>
            {#if $isAdmin}
                <Link to="/admin/users">Administrer brugere</Link>

            {/if}
            <div class="nav-right">
                 
                <SignOut /> 
            </div>
    

        </nav>
    {/if}

    <Route path="/">
        {#if $loggedIn }
            <Home/>
        {:else}
            <Login />
        {/if}
        
    </Route>

    <Route path="/home">

        <ValidateLogin component={Home} />
        <LiveChat/>
    </Route>

    <Route path="/recipes/:name" let:params>
    
        <Recipes name={params.name} />
    </Route>

    <Route path="/admin/users">
        <UserAdministration/>
    </Route>

</Router>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        background-color: #5d748a;
    }

    .nav-right {
        display: flex;
        gap: 20px;
    }

    .nav-logo {
        height: 40px;
        width: auto;
        border-radius: 100%;
    }
</style>