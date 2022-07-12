<template>
  <section class="editBlock d-flex justify-center align-center mt-15">
    <article class="d-flex flex-column align-center">
      <h1>Edit Employee</h1>

      <form @submit.prevent="handleSubmit" class="myForm">
        <v-container class="form d-flex">
          <v-row class="d-flex flex-column mx-5">
            <v-col>
              <v-text-field label="Employee name" v-model="empDetails.name">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Email"
                type="email"
                v-model="empDetails.email"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Designation" v-model="empDetails.desg">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Salary" v-model.number="empDetails.salary">
              </v-text-field>
            </v-col>
            <v-col>
              <v-radio-group row v-model="empDetails.gender" label="Gender">
                <v-radio label="Male" value="male"> </v-radio>
                <v-radio label="Female" value="female"> </v-radio>
                <v-radio label="Other" value="other"> </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row class="d-flex flex-column">
            <label for="">Skills</label>
            <v-col class="d-flex">
              <v-checkbox
                v-model="empDetails.skills"
                label="HTML"
                value="HTML"
              ></v-checkbox>
              <v-checkbox
                v-model="empDetails.skills"
                label="CSS"
                value="CSS"
              ></v-checkbox>
              <v-checkbox
                v-model="empDetails.skills"
                label="Javascript"
                value="Javascript"
              ></v-checkbox>
              <v-checkbox
                v-model="empDetails.skills"
                label="React"
                value="React"
              ></v-checkbox>
              <v-checkbox
                v-model="empDetails.skills"
                label="Vue"
                value="Vue"
              ></v-checkbox>
              <v-checkbox
                v-model="empDetails.skills"
                label="Marketing"
                value="Marketing"
              ></v-checkbox
              ><v-checkbox
                v-model="empDetails.skills"
                label="Sales"
                value="Sales"
              ></v-checkbox>
            </v-col>
            <v-col>
              <v-radio-group
                row
                v-model="empDetails.experience"
                label="Experience"
              >
                <v-radio value="0-2 years" label="0-2 years"> </v-radio>
                <v-radio value="2-5 years" label="2-5 years"> </v-radio>
                <v-radio value="5-10 years" label="5-10 years"> </v-radio>
                <v-radio value="10+ years" label="10+ years"> </v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <v-select
                label="Work Location"
                :items="items"
                v-model="empDetails.workLocation"
              >
              </v-select>
            </v-col>
            <v-col class="d-flex flex-column">
              <label for="doj">Date of joining</label>
              <input type="date" name="doj" id="doj" v-model="empDetails.doj" />
            </v-col>
          </v-row>
        </v-container>
        <v-btn color="success" type="submit" class="mb-5">Submit</v-btn>
      </form>
    </article>
  </section>
</template>

<script>
import Axios from "../apis/Axios";
import router from "../router/index";
export default {
  name: "EditEmp",
  data() {
    return {
      empDetails: {
        name: "",
        email: "",
        desg: "",
        salary: "",
        experience: "",
        workLocation: "",
        gender: "",
        doj: "",
        skills: [],
      },
      items: ["Bangalore", "Mumbai", "Pune", "Hyderabad", "Chennai"],
    };
  },
  methods: {
    handleSubmit: async function () {
      try {
        let payload = this.empDetails;
        await Axios.put(`/emps/${this.$route.params.id}`, payload);
      } catch (error) {
        console.log(error);
      }
      this.$vToastify.success("Updated successfully");
      router.push("/");
    },
    fetchEmp: async function () {
      try {
        let { data } = await Axios.get(`/emps/${this.$route.params.id}`);
        this.empDetails = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeMount() {
    this.fetchEmp();
  },
};
</script>

<style scoped>
.editBlock {
  width: 100%;
}
article {
  width: 90%;
  gap: 30px;
}
h1 {
  font-size: 2rem;
}
.myForm {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.container {
  width: 100%;
  background: #efefef;
  padding: 20px;
  justify-content: space-between;
}
.row {
  width: 45%;
  padding: 20px;
}
</style>
