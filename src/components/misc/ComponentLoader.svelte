<script lang="ts">

    import { _ } from 'svelte-i18n';
    import type { SvelteComponentDev } from 'svelte/internal';

    import LoadingFullPage from './LoadingFullPage.svelte';
    import CenteredFullPage from './CenteredFullPage.svelte';

    import type { SvelteModuleType} from '@/typings';

    export let importer: () => Promise<SvelteModuleType>
    export let params: any = {};

    let loading: boolean = false;
    let component: SvelteComponentDev | null = null;
    let errored: boolean = false;

    $: importComponent(importer);

    function importComponent(importerFn: () => Promise<SvelteModuleType>) {
        loading = true;
        errored = false;
        importerFn()
            .then(module => {
                // TODO: fix this mess
                component = module.default as unknown as SvelteComponentDev;
            })
            .catch(error => {
                console.error(error);
                errored = true;
            })
            .finally(() => {
                loading = false;
            });
    }

</script>

{#if !errored}
    <LoadingFullPage {loading}>
        <svelte:component this={component} {...params} />
    </LoadingFullPage>
{:else}
    <CenteredFullPage>
        <span class="material-symbols-outlined icon">cloud_off</span>
        <h2>{ $_('errors.loadingComponent') }</h2>
        <button class="btn btn-primary" on:click={() => importComponent(importer)}>
            { $_('misc.retry') }
        </button>
    </CenteredFullPage>
{/if}

<style lang="scss">
    .icon {
        font-size: 6rem;
    }
</style>