<script>
	import { onMount } from 'svelte';

	let bloodSugar = $state('');
	let medicineTaken = $state(false);
	let exerciseMinutes = $state('');

	let thirst = $state(1);
	let urination = $state(1);
	let tiredness = $state(1);
	let blurredVision = $state(1);
	let tingling = $state(1);
	let dizziness = $state(1);
	let headache = $state(1);
	let badSleep = $state(1);

	let food = $state('');
	let content = $state('');
	let posts = $state([]);

	async function loadPosts() {
		const res = await fetch('/api/diary');
		posts = await res.json();
	}

	async function addEntry() {
		const symptoms = `Tørst: ${thirst}
Hyppig vandladning: ${urination}
Træthed: ${tiredness}
Sløret syn: ${blurredVision}
Prikken i fødder/hænder: ${tingling}
Svimmelhed: ${dizziness}
Hovedpine: ${headache}
Dårlig søvn: ${badSleep}`;

		const res = await fetch('/api/diary', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bloodSugar: Number(bloodSugar),
				medicineTaken: medicineTaken ? 1 : 0,
				insulinReminder: 0,
				exerciseMinutes: Number(exerciseMinutes),
				food,
				symptoms,
				content
			})
		});

		if (res.ok) {
			alert('Måling gemt!');
			bloodSugar = '';
			medicineTaken = false;
			exerciseMinutes = '';
			food = '';
			content = '';
			await loadPosts();
		} else {
			alert('Fejl!');
		}
	}

	onMount(loadPosts);
</script>

