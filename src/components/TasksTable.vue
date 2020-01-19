<template>
  <div>
    <h1>Tasks</h1>
    <h2>Task List</h2>
    <p id="tasksstatus">{{ tasksstatus }}</p>
    <table v-if="tasks && tasks.length > 0">
      <tr>
        <th>Id</th>
        <th>Url</th>
        <th>Status</th>
        <th>Added by</th>
        <th>Local path</th>
        <th>Created at</th>
        <th>Updated at</th>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.url }}</td>
        <td>{{ task.status }}</td>
        <td>{{ task.added_by }}</td>
        <td>{{ task.local_path }}</td>
        <td>{{ task.created_at }}</td>
        <td>{{ task.updated_at }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TasksTable',
  components: {
  },
  data() {
    return {
      tasks: null,
      tasksstatus: null
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tasksstatus = 'Downloading task list...';
      this.tasks = null;
      axios
        .get('https://downloaderapp.test-the.tech/api/')
        .then(response => {
          this.tasks = response.data.data;
          this.tasksstatus = (0 == this.tasks.length) ? 'No tasks' : ('Task count: ' + this.tasks.length);
//          console.log(this.tasks);
        })
        .catch(error => {
//          console.log(error);
          this.tasksstatus = error.response.data.message || error.message;
        });
    }
  }
}
</script>
