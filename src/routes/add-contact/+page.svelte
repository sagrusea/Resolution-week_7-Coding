<script lang="ts">
    import { goto } from "$app/navigation";

    let name:string, address:string, phone:string;
    async function save_contact() {
        const response = await fetch('/api/add-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address, phone })
        });
        const result = await response.json();
        console.log(result);

        goto('/');
    };
</script>

<main class="white-block">
    <div class="head">
        <h1>Add contact</h1>
    </div>
    <div class="contact-save">
        <input bind:value={name} placeholder="Name" class="text-input" />
        <input bind:value={address} placeholder="Adress" class="text-input" />
        <input bind:value={phone} placeholder="Phone number" class="text-input" style="grid-column: span 2 / span 2; width: 100%;"/>
    </div>
    <div style="text-align: center; margin-top: 1rem;">
        <button onclick={save_contact} class="button-style"> Save </button>
    </div>
</main>