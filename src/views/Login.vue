<template>
    <div>
      <v-container fluid>
        <h1>Sign in</h1>
        <p> Stay updated on your travel timetable</p>
        <v-card class="container">
        <v-form ref="form" v-model="valid" lazy-validation>
          
          <v-text-field 
            v-model="email"
            label="Email"
            placeholder="Email"
            outlined
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            type="password" 
            v-model="password"
            label="Password"
            placeholder="Password"
            outlined
            :rules="passwordRules"
            required
          ></v-text-field>

          <v-btn :disabled="!valid" @click="submit" color="#041e42" class="login-btn">submit</v-btn>
       
        </v-form>
        </v-card>
      </v-container>
    </div>
</template>

<script>
export default {
  name: 'LoginView',
  data: function() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'Email is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Enter a valid email'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          v.length >= 6 ||
          'The password you provided must have at least 6 characters.'
      ]
    };
  },
  methods: {
    submit() {
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        this.$router.push({ name: 'timetable' });
      }
    }
  }
}
</script>
<style scoped>
.container {
  padding: 20px;
  margin: 20px auto;
  width:60%;
}
::v-deep .v-btn .v-btn__content{
    color: #ffffff;
}
::v-deep .theme--light.error--text .v-messages__message {
    color: #ce0037;
}
</style>
