<script lang="ts">

    export let label: string;
    export let id: string;
    export let type: 'text' | 'email' | 'password' = 'text';
    export let required: boolean = false;
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let value: string | number;

    export let error: string | null = null;
    export let help: string | null = null;

    function handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
        const target = e.target as HTMLInputElement;
        value = type.match(/^(number|range)$/)
            ? +target.value
            : target.value;
    }
        
</script>

<div class="mb-3">
    <label for={id} class="form-label">{ label }</label>
    <input 
        {type} {id} {required} {disabled} {readonly} {value}
        class="form-control" 
        class:is-invalid={!!error}
        aria-describedby={help && `${id}Help`}
        on:input={handleInput}
    >
    {#if error}
        <div class="invalid-feedback">
            { error } 
        </div>
    {:else if help}
        <div id="{id}Help" class="form-text">{ help }</div>
    {/if}
    <slot />
</div>