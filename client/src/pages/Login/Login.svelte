<script>
    import { fetchPost } from '../../../util/fetchUtil.js';
    import { navigate } from 'svelte-routing';
    import toastr from "toastr";
    import "toastr/build/toastr.min.css";
    import { loggedIn } from '../../store/isLoggedInStore.js';
    import { onMount, onDestroy } from 'svelte';
    import { isAdmin } from '../../store/isAdmin.js';

        onMount(() => {
        document.body.classList.add('login-bg');
    });

    onDestroy(() => {
        document.body.classList.remove('login-bg');
    });

    async function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const result = await fetchPost("/api/login", { username, password });

        if (result.success) {
            toastr.success("Login successful");
            loggedIn.set(true); // opdater global login
            isAdmin.set(result.role === "ADMIN");
            navigate("/home");  // redirect i SPA uden reload. virker kun på indhold i <Router>
        } else {
            toastr.error("Forkert username eller password");
        }
    }

    import Dialog from '../../components/Dialog.svelte'
	let dialog; // referance  <dialog> html element

    async function resetPassword() {
        
        const email = document.getElementById('email').value;

        const result = await fetchPost("/api/resetpassword", { email });
        if(!result.success){
            toastr.error("ugyldig email: " + email);
        }else{
            toastr.success("email er send til: " + email);
            dialog.close();
        }
    }
    

</script>

<h1 style="color: aliceblue;">Eastern Dishes</h1>

<input type="text" name="username" id="username" placeholder="Username">
    <br>
    <br>
<input type="password" name="password" id="password" placeholder="Password">
    <br>
    <br>
<button on:click={login}>Login</button>

<button on:click={() => dialog.showModal()}>Reset Password</button>


<Dialog bind:dialog>
    <h4>Reset Password</h4>
	<input type="email" name="email" id="email" placeholder="enter your email..." style="color: black;">
    <button on:click={resetPassword}>Send reset email</button>
    <button on:click= {() => dialog.close()} >Cancel</button>
</Dialog>


<style>
    input{
        background-color: aliceblue;
        color: black;
        font-weight: 300;
            padding: 12px 16px;
        font-size: 1.1em;
        width: 250px;
        -radius: 8%;
    }
    :global(body.login-bg) {
        background-image: url('/loginBackground.avif');
        background-size: 100%;
        background-position: center;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
</style>
