import { validationMixin } from 'vuelidate'
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'

import {AUTH_REQUEST} from '../../store/actions/auth'
import store from '../../store'

let state_error = 0;

export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
        form: {
            email: null,
            password: null
        },
        users: null,
        sending: false,
        msg: '',
        visible: false
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
          console.log('dddfef ',store.state);
          if(this.isExistUser()) {
            state_error = 0;
            this.$store.dispatch(AUTH_REQUEST, { email, password }).then((res) => {
              console.log(JSON.stringify(res, null, 2));
              this.$router.push('/profile')
            })
          }
          else {
            //show error no exist user
            switch(state_error) {
              case 1:
                  this.msg = 'The email not exist!'
                break;

              case 2:
                  this.msg = 'Wrong password!'
                break;
            }

            if (state_error > 0) {
              this.visible = true;
            }
          }
        },
        isExistUser () {
          const { email, password } = this.form;
          console.log('pass -dbpass ' + password + '-' + store.state.user.profile.password);
          if(email != store.state.user.profile.email) {
            state_error = 1;
            return false;
          }
          else if(password != store.state.user.profile.password) {
            state_error = 2;
            return false;
          }
          return true;
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
