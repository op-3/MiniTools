<script lang="ts">
  import { onMount } from 'svelte';
  import imageCompression from 'browser-image-compression';
  
  let inputImage: File | null = null;
  let compressedImage: File | null = null;
  let compressing = false;
  let originalSize = '';
  let compressedSize = '';
  
  async function compressImage() {
      if (!inputImage) return;
  
      compressing = true;
      try {
          const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true
          };
  
          compressedImage = await imageCompression(inputImage, options);
          originalSize = (inputImage.size / 1024 / 1024).toFixed(2) + ' MB';
          compressedSize = (compressedImage.size / 1024 / 1024).toFixed(2) + ' MB';
      } catch (error) {
          console.error('Error compressing image:', error);
      } finally {
          compressing = false;
      }
  }
  
  function handleFileInput(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
          inputImage = target.files[0];
      }
  }
  
  onMount(() => {
      // Initialization code if needed
  });
</script>

<svelte:head>
  <title>Image Compressor - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Image Compressor</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <input type="file" accept="image/*" on:change={handleFileInput} class="file-input file-input-bordered w-full max-w-xs" />
          
          {#if inputImage}
              <button class="btn btn-primary mt-4" on:click={compressImage} disabled={compressing}>
                  {compressing ? 'Compressing...' : 'Compress Image'}
              </button>
          {/if}
          
          {#if compressedImage}
              <div class="mt-4">
                  <p>Original Size: {originalSize}</p>
                  <p>Compressed Size: {compressedSize}</p>
                  <a href={URL.createObjectURL(compressedImage)} download="compressed_image.jpg" class="btn btn-secondary mt-2">Download Compressed Image</a>
              </div>
          {/if}
      </div>
  </div>
</div>
