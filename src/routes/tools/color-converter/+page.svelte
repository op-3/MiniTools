<script lang="ts">
  let hexColor = '#000000';
  let rgbColor = { r: 0, g: 0, b: 0 };
  
  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  
  function updateRgb() {
    const rgb = hexToRgb(hexColor);
    if (rgb) {
      rgbColor = rgb;
    }
  }
  
  function updateHex() {
    hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
  }
</script>

<svelte:head>
  <title>Color Converter - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Color Converter</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <h2 class="text-xl font-semibold mb-4">HEX to RGB</h2>
                  <div class="form-control">
                      <label class="label" for="hex-input">
                          <span class="label-text">Enter HEX Color</span>
                      </label>
                      <input
                          id="hex-input"
                          type="text"
                          bind:value={hexColor}
                          on:input={updateRgb}
                          class="input input-bordered w-full"
                      />
                  </div>
                  <p class="mt-4">RGB: {rgbColor.r}, {rgbColor.g}, {rgbColor.b}</p>
              </div>
              
              <div>
                  <h2 class="text-xl font-semibold mb-4">RGB to HEX</h2>
                  <div class="grid grid-cols-3 gap-4">
                      <div class="form-control">
                          <label class="label" for="r-input">
                              <span class="label-text">R</span>
                          </label>
                          <input
                              id="r-input"
                              type="number"
                              bind:value={rgbColor.r}
                              on:input={updateHex}
                              min="0"
                              max="255"
                              class="input input-bordered w-full"
                          />
                      </div>
                      <div class="form-control">
                          <label class="label" for="g-input">
                              <span class="label-text">G</span>
                          </label>
                          <input
                              id="g-input"
                              type="number"
                              bind:value={rgbColor.g}
                              on:input={updateHex}
                              min="0"
                              max="255"
                              class="input input-bordered w-full"
                          />
                      </div>
                      <div class="form-control">
                          <label class="label" for="b-input">
                              <span class="label-text">B</span>
                          </label>
                          <input
                              id="b-input"
                              type="number"
                              bind:value={rgbColor.b}
                              on:input={updateHex}
                              min="0"
                              max="255"
                              class="input input-bordered w-full"
                          />
                      </div>
                  </div>
                  <p class="mt-4">HEX: {hexColor}</p>
              </div>
          </div>
          
          <div class="mt-6">
              <div class="w-full h-24 rounded-lg" style="background-color: {hexColor};"></div>
          </div>
      </div>
  </div>
</div>
