<script>
    import { fetchGet } from "../../../util/fetchUtil";
    import { onMount } from "svelte";
    import Dialog from "../../components/Dialog.svelte";

    let { name } = $props(); 
    let recipe = $state(null);
    let baseServings = $state(4);
    let wantedServings = $state(baseServings);
    let dialog;
    let ingredients = $state([]);

    onMount(async () => {
        const result = await fetchGet('/api/recipes/' + name);
        if (result.success) {
            recipe = result.data;
            baseServings = recipe.servings;
            ingredients = JSON.parse(recipe.ingredients)
        }
    });

    function adjustAmount(amount) {
        const adjusted = amount * (wantedServings / baseServings);
        return parseFloat(adjusted.toFixed(1));
    }
</script>

{#if recipe}
    <h1>{recipe.dish_name}</h1>
    <span><strong>Total tid:</strong> {recipe.total_time_minutes} minutter</span>
    <span><strong>Arbejdstid:</strong> {recipe.working_time} minutter</span>

    <button onclick={() => dialog.showModal()}>
            <span><strong>Antal:</strong> {wantedServings} personer</span>
    </button>

        <p><strong>Ingredienser</strong></p>
        {#each ingredients as ing}
            <p>{ing.name}: {adjustAmount(ing.amount)} {ing.unit}</p>
        {/each}

    <!-- dialog for wantedServings -->
    <Dialog bind:dialog>
        <p><strong>Vælg antal</strong></p>
        <select bind:value={wantedServings}>
        {#each [1, 2, 3, 4, 5, 6, 7, 8] as num }
            <option value={num}> {num} personer</option>
        {/each}
        </select>
        <button onclick={() => dialog.close()}>OK</button>
    </Dialog>

    <h2>Fremgangsmåde</h2>
    <p id="recipes-procedure">{recipe.procedure}</p>
{/if}

<style>
    select{
        background-color:rgb(255, 255, 252);
        color: black;
    }
    option{
        color: black;
    }
    #recipes-procedure{
        white-space: pre-line; 
        width: 20cm;
        margin: 0 auto;
        text-align: left;
    }
</style>
