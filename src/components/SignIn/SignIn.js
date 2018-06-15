import { validationMixin } from 'vuelidate'
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'

import {AUTH_REQUEST} from '../../store/actions/auth'

export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
        form: {
            email: null,
            password: null
        },
        users: null,
        sending: false
    }),
    mounted () {
      // if (true) {
      //   this.$router.push('/profile')
      // }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(3)
            }
        }
    },
    methods: {
        getValidationClass (fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        clearForm () {
            this.$v.$reset();
            this.form.email = null;
            this.form.password = null;
        },
        loginProcessDone () {
          this.sending = true;
            // Instead of this timeout, here you can call your API
            window.setTimeout(() => {
              this.sending = false;
                this.clearForm();
            }, 1500)
        },
        login () {
          const { email, password } = this.form;
          console.log(email + '-' + password);
           this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
             this.$router.push('/profile')
           })
        },
        validateUser () {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                console.log(JSON.stringify(this.users, null, 2));
                this.login();
                this.loginProcessDone();
            }
        }
    }
}
