import { validationMixin } from 'vuelidate'
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'

import {getUsers} from '../../../utils/fetch_data'

import { isLoggedIn, login, logout } from '../../../utils/auth'


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
      this.getUsersData();
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
        loginProcess () {
          this.sending = true;
            // Instead of this timeout, here you can call your API
            window.setTimeout(() => {
              this.sending = false;
                this.clearForm();
            }, 1500)
        },
        validateUser () {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                console.log(JSON.stringify(this.users, null, 2));
                this.loginProcess()
            }
        },
        isLoggedIn () {
          return isLoggedIn();
        },
        getUsersData () {
          getUsers().then((users) => {
            this.users = users;
          });
        }
    }
}
