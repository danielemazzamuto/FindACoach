<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <base-card>
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <!-- type button so we do not trigger the submit -->
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </base-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Signup' : 'Login';
    },
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          // sign up http request dispatch
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        }
        const redirect = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirect);
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      return this.mode === 'login'
        ? (this.mode = 'signup')
        : (this.mode = 'login');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
