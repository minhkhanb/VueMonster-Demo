import { validationMixin } from 'vuelidate'
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'

export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
        form: {
            current_password: null,
            new_password: null,
            confirm_password: null,
            email_update: null,
        },
        userSaved: false,
        sending: false,
        lastUser: null
    }),
    validations: {
        form: {
            current_password: {
                required,
                minLength: minLength(3)
            },
            new_password: {
                required,
                minLength: minLength(3)
            },
            confirm_password: {
                required,
                minLength: minLength(3)
            },
            email_update: {
                required,
                email
            }
        }
    },
    methods: {
        UpdateUserInfo () {
          this.$parent.isShow = false;
        },
        getValidationClass (fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        clearForm () {
            this.$v.$reset()
            this.form.current_password = null
            this.form.new_password = null
            this.form.confirm_password = null
            this.form.email = null
        },
        saveUser () {
            this.sending = true

            // Instead of this timeout, here you can call your API
            window.setTimeout(() => {
                this.userSaved = true
                this.sending = false
                this.clearForm()
            }, 1500)
        },
        validateUser () {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.saveUser()
            }
        }
    }
}
