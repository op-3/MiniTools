<script lang="ts">
  let inputText = ''; // Input text for conversion
  let outputText = ''; // Result of the conversion
  let mode: 'encode' | 'decode' = 'encode'; // Mode to determine encoding or decoding

  function convert() {
      if (mode === 'encode') {
          // Encode the input text to Base64
          outputText = btoa(inputText);
      } else {
          try {
              // Decode the Base64 input text
              outputText = atob(inputText);
          } catch (e) {
              // Handle invalid Base64 input
              outputText = 'Error: Invalid Base64 input';
          }
      }
  }
</script>

<svelte:head>
  <title>Base64 Converter - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Base64 Converter</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <div class="form-control">
              <label class="label">
                  <span class="label-text">Text</span>
              </label>
              <textarea bind:value={inputText} class="textarea textarea-bordered h-24" placeholder="Enter text here"></textarea>
          </div>
          
          <div class="form-control">
              <label class="label">
                  <span class="label-text">Mode</span>
              </label>
              <select bind:value={mode} class="select select-bordered w-full max-w-xs">
                  <option value="encode">Encode</option>
                  <option value="decode">Decode</option>
              </select>
          </div>
          
          <button class="btn btn-primary mt-4" on:click={convert}>Convert</button>
          
          {#if outputText}
              <div class="mt-4">
                  <p class="font-bold">Result:</p>
                  <p class="text-xl bg-base-200 p-2 rounded break-all">{outputText}</p>
              </div>
          {/if}
      </div>
  </div>
</div>
