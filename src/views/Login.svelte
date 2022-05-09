<script lang="ts">

    import { _ } from "svelte-i18n";
    import { getAuth, signInWithEmailAndPassword, AuthError } from "firebase/auth";
    import { navigate } from "svelte-routing";
    
    import { user } from '@/stores';
    import { getFirebaseErrorTranslationKey } from "@/services/i18n";

    import CenteredFullPage from '@/components/misc/CenteredFullPage.svelte';
    import FormSubmit from '@/components/misc/FormSubmit.svelte';

    let email: string = '';
    let password: string = '';
    let loading: boolean = false;

    let errorKey: string | null = null;

    $: if($user) navigate('/');

    function handleSubmit() {
        
        loading = true;
        errorKey = null;

        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                user.set(result.user);
            })
            .catch((error: AuthError) => {
                errorKey = getFirebaseErrorTranslationKey(error);
            })
            .finally(() => {
                loading = false;
            });

    }

</script>

<svelte:head>
    <title>Login | CargasAqui</title>
</svelte:head>

<CenteredFullPage>

    <div class="card card-width-sm shadow-lg">
        <div class="card-body p-4">

            <h1 class="fs-4 card-title fw-bold mb-4">Login</h1>
    
            <form on:submit|preventDefault={handleSubmit}>

                <div class="mb-3">
                    <label class="mb-2 text-muted" for="email">{$_('misc.fields.email')}</label>
                    <input id="email" type="email" class="form-control" class:is-invalid={errorKey} disabled={loading} bind:value={email} required>
                </div>   

                <div class="mb-3">
                    <div class="mb-2 w-100">
                        <label class="text-muted" for="password">{$_('misc.fields.password')}</label>
                        <a href="/forgot" class="float-end">{$_('login.forgotPassword')}</a>
                    </div>

                    <input id="password" type="password" class="form-control" class:is-invalid={errorKey} bind:value={password} disabled={loading} required>

                </div>

                <FormSubmit error={errorKey && $_(errorKey)} {loading} label={$_('login.signIn')}/>
            </form>

        </div>
    </div>

</CenteredFullPage>
