<script lang="ts">
  import { onMount } from 'svelte';
  import QRCode from 'qrcode';
  
  let inputText = '';
  let qrCodeDataUrl = '';
  let canvas: HTMLCanvasElement;
  
  onMount(() => {
    canvas = document.createElement('canvas');
  });
  
  async function generateQRCode() {
    if (!inputText.trim()) return;
    
    try {
      await QRCode.toCanvas(canvas, inputText, { width: 300 });
      qrCodeDataUrl = canvas.toDataURL();
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  }
</script>

<svelte:head>
  <title>QR Code Generator - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">QR Code Generator</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <div class="form-control">
              <label class="label" for="qr-input">
                  <span class="label-text">Enter Text or URL</span>
              </label>
              <input
                  id="qr-input"
                  type="text"
                  bind:value={inputText}
                  placeholder="Enter text here"
                  class="input input-bordered w-full"
              />
          </div>
          
          <button
              on:click={generateQRCode}
              class="btn btn-primary mt-4"
              disabled={!inputText.trim()}
          >
              Generate QR Code
          </button>
          
          {#if qrCodeDataUrl}
              <div class="mt-6 flex justify-center">
                  <img src={qrCodeDataUrl} alt="Generated QR Code" class="border-2 border-base-300 rounded-lg" />
              </div>
              <a href={qrCodeDataUrl} download="qrcode.png" class="btn btn-secondary mt-4">Download QR Code</a>
          {/if}
      </div>
  </div>
</div>
