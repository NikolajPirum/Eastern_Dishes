
export async function fetchGet(endpoint){
    const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
        credentials: "include"
    });
    return await response.json();
};

export async function fetchPost(endpoint,body) { 
    const isFormData = body instanceof FormData;

    const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
        method : "POST",
        credentials : "include",
        headers: isFormData ? {} : {  
            "Content-Type": "application/json" },
            body : isFormData ? body : JSON.stringify(body)
        });
    return await response.json(); 
 }

 export async function fetchPatch(endpoint, body) { 
    const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
        method: "PATCH",
        credentials: "include",
        headers: {  
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(body)
    });
    return await response.json(); 
}

 export async function fetchDelete(endpoint) {

    const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
        method : "DELETE",
        credentials : "include"
    });

    return await response.json();  
 }

