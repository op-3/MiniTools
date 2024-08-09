<script lang="ts">
  let text = '';
  
  $: wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  $: charCount = text.length;
  $: charCountNoSpaces = text.replace(/\s/g, '').length;
</script>

<svelte:head>
  <title>Word Counter - Mini Tools</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Word Counter</h1>
  
  <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
          <div class="form-control">
              <label class="label" for="text-input">
                  <span class="label-text">Enter Text</span>
              </label>
              <textarea
                  id="text-input"
                  bind:value={text}
                  placeholder="Type or paste text here"
                  class="textarea textarea-bordered h-64"
              ></textarea>
          </div>
          
          <div class="stats shadow mt-6">
              <div class="stat">
                  <div class="stat-title">Words</div>
                  <div class="stat-value">{wordCount}</div>
              </div>
              <div class="stat">
                  <div class="stat-title">Characters</div>
                  <div class="stat-value">{charCount}</div>
              </div>
              <div class="stat">
                  <div class="stat-title">Characters (without spaces)</div>
                  <div class="stat-value">{charCountNoSpaces}</div>
              </div>
          </div>
      </div>
  </div>
</div>
