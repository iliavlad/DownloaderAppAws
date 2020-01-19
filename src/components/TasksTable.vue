<template>
  <div>
    <h1>Tasks</h1>
    <h2>Task List</h2>
    <p id="tasksstatus">{{ tasksStatus }}</p>
    <table v-if="tasks && tasks.length > 0">
      <tr>
        <th>Id</th>
        <th>Url</th>
        <th>Status</th>
        <th>Added by</th>
        <th>Local path (on {{ tasksUrl }})</th>
        <th>Created at</th>
        <th>Updated at</th>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.url }}</td>
        <td>{{ task.status }}</td>
        <td>{{ task.added_by }}</td>
        <td><a :href="getLocalPath(task.local_path)">{{ task.local_path }}</a></td>
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
  props: {
    tasksUrl: String
  },
  components: {
  },
  data() {
    return {
      tasks: null,
      tasksStatus: null
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tasksStatus = 'Downloading task list...';
      this.tasks = null;
      axios
        .get(this.tasksUrl + '/api/')
        .then(response => {
          this.tasks = response.data.data;
          this.tasksStatus = (0 === this.tasks.length) ? 'No tasks' : ('Task count: ' + this.tasks.length);
        })
        .catch(error => {
          this.tasksstatus = error.response.data.message || error.message;
        });
    },
    getLocalPath: function (path) {
      return (!path) ? '' : (this.tasksUrl + path);
    }
  }
}
</script>
