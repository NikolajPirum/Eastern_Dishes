<script>
    import { onMount } from "svelte";
    import { fetchGet, fetchDelete, fetchPatch } from "../../../util/fetchUtil.js";
    import toastr from "toastr";
    import Dialog from "../../components/Dialog.svelte";

    let users = [];
    let dialog;
    let editUser = { id: null, username: "", email: "", password: "" };


    onMount( async () => {
        const result = await fetchGet("/api/users");
        if(result.success) {
            users = result.data;
        }
    });
    
    async function deleteUser(userId) {
        const result = await fetchDelete(`/api/users/${userId}`);
        
        if (result.success) {
            users = users.filter(user => user.id !== userId);
            toastr.success("Bruger slettet");
        }
    }
    function openEdit(user){
        editUser = {...user, password : ""};
        dialog.showModal();
    }

    async function saveUser(){
        const result = await fetchPatch(`/api/users/${editUser.id}`, editUser);

        if(result.success){
            users = users.map(u => u.id === editUser.id ? {...u, username: editUser.username, email: editUser.email} : u);
            toastr.success("Bruger opdateret");
            dialog.close();
        }
    }

</script>

<h2>User Administration</h2>

<table>
    <thead>
        <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each users as user}
            <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <button id ="edit-button"on:click={() => openEdit(user)}>Rediger</button>

                    <button on:click={() => deleteUser(user.id)}>Slet</button>
                </td>  
            </tr>
        {/each}
    </tbody>
</table>

<Dialog bind:dialog>
    <h3>Edit User</h3>
    <label for="username">
        Username:
        <input type="text" bind:value={editUser.username} placeholder="Username"/>
    </label>
    <label for="email">
        Email:
        <input type="email" bind:value={editUser.email} placeholder="Email"/>
    </label>
    <label for="password">
        Password:
        <input type="password" bind:value={editUser.password} placeholder="Password"/>
    </label>
    <div class="buttons">
        <button on:click={saveUser}>Gem</button>
        
        <button on:click={() => dialog.close()}>Annuller</button>
    </div>
</Dialog>


<style>

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    table {
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
        table-layout: fixed;
        border-collapse: collapse;
        
    }

    th, td {
        padding: 0.8rem;
        text-align: center;
    }

    th {
        background-color: #3c546b;
        color: white;
    }

    td {
        background-color: white;
        border-bottom: 1px solid #b2a9c9;
    }

    tr:hover td {
        background-color: #f0f1ef;
    }

    td button {
        background-color: #b04a4a;
        color: white;
        padding: 0.5rem 1rem !important;

    }
    #edit-button{
        background-color: #4a8b5c;
        color: white;
        padding: 0.5rem  !important;

    }
    input{
        background-color: white;
        color: black;
        font-weight: 500;
    }
</style>
