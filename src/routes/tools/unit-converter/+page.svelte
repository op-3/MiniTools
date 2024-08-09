<script lang="ts">
  let inputValue = 0;
  let inputUnit = 'meter';
  let outputUnit = 'foot';
  let result = 0;
  
  const unitConversions = {
      meter: { foot: 3.28084, inch: 39.3701 },
      foot: { meter: 0.3048, inch: 12 },
      inch: { meter: 0.0254, foot: 0.0833333 }
  };
  
  function convert() {
      if (inputUnit === outputUnit) {
          result = inputValue;
      } else {
          result = inputValue * unitConversions[inputUnit][outputUnit];
      }
  }
</script>

<svelte:head>
  <title>Unit Converter - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Unit Converter</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <div class="form-control">
              <label class="label">
                  <span class="label-text">Value</span>
              </label>
              <input type="number" bind:value={inputValue} class="input input-bordered" />
          </div>
          
          <div class="form-control">
              <label class="label">
                  <span class="label-text">From</span>
              </label>
              <select bind:value={inputUnit} class="select select-bordered">
                  <option value="meter">Meter</option>
                  <option value="foot">Foot</option>
                  <option value="inch">Inch</option>
              </select>
          </div>
          
          <div class="form-control">
              <label class="label">
                  <span class="label-text">To</span>
              </label>
              <select bind:value={outputUnit} class="select select-bordered">
                  <option value="meter">Meter</option>
                  <option value="foot">Foot</option>
                  <option value="inch">Inch</option>
              </select>
          </div>
          
          <button class="btn btn-primary mt-4" on:click={convert}>Convert</button>
          
          {#if result !== 0}
              <div class="mt-4">
                  <p class="font-bold">Result:</p>
                  <p class="text-xl">{result.toFixed(4)} {outputUnit}</p>
              </div>
          {/if}
      </div>
  </div>
</div>
