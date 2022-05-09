<script lang="ts">

    import { _ } from "svelte-i18n";

    import { getPasswordStrength } from "@/services/password";
    import type { Result, DiversityType } from "check-password-strength";

    export let password: string;

    let labels: string[];
    $: labels = [
        $_('passwordStrength.options.tooWeak'),
        $_('passwordStrength.options.weak'),
        $_('passwordStrength.options.medium'),
        $_('passwordStrength.options.strong'),
    ]

    const containsOptions: DiversityType[] = ['lowercase', 'uppercase', 'number', 'symbol'];

    let passwordStrengthResult: Result<string>;

    $: passwordStrengthResult = getPasswordStrength(password);

</script>

<div class="my-1">
    <div class="mb-1">
        <span class="form-label">{$_('passwordStrength.label')}:</span>
        <strong 
            class:tooWeak={passwordStrengthResult.id === 0}
            class:weak={passwordStrengthResult.id === 1}
            class:medium={passwordStrengthResult.id === 2}
            class:strong={passwordStrengthResult.id === 3}
        >
            {labels[passwordStrengthResult.id]}
        </strong>
    </div>
    <div class="wrapper mb-2">
        <div 
            class="bar shadow-sm" 
            class:tooWeak={passwordStrengthResult.id === 0}
            class:weak={passwordStrengthResult.id === 1}
            class:medium={passwordStrengthResult.id === 2}
            class:strong={passwordStrengthResult.id === 3}
        />
    </div>
    <div>
        {#each containsOptions as containOption}
            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={ passwordStrengthResult.contains.includes(containOption) } disabled >
                <label class="form-check-label opacity-100" for="flexCheckDefault">
                    { $_(`passwordStrength.contains.${containOption}`) }
                </label>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">

    .wrapper {
        height: 1rem;
    }

    .bar {
        height: 100%;
        border-radius: 1rem;
        transition: width .3s linear, background-color .3s ease-in-out;
    }

    .bar.tooWeak {
        background-color: #ee0000;
        width: 10%;
    }

    .bar.weak {
        background-color: #cc4400;
        width: 35%;
    }

    .bar.medium {
        background-color: #ffdd00;
        width: 70%;
    }

    .bar.strong {
        background-color: #00aa00;
        width: 100%;
    }

    strong.tooWeak {
        color: #ee0000;
    }

    strong.weak {
        color: #cc4400;
    }

    strong.medium {
        color: #aa7700;
    }

    strong.strong {
        color: #00aa00;
    }

</style>