<script lang="ts">
    import Spinner from "./Spinner.svelte";

    export let loading: boolean;
</script>

<td class:text-center={loading}>
    {#if loading}
        <Spinner size={1} strokeWidth={0.5}/>
    {:else}
        <slot />
    {/if}
</td>
