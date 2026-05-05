<script>
    import { form } from "$app/server";

</script>
<div class="card">
    <h1 class="head">Register</h1>
    <form class="auth" method="POST" action="?/register">
        {#if form?.error}
            <p style="color: red;">{form.error}</p>
        {/if}
        <label for="username">Username:</label>
        <input class="authinput" name="username" id="username" required autocomplete="username" />

        <label for="password">Password:</label>
        <input class="authinput" type="password" name="password" id="password" required autocomplete="new-password" />

        <button type="submit" class="button-style"> Register </button>
        <p class="centered">Already have an account? <a href="/login">Log in</a></p>
    </form>
</div>