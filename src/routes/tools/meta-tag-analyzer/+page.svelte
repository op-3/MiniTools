<script lang="ts">
  import { onMount } from 'svelte';
  
  let url = '';
  let metaTags: {name: string, content: string}[] = [];
  let loading = false;
  let error = '';
  
  async function analyzeTags() {
      loading = true;
      error = '';
      metaTags = [];
  
      try {
          const response = await fetch(`/api/fetch-meta-tags?url=${encodeURIComponent(url)}`);
          if (!response.ok) throw new Error('Failed to fetch meta tags');
          const html = await response.text();
          
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          const tags = doc.getElementsByTagName('meta');
          for (let i = 0; i < tags.length; i++) {
              const name = tags[i].getAttribute('name') || tags[i].getAttribute('property') || '';
              const content = tags[i].getAttribute('content') || '';
              if (name && content) {
                  metaTags.push({ name, content });
              }
          }
      } catch (e) {
          error = 'Failed to analyze meta tags. Please check the URL and try again.';
      } finally {
          loading = false;
      }
  }
  
  onMount(() => {
      // Add any initialization code here if needed
  });
</script>

<svelte:head>
  <title>Meta Tags Analyzer - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Meta Tags Analyzer</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <input type="url" bind:value={url} placeholder="Enter URL" class="input input-bordered w-full" />
          
          <button class="btn btn-primary mt-4" on:click={analyzeTags} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Meta Tags'}
          </button>
          
          {#if error}
              <p class="text-red-500 mt-4">{error}</p>
          {/if}
          
          {#if metaTags.length > 0}
              <div class="mt-6">
                  <h2 class="text-xl font-semibold mb-2">Results:</h2>
                  <div class="overflow-x-auto">
                      <table class="table w-full">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Content</th>
                              </tr>
                          </thead>
                          <tbody>
                              {#each metaTags as tag}
                                  <tr>
                                      <td>{tag.name}</td>
                                      <td>{tag.content}</td>
                                  </tr>
                              {/each}
                          </tbody>
                      </table>
                  </div>
              </div>
          {/if}
      </div>
  </div>
</div>
