<script lang="ts">
    import { _, isLoading } from "svelte-i18n";

    export let size: number = 2;
    export let strokeWidth: number = 1;
    export let ariaLabel: string | null = null;
    export let className: string = "";
</script>

<div 
    style="width: {size}rem; height: {size}rem; font-size: {strokeWidth}rem;"
    class="spinner-border {className}" 
    role="status"
>
    <span class="visually-hidden">{ariaLabel || ($isLoading ? 'Loading...' : $_('misc.loading') )}</span>
</div>