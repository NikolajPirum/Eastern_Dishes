<script>
    import { preventDefault } from 'svelte/legacy';
    import { fetchPost } from '../../../util/fetchUtil.js'
    import Dialog from '../../components/Dialog.svelte';
    import { navigate } from 'svelte-routing';
    import { dishes } from '../../store/dishesStore.js'
    import toastr from 'toastr';

    let dialog; // referance til html dialog

    let form // referance til html form og argument til formData
    let formData;

    async function createNewDish(e) {
    e.preventDefault();
    
    try{
        formData = new FormData(form);
    }catch(error){
        console.error("formData fejl",error);
        return toastr.error("noget gik galt, prøv igen");
    }
    try{   
        const result = await fetchPost("/api/dishes", formData);
        
        if(result.success && result.data){
            dishes.update(currentDishes => {
            return [...currentDishes, result.data]
            });
        }
        toastr.success("dish er tilføjet");
        dialog.close();
        form.reset();
    }catch(error){
        console.error("problemer med fetch", error);
        return toastr.error("noget gik galt, prøv igen")
    }
}
</script>

<button on:click={() => dialog.showModal()}>Create Dish</button>
<Dialog bind:dialog>
    <form bind:this={form} on:submit={createNewDish} enctype="multipart/form-data">
    <input type="text" name="name" placeholder="Enter dish name.." required>
    <input type="text" name="dish_origin" placeholder="Enter dish origin.." required>
    <input type="file" name="dish_image" accept=".png, .jpg" placeholder="picture of dish" required>
    <br>
    <button type="submit">Upload Dish</button>
    </form>
</Dialog>

