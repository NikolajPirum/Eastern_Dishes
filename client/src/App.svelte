<script>
    import { Router, Route, navigate } from 'svelte-routing';
    import Login from './pages/Login/Login.svelte';
    import Home from './pages/Home/Home.svelte';
    import ValidateLogin from './components/ValidateLogin.svelte';
    import { loggedIn } from './store/isLoggedInStore.js'
    import SignOut from './pages/Login/SignOut.svelte';
</script>

<Router>
    <Route path="/">
        {#if $loggedIn }
            {navigate("/home")}
        {:else}
            <Login />
        {/if}
        
    </Route>

    <Route path="/home">
    <nav>
        <SignOut/>
    </nav>
        <ValidateLogin component={Home} />
    </Route>
</Router>
