<script lang="ts">
    import { _ } from "svelte-i18n";

    export let error: string | null = null;
    export let loading: boolean;
    export let label: string;
    export let disabled: boolean = false;
</script>

<div class="d-flex align-items-center justify-content-end">
    {#if error}
        <span class="text-danger flex-grow-1" role="alert"><strong>{ error }</strong></span>
    {/if}
    {#if loading}
        <div class="spinner-border me-3" role="status">
            <span class="visually-hidden">{$_('misc.loading')}</span>
        </div>
    {/if}
    <button type="submit" class="btn btn-primary" disabled={loading || disabled}>
        {label}
    </button>
</div>