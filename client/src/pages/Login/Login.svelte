<script>
    import { fetchPost } from '../../../util/fetchUtil.js';
    import { navigate } from 'svelte-routing';
    import toastr from "toastr";
    import "toastr/build/toastr.min.css";
    import { loggedIn } from '../../store/isLoggedInStore.js';

    async function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const result = await fetchPost("/api/login", { username, password });

        if (result.success) {
            toastr.success("Login successful");
            loggedIn.set(true); // opdater global login
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

<h1>Login</h1>
    <label for="username">Username:</label>
    <input type="text" name="username" id="username">
<br>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password">
<br>
<button on:click={login}>Login</button>

<button on:click={() => dialog.showModal()}>Reset Password</button>


<Dialog bind:dialog>
    <h4>Reset Password</h4>
	<input type="email" name="email" id="email" placeholder="enter your email...">
    <button on:click={resetPassword}>Send reset email</button>
    <button on:click= {() => dialog.close()} >Cancel</button>
</Dialog>



