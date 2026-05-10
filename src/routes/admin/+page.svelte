<script>
	let username = '';
	let password = '';

	const createUser = async () => {
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		if (response.ok) {
			alert('Bruger oprettet!');
			username = '';
			password = '';
		} else {
			alert('Fejl!');
		}
	};
</script>

<main class="admin-page">
	<div class="admin-card">
		<h1>Diabetesdagbogen</h1>
		<h2>Opret bruger</h2>

		<input bind:value={username} type="text" placeholder="Brugernavn" />
		<input bind:value={password} type="password" placeholder="Adgangskode" />

		<button onclick={createUser}>Opret bruger</button>

		<p>
			Har du allerede en bruger?
			<a href="/login">Log ind her</a>
		</p>
	</div>
</main>

<style>
	.admin-page {
		min-height: 100vh;
		background: #eaf3ff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Arial, sans-serif;
	}

	.admin-card {
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
		color: #1456d9;
		text-decoration: underline;
	}
</style>