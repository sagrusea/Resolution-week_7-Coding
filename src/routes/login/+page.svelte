<div class="card">
    <h1 class="head">Log in</h1>
    <form class="auth" method="POST" action="?/login">
        <label for="username">Username:</label>
        <input class="authinput" name="username" id="username" required autocomplete="username" />

        <label for="password">Password:</label>
        <input class="authinput" type="password" name="password" id="password" required autocomplete="current-password" />

        <button type="submit" class="button-style"> Log in </button>
        <p class="centered">Dont have an account? <a href="/register">Register</a></p>
    </form>
</div>