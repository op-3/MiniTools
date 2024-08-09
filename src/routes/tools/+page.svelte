<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Tool } from '$lib/types';
  
  const allTools: Record<string, Tool[]> = {
    'Conversion and Encoding': [
      { id: 'qr-generator', name: 'QR Code Generator', icon: 'qrcode' },
      { id: 'base64', name: 'Base64 Converter', icon: 'code' },
    ],
    'Color Tools': [
      { id: 'color-converter', name: 'Color Converter', icon: 'palette' },
      { id: 'color-picker', name: 'Color Picker', icon: 'colorize' },
    ],
    'Text Tools': [
      { id: 'word-counter', name: 'Word Counter', icon: 'format_size' },
      { id: 'text-case-converter', name: 'Text Case Converter', icon: 'text_fields' },
    ],
    'Security': [
      { id: 'password-generator', name: 'Password Generator', icon: 'key' },
      { id: 'hash-generator', name: 'Hash Generator', icon: 'enhanced_encryption' },
    ],
  };
  
  let searchTerm = '';
  $: filteredTools = Object.entries(allTools).map(([category, tools]) => ({
    category,
    tools: tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);
</script>

<svelte:head>
  <title>All Tools - Mini Tools</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-center mb-8">Explore Our Tools</h1>
  
  <div class="mb-8">
      <input
        type="text"
        placeholder="Search for a tool..."
        class="input input-bordered w-full max-w-xs"
        bind:value={searchTerm}
      />
  </div>
  
  {#each filteredTools as { category, tools }, index}
      <section class="mb-12" in:fade={{ duration: 300, delay: index * 100 }}>
          <h2 class="text-2xl font-semibold mb-4">{category}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each tools as tool}
                  <a href="/tools/{tool.id}" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                      <div class="card-body">
                          <h3 class="card-title">
                              <span class="material-icons ml-2">{tool.icon}</span>
                              {tool.name}
                          </h3>
                          <div class="card-actions justify-end">
                              <button class="btn btn-primary">Use Tool</button>
                          </div>
                      </div>
                  </a>
              {/each}
          </div>
      </section>
  {/each}
</main>
