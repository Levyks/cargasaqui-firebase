<script lang="ts">

    import { _ } from 'svelte-i18n';
    import { navigate } from 'svelte-routing';

    import { updatePassword, updateProfile, getAuth,  signInWithEmailAndPassword, AuthError } from 'firebase/auth';

    import { user } from '@/stores';
    import { getPasswordStrength } from '@/services/password';
    import type { PasswordStrength } from '@/services/password';
    import { getFirebaseErrorTranslationKey } from "@/services/i18n";

    import CenteredFullPage from '@/components/misc/CenteredFullPage.svelte';
    import FormSubmit from '@/components/misc/FormSubmit.svelte';
    import PasswordStrengthBar from '@/components/misc/PasswordStrengthBar.svelte';
    import FormField from '@/components/misc/FormField.svelte';

    $: if(!$user) navigate('/login');

    let loading: boolean = false;

    let name: string = $user?.displayName;
    let password: string = '';
    let passwordConfirm: string = '';
    let oldPassword: string = '';

    let nameErrorKey: string = '';
    let passwordErrorKey: string = '';
    let passwordConfirmErrorKey: string = '';
    let oldPasswordErrorKey: string = '';

    let passwordStrength: PasswordStrength;
    let saveEnabled: boolean;

    function clearPasswords() {
        password = '';
        passwordConfirm = '';
        oldPassword = '';
    }

    function handleSubmit() {

        if(password !== passwordConfirm || passwordStrength.id < 1) return;

        nameErrorKey = '';
        passwordErrorKey = '';
        passwordConfirmErrorKey = '';
        oldPasswordErrorKey = '';
        loading = true;

        let wasPasswordChanged = false;
        const promises = [];

        if(name !== $user?.displayName) {
            promises.push(
                updateProfile($user, { displayName: name })
                    .catch((error: AuthError) => {
                        nameErrorKey = getFirebaseErrorTranslationKey(error);
                    })
            );
        }

        if(password) {

            // You can only update the password if you logged in recently
            const auth = getAuth();
            const promise = signInWithEmailAndPassword(auth, $user.email, oldPassword)
                .then(() => {

                    if(oldPassword === password) {
                        passwordErrorKey = 'errors.newPasswordSameAsOld';
                        clearPasswords();
                        return;
                    }

                    return updatePassword($user, password)
                        .then(() => wasPasswordChanged = true)
                        .catch((error: AuthError) => {
                            passwordErrorKey = getFirebaseErrorTranslationKey(error);
                        });
                })
                .catch((error: AuthError) => {
                    oldPasswordErrorKey = getFirebaseErrorTranslationKey(error);
                })

            promises.push(promise);
        }

        return Promise.all(promises)
            .then(() => {
                clearPasswords();
                if(wasPasswordChanged) {
                    user.set(null);
                }
            })
            .finally(() => {
                loading = false;
            });

    }

    $: passwordStrength = password && getPasswordStrength(password);
    $: passwordErrorKey = password && passwordStrength.id < 1 ? 'profile.newPasswordStrengthNotice' : '';

    $: passwordConfirmErrorKey = password && password !== passwordConfirm ? 'errors.passwordConfirmDoesNotMatch' : '';

    $: saveEnabled = !password || (password === passwordConfirm && passwordStrength.id > 0);

</script>

<CenteredFullPage>
    <div class="card card-width-sm shadow-lg">
        <div class="card-header">
            <h4 class="mb-0">{$_('profile.title')}</h4>
        </div>
        <div class="card-body">
            <form on:submit|preventDefault={handleSubmit}>

                <FormField label={$_('misc.fields.email')} id="email" type="email" value={$user?.email} readonly />
                
                <FormField 
                    label={$_('misc.fields.name')} 
                    id="name" 
                    type="text" 
                    bind:value={name} 
                    error={nameErrorKey && $_(nameErrorKey)} 
                    disabled={loading}
                    required
                />

                <hr class="text-secondary"/>

                <FormField 
                    label={$_('profile.newPassword')} 
                    id="password" 
                    type="password" 
                    bind:value={password} 
                    error={passwordErrorKey && $_(passwordErrorKey)} 
                    help={!password && $_('profile.newPasswordNotice')}
                    disabled={loading}
                >
                    {#if password}
                        <PasswordStrengthBar password={password}/>
                    {/if}
                </FormField>

                <FormField 
                    label={$_('profile.confirmPassword')}
                    id="password-confirm" 
                    type="password" 
                    bind:value={passwordConfirm} 
                    error={passwordConfirmErrorKey && $_(passwordConfirmErrorKey)} 
                    required={!!password}
                    disabled={loading}
                />

                <FormField 
                    label={$_('profile.oldPassword')}
                    id="old-password" 
                    type="password" 
                    bind:value={oldPassword} 
                    error={oldPasswordErrorKey && $_(oldPasswordErrorKey)} 
                    help={$_('profile.oldPasswordNotice')}
                    required={!!password}
                    disabled={loading}
                />
                
                <FormSubmit disabled={!saveEnabled} {loading} label={ $_('profile.save') }/>
            </form>
        </div>
    </div>
</CenteredFullPage>

