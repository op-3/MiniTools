<script lang="ts">
  let color = '#000000';
  
  function generateRandomColor() {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }
  
  function rgbToHsl(r, g, b) {
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
  
      if (max === min) {
          h = s = 0;
      } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }
  
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }
  
  $: rgb = color.match(/\w\w/g).map(x => parseInt(x, 16));
  $: hsl = rgbToHsl(...rgb);
</script>

<svelte:head>
  <title>Random Color Generator - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Random Color Generator</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <button class="btn btn-primary" on:click={generateRandomColor}>Generate Random Color</button>
          
          <div class="mt-4 flex items-center">
              <div class="w-20 h-20 rounded" style="background-color: {color};"></div>
              <div class="ml-4">
                  <p>HEX: {color}</p>
                  <p>RGB: rgb({rgb.join(', ')})</p>
                  <p>HSL: hsl({hsl[0]}, {hsl[1]}%, {hsl[2]}%)</p>
              </div>
          </div>
      </div>
  </div>
</div>
