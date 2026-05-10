<script>
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		await response.json();

		if (response.ok) {
			goto('/');
		} else {
			alert('Login fejlet!');
		}
	};
</script>

<main class="login-page">
	<div class="login-card">
		<h1>Diabetesdagbogen</h1>
		<h2>Log ind</h2>

		<input bind:value={username} type="text" placeholder="Brugernavn" />
		<input bind:value={password} type="password" placeholder="Adgangskode" />

		<button onclick={login}>Login</button>

		<p>
			Har du ikke en bruger?
			<a href="/admin">Opret en her</a>
		</p>
	</div>
</main>

<style>
	.login-page {
		min-height: 100vh;
		background: #eaf3ff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Arial, sans-serif;
	}

	.login-card {
		background: white;
		width: 430px;
		padding: 45px;
		border-radius: 10px;
		text-align: center;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	h1 {
		color: #000000;
		font-size: 34px;
		margin-bottom: 15px;
	}

	h2 {
		color: #000000;
		margin-bottom: 30px;
	}

	input {
		width: 100%;
		padding: 14px;
		margin-bottom: 20px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 15px;
		box-sizing: border-box;
	}

	button {
		background: #000000;
		color: white;
		border: none;
		padding: 13px 28px;
		border-radius: 5px;
		font-weight: bold;
		cursor: pointer;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	p {
		margin-top: 30px;
		color: #000000;
	}

	a {
		color: #006eff;
		text-decoration: underline;
	}
</style>