<main class="page">
	<header>
		<h1>Min Diabetesdagbog </h1>
		<p>Registrer dine daglige målinger, symptomer, kost og motion.</p>
	</header>

	<div class="layout">
		<section class="panel">
			<div class="section-title">
				<h2>📋 Ny registrering</h2>
				<span>10. maj 2025</span>
			</div>

			<label>Blodsukker (mmol/L)</label>
			<input type="number" step="0.1" bind:value={bloodSugar} placeholder="Fx 7.4" />

			<label class="checkbox">
				<input type="checkbox" bind:checked={medicineTaken} />
				Jeg har taget min medicin i dag
			</label>

			<label>Træning / motion</label>
			<input type="number" bind:value={exerciseMinutes} placeholder="Fx 30 minutter" />

			<h3>Symptomer</h3>
			<p class="hint">1 = ingen, 10 = meget slemt</p>

			<div class="symptom"><span>💧 Tørst</span><input type="range" min="1" max="10" bind:value={thirst} /><b>{thirst}</b></div>
			<div class="symptom"><span>🚽 Hyppig vandladning</span><input type="range" min="1" max="10" bind:value={urination} /><b>{urination}</b></div>
			<div class="symptom"><span>😴 Træthed</span><input type="range" min="1" max="10" bind:value={tiredness} /><b>{tiredness}</b></div>
			<div class="symptom"><span>👁️ Sløret syn</span><input type="range" min="1" max="10" bind:value={blurredVision} /><b>{blurredVision}</b></div>
			<div class="symptom"><span>✋ Prikken i fødder/hænder</span><input type="range" min="1" max="10" bind:value={tingling} /><b>{tingling}</b></div>
			<div class="symptom"><span>😵‍💫 Svimmelhed</span><input type="range" min="1" max="10" bind:value={dizziness} /><b>{dizziness}</b></div>
			<div class="symptom"><span>🤕 Hovedpine</span><input type="range" min="1" max="10" bind:value={headache} /><b>{headache}</b></div>
			<div class="symptom"><span>🌙 Dårlig søvn</span><input type="range" min="1" max="10" bind:value={badSleep} /><b>{badSleep}</b></div>

			<label>Kost</label>
			<textarea bind:value={food} placeholder="Skriv dagens måltider og snacks..."></textarea>

			<label>Dagbog</label>
			<textarea bind:value={content} placeholder="Skriv dine tanker, noter eller andet..."></textarea>

			<button onclick={addEntry}> Gem registrering</button>
		</section>

		<aside>
			<div class="small-card">
				<h3>🔔 Medicin</h3>
				<p>I dag kl. 08:00</p>
			</div>

			<div class="small-card">
				<h3>📈 Status i dag</h3>
				<p><strong>Blodsukker:</strong> {bloodSugar || '-'} mmol/L</p>

				{#if Number(bloodSugar) > 0 && Number(bloodSugar) < 4}
					<p class="warning">⚠️ Lavt blodsukker.</p>
				{:else if Number(bloodSugar) > 10}
					<p class="warning">⚠️ Højt blodsukker.</p>
				{:else if Number(bloodSugar) >= 4}
					<p class="success">✅ Blodsukker i anbefalet område.</p>
				{:else}
					<p class="info">Indtast blodsukker for status.</p>
				{/if}
			</div>

			<div class="small-card">
				<h3>💡 Hurtig info</h3>
				<p>Et stabilt blodsukker giver mere energi og bedre velvære.</p>
				<p>Husk medicin, bevægelse og væske.</p>
				<p>Kontakt læge ved gentagne høje eller lave målinger.</p>
			</div>

			<div class="small-card">
				<h3>Tidligere målinger</h3>

				{#each posts.slice(0, 3) as post}
					<div class="mini-entry">
						<p><strong>{post.bloodSugar} mmol/L</strong></p>
						<p>Medicin: {post.medicineTaken === 1 ? 'Ja' : 'Nej'} · {post.exerciseMinutes} min</p>
						<p>{post.food}</p>
						<p>{post.content}</p>
					</div>
				{/each}
			</div>
		</aside>
	</div>

	<footer>Denne dagbog erstatter ikke professionel rådgivning. Kontakt altid din læge ved bekymring.</footer>
</main>

<style>
	:global(body) {
		margin: 0;
		background: #eaf3ff;
		color: #172033;
		font-family: Arial, sans-serif;
	}

	.page {
		max-width: 1100px;
		margin: 30px auto;
		padding: 20px;
	}

	header h1 {
		font-size: 34px;
		margin-bottom: 5px;
	}

	header p {
		color: #556070;
	}

	.layout {
		display: grid;
		grid-template-columns: 1.7fr 1fr;
		gap: 28px;
		margin-top: 25px;
	}

	.panel,
	.small-card {
		background: white;
		border: 1px solid #e1e7ef;
		border-radius: 18px;
		padding: 24px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
	}

	.section-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	label {
		display: block;
		margin-top: 18px;
		font-weight: 700;
	}

	input[type='number'],
	textarea {
		width: 100%;
		margin-top: 8px;
		padding: 13px;
		border: 1px solid #d7dde7;
		border-radius: 10px;
		box-sizing: border-box;
		font-size: 15px;
	}

	textarea {
		min-height: 85px;
	}

	.checkbox {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.symptom {
		display: grid;
		grid-template-columns: 190px 1fr 45px;
		align-items: center;
		gap: 14px;
		margin: 14px 0;
	}

	.symptom b {
		border: 1px solid #d7dde7;
		border-radius: 8px;
		padding: 8px;
		text-align: center;
	}

	.hint {
		color: #657084;
		font-size: 14px;
	}

	button {
		margin-top: 20px;
		padding: 14px 24px;
		background: #0f172a;
		color: white;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-weight: bold;
	}

	aside {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.warning {
		background: #fff3cd;
		color: #856404;
		padding: 10px;
		border-radius: 10px;
		font-weight: bold;
	}

	.success {
		background: #dcfce7;
		color: #166534;
		padding: 10px;
		border-radius: 10px;
		font-weight: bold;
	}

	.info {
		background: #eaf3ff;
		color: #1d4ed8;
		padding: 10px;
		border-radius: 10px;
	}

	.mini-entry {
		border: 1px solid #e1e7ef;
		border-radius: 12px;
		padding: 12px;
		margin-top: 12px;
		background: #fbfcff;
	}
    h3 {
	font-size: 16px;
	font-weight: 600;
	margin-top: 10px;
	margin-bottom: 4px;
	color: #1f2937;
}

	footer {
		text-align: center;
		margin-top: 35px;
		color: #667085;
		font-size: 14px;
	}
</style>