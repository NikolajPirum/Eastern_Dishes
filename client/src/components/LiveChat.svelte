<script>
    import { io } from 'socket.io-client'
    import { chatMessages } from '../store/chatMessageStore.js';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let socket;
    let author = writable();

    onMount(() => {
        socket = io(import.meta.env.VITE_BASE_URL, {
            withCredentials : true
         });
         socket.on('server-sends-user', (username) => {
            author.set(username);
         });
        socket.on('server-sends-message', (data) => {

            chatMessages.update(chatMessageStoreValues => {
            chatMessageStoreValues.push(data);
            inpMessage = "" // clears input field 

            return chatMessageStoreValues;
            }) 
        });
    })
    
    let inpMessage; //binded to <input>

    function sendMessage(){
        const sender = $author

        const userMessage = {user : sender, message : inpMessage};
        socket.emit('client-sends-message', userMessage);
    }

</script>
<panel>
<div>
    {#each $chatMessages as chatMessage}
        <p>{chatMessage.user} : {chatMessage.message}</p>
    {/each}
</div>
</panel>
<input bind:value={inpMessage} type="text" placeholder="write a message..">
<button onclick={sendMessage}>Send Text </button>
