<script lang="ts">
    import { goto } from "$app/navigation";
    import { read } from "$app/server";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    type Contact = {
        id: number;
        name: string;
        address: string;
        phone: string;
    };

    let contacts = $state<Contact[]>([]);

    async function read_contacts() {
        console.log('Reading contacts');
        const response = await fetch('/api/read-contacts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();

        console.log('Contacts: ', result);
        return result;
    }

    async function remove_contact( id:number ) {
        const response = await fetch('/api/remove-contact', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const result = await response.json();
        console.log(result);
        
        contacts = await read_contacts();
    }

    onMount(async () => {
        contacts = await read_contacts();
    });
</script>

<main class="white-block">
    <div class="head">
        <h1>Contact Book</h1>
    </div>
    <div class="contact-container">
        {#each contacts as contact}
        <div class="contact-element hover:scale-105 transition-transform">
            <div>
                <p>{contact.name}</p>
                <p>{contact.address}</p>
            </div>
            <div style="text-align: right;">
                <p><img class="icon" src="phone.svg" alt="phone ico"> {contact.phone}</p>
                <!-- prettier ignore -->
                <button class="clear-button" title="remove" onclick={() => {
                    remove_contact(contact.id); }}><svg width="5vw" height="5vw" viewBox="-2.5 0 61 61" xmlns="http://www.w3.org/2000/svg"><defs><filter id="a" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"/><feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path fill-rule="evenodd" d="M36 26v10.997c0 1.659-1.337 3.003-3.009 3.003h-9.981c-1.662 0-3.009-1.342-3.009-3.003v-10.997h16zm-2 0v10.998c0 .554-.456 1.002-1.002 1.002h-9.995c-.554 0-1.002-.456-1.002-1.002v-10.998h12zm-9-5c0-.552.451-1 .991-1h4.018c.547 0 .991.444.991 1 0 .552-.451 1-.991 1h-4.018c-.547 0-.991-.444-.991-1zm0 6.997c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm4 0c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm-6-5.997h-4.008c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h18.016c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-4.008v-1c0-1.653-1.343-3-3-3h-3.999c-1.652 0-3 1.343-3 3v1z" filter="url(#a)"/></svg></button>
            </div>
        </div>
        {:else}
            <p style="text-align: center;">Contact list is empty!</p>
        {/each}
    </div>
    <div style="text-align: center; margin-top: 1rem;">
        <a href="/add-contact" class="button-style"> Add contact</a>
    </div>
    <form method="POST" action="?/logout">
        <button type="submit">Log out</button>
    </form>
</main>