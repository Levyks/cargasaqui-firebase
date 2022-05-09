<script lang="ts">

    import LoadingFullPage from "./LoadingFullPage.svelte";
    import ComponentLoader from "./ComponentLoader.svelte";

    export let loading: boolean = false;
    export let notFound: boolean = false;

</script>

{#if notFound}
    <ComponentLoader importer={() => import("@/views/NotFound.svelte")} />
{:else}
    <LoadingFullPage {loading}>
        <slot />
    </LoadingFullPage>
{/if}