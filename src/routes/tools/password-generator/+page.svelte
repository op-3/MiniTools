<script lang="ts">
  let passwordLength = 12;
  let includeUppercase = true;
  let includeLowercase = true;
  let includeNumbers = true;
  let includeSymbols = true;
  let generatedPassword = '';
  
  function generatePassword() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    generatedPassword = Array(passwordLength)
      .fill(null)
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
  }
</script>

<svelte:head>
  <title>Password Generator - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Password Generator</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <div class="form-control">
              <label class="label">
                  <span class="label-text">Password Length</span>
              </label>
              <input type="number" bind:value={passwordLength} min="4" max="50" class="input input-bordered" />
          </div>
          
          <div class="form-control">
              <label class="cursor-pointer label">
                  <span class="label-text">Include Uppercase Letters</span> 
                  <input type="checkbox" bind:checked={includeUppercase} class="checkbox" />
              </label>
          </div>
          
          <div class="form-control">
              <label class="cursor-pointer label">
                  <span class="label-text">Include Lowercase Letters</span> 
                  <input type="checkbox" bind:checked={includeLowercase} class="checkbox" />
              </label>
          </div>
          
          <div class="form-control">
              <label class="cursor-pointer label">
                  <span class="label-text">Include Numbers</span> 
                  <input type="checkbox" bind:checked={includeNumbers} class="checkbox" />
              </label>
          </div>
          
          <div class="form-control">
              <label class="cursor-pointer label">
                  <span class="label-text">Include Symbols</span> 
                  <input type="checkbox" bind:checked={includeSymbols} class="checkbox" />
              </label>
          </div>
          
          <button class="btn btn-primary mt-4" on:click={generatePassword}>Generate Password</button>
          
          {#if generatedPassword}
              <div class="mt-4">
                  <p class="font-bold">Generated Password:</p>
                  <p class="text-xl bg-base-200 p-2 rounded">{generatedPassword}</p>
              </div>
          {/if}
      </div>
  </div>
</div>
