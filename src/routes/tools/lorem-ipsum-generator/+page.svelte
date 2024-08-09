<script lang="ts">
  import { loremIpsum } from 'lorem-ipsum';
  
  let paragraphs = 1;
  let generatedText = '';
  
  function generate() {
      generatedText = loremIpsum({
          count: paragraphs,
          units: 'paragraphs',
          format: 'html'
      });
  }
</script>

<svelte:head>
  <title>Lorem Ipsum Generator - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Lorem Ipsum Generator</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <div class="form-control">
              <label class="label">
                  <span class="label-text">Number of Paragraphs</span>
              </label>
              <input type="number" bind:value={paragraphs} min="1" max="10" class="input input-bordered" />
          </div>
          
          <button class="btn btn-primary mt-4" on:click={generate}>Generate Text</button>
          
          {#if generatedText}
              <div class="mt-4">
                  <p class="font-bold">Generated Text:</p>
                  <div class="bg-base-200 p-2 rounded mt-2">
                      {@html generatedText}
                  </div>
              </div>
          {/if}
      </div>
  </div>
</div>
