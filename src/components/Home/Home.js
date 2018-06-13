import { validationMixin } from 'vuelidate'
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'

import EditPassword from '../EditPassword/index'

export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    components: {
      appEditPassWord: EditPassword
    },
    data: () => ({
        form: {
            firstName: null,
            lastName: null,
            email: null,
        },
        userSaved: false,
        sending: false,
        lastUser: null
    }),
    validations: {
        form: {
            firstName: {
                required,
                minLength: minLength(3)
            },
            lastName: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email
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
            this.$v.$reset()
            this.form.firstName = null
            this.form.lastName = null
            this.form.email = null
        },
        saveUser () {
            this.sending = true

            // Instead of this timeout, here you can call your API
            window.setTimeout(() => {
                this.lastUser = `${this.form.firstName} ${this.form.lastName}`
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