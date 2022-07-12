<template>
  <section class="empBlock d-flex justify-center align-center mt-5">
    <article class="d-flex flex-column align-center">
      <h1>Employee Details</h1>

      <v-simple-table class="tab" dark>
        <thead>
          <tr>
            <th @click="sortEmp">
              Id
              <v-btn icon>
                <v-icon dense class="arrowIcon">fa-thin fa-arrow-down</v-icon>
              </v-btn>
            </th>
            <th @click="sortEmp">
              Name
              <v-icon class="arrowIcon" dense>fa-thin fa-arrow-down</v-icon>
            </th>
            <th @click="sortEmp">
              Designation
              <v-btn icon>
                <v-icon dense class="arrowIcon">fa-thin fa-arrow-down</v-icon>
              </v-btn>
            </th>
            <th @click="sortEmp">
              Salary
              <v-btn icon>
                <v-icon dense class="arrowIcon">fa-thin fa-arrow-down</v-icon>
              </v-btn>
            </th>
            <th>Email</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Work Location</th>
            <th>Skils</th>
            <th>DOJ</th>

            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in pageList" :key="emp.id" class="text-capitalize">
            <td>{{ emp.id }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.desg }}</td>
            <td>{{ emp.salary }}</td>

            <td>{{ emp.email }}</td>
            <td>{{ emp.gender }}</td>
            <td>{{ emp.experience }}</td>
            <td>{{ emp.workLocation }}</td>
            <td>
              <span v-for="skill in emp.skills" :key="skill"
                >{{ skill }},&nbsp;
              </span>
            </td>
            <td>{{ emp.doj }}</td>

            <td>
              <v-btn color="success" @click="handleEdit(emp.id)">Edit</v-btn>
            </td>
            <td>
              <v-btn color="red" @click="handleDelete(emp.id)">delete</v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <template>
        <div class="text-center d-flex align-center">
          <v-select
            label="Rows"
            type="number"
            v-model="rows"
            :items="items"
          ></v-select>
          <v-pagination
            :length="Math.ceil(empList.length / rows)"
            circle
            dark
            :value="currentPage"
            @next="pageNext"
            @previous="prevPage"
            @input="goToPage"
          >
          </v-pagination>
        </div>
      </template>
    </article>
  </section>
</template>

<script>
import Axios from "../apis/Axios";
import router from "../router/index";
let tHeaders = {
  Name: "name",
  Designation: "desg",
  Salary: "salary",
  Id: "id",
};
export default {
  name: "Home",

  components: {},
  data() {
    return {
      empList: [],
      page: 1,
      rows: 5,
      items: [5, 10, 15, 20],
      currentPage: 1,
      pageList: [],
    };
  },
  watch: {
    rows() {
      this.currentPage = 1;
      this.setTableSiz();
    },
  },
  methods: {
    fetchEmps: async function () {
      try {
        let { data } = await Axios.get("/emps");
        this.empList = data;
        this.pageList = this.empList.slice(0, this.rows);
      } catch (error) {
        console.log(error);
        this.$vToastify.error("Error fetching data");
      }
    },
    setTableSiz: function () {
      let start = this.currentPage * this.rows - this.rows;
      let end = this.currentPage * this.rows;
      this.pageList = this.empList.slice(start, end);
      console.log(this.pageList);
    },
    handleDelete: async function (id) {
      try {
        await Axios.delete(`/emps/${id}`);
      } catch (error) {
        console.log(error);
      }
      this.fetchEmps();
      this.$vToastify.success("Deleted successfully");
    },
    handleEdit: async function (id) {
      router.push(`/edit-emp/${id}`);
    },
    sortEmp: function (e) {
      console.log("sorting");
      let arrow = e.target.children[0];
      let colName = tHeaders[e.target.innerText.trim()];
      this.pageList.sort((a, b) => {
        if (arrow.classList.contains("rotate"))
          return a[colName] > b[colName] ? 1 : -1;
        return a[colName] < b[colName] ? 1 : -1;
      });
      arrow.classList.toggle("rotate");
    },
    pageNext: function () {
      console.log("clicked next");
      this.setTableSiz();
    },
    prevPage: function () {
      console.log("clicked prev");
      this.setTableSiz();
    },
    goToPage: function (n) {
      console.log("Page number clicked", n);
      this.currentPage = n;
      this.setTableSiz();
    },
  },
  beforeMount() {
    this.fetchEmps();
    this.setTableSiz();
    console.log(this.pageList);
  },
};
</script>
<style scoped>
.empBlock {
  width: 100%;
}
article {
  width: 90%;
  gap: 20px;
}
h1 {
  font-size: 2rem;
}
.tab {
  width: 100%;
}
.arrowIcon {
  visibility: hidden;
}
th:hover .arrowIcon {
  visibility: visible;
}
.rotate {
  transform: rotate(180deg) !important;
}
</style>
