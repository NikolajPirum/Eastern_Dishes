<script>
	export let dialog
</script>
<dialog bind:this={dialog}>
	<slot/>
</dialog>

<style>
    dialog[open]{
        border-radius: 2%;
        background-color: rgb(241, 238, 238);
		color:rgb(89, 145, 190);
    }

</style>