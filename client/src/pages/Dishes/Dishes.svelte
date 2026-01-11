<script>
    import { fetchGet } from '../../../util/fetchUtil.js';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css'; 
    import UploadDish from './UploadDish.svelte';
    import { onMount } from 'svelte';
    import { dishes } from '../../store/dishesStore.js'
    import { Link } from 'svelte-routing';
    import Recipes from '../Recipes/Recipes.svelte';

     
    onMount(async () => {
    const result = await fetchGet("/api/dishes"); 
        if(!result.success){
            toastr.error(result.error);
        }else{
            dishes.set(result.data); //dishes = writeable([])
        }
});

</script>

<h2>🍲Dishes🍲</h2>

<div class="dishes-row">
{#each $dishes as dish (dish.id) }
    <div id= "container">
        <img class="dish-img" src="{import.meta.env.VITE_BASE_URL}/uploads/{dish.dish_image}" alt={dish.name}/> 
        <p><strong>Dish:</strong> {dish.name}</p>
        <p><strong>Origin:</strong> {dish.dish_origin}</p>
        <Link to="/recipes/{dish.name}">recipe</Link>
    </div>
{/each}
</div>
<br>
<UploadDish/>


<style>
.dish-img{
    height: 5cm;
    border-radius: 60%;
}
#container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
    .dishes-row {
    display: flex;
     gap: 2cm; /*plads mellem dishes */
    justify-content: center;
}
</style>