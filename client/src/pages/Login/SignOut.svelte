<script>
    import { fetchGet } from "../../../util/fetchUtil";
    import { navigate } from "svelte-routing";
    import toastr from "toastr";
    import "toastr/build/toastr.min.css";
    import { loggedIn } from "../../store/isLoggedInStore";


    async function signOut() {

        const result = await fetchGet("/api/signout")
        
        if(result.success){
            
            toastr.success("user is signed out");
            loggedIn.set(false);
            navigate("/");
        }else{
            toastr.error("sign out failed, try again");
        }    
    }
</script>

<button id="signout-button" on:click={signOut}>Sign Out</button>

<style>
    #signout-button{
        display: flex;
        margin-left: auto;
    }
</style>