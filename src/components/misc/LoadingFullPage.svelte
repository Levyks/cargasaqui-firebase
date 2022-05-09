<script lang="ts">
    import Spinner from "./Spinner.svelte";

    export let loading: boolean;
</script>

{#if loading}
    <div class="h-100 d-flex flex-column justify-content-center align-items-center">
        <Spinner size={8} strokeWidth={1.5}/>
    </div>
{:else}
    <slot />
{/if}