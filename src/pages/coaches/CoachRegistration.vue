<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a Coach</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    // formData caming from the form in CoachForm
    saveData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      //   redirect to CoachList
      //   this.$router.push('/coaches');
      // it avoids to go back to the form page
      this.$router.replace('/coaches');
    },
  },
};
</script>